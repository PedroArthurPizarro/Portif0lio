const express = require('express');
const mysql = require('mysql2');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/styles'));
app.use('/Imagens_Polaris', express.static(__dirname + '/Imagens_Polaris'));
app.use('/assets', express.static(__dirname + '/assets'));


const con = mysql.createConnection({
    host: "localhost",
    user: "phpmyadmin",
    password: "phpmyadmin",
    database: "PPDB"
});

app.use(
    session({
        secret: 'sua_chave_secreta',
        resave: true,
        saveUninitialized: true,
    })
);

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
    app.use(express.static(__dirname + '/styles'))
});

app.get('/projetos', (req, res) => {
    res.sendFile(__dirname + '/projetos.html');
    app.use(express.static(__dirname + '/styles'))
});

app.get('/sobre', (req, res) => {
    res.sendFile(__dirname + '/sobre.html');
    app.use(express.static(__dirname + '/styles'))
});

app.get('/contato', (req, res) => {
    res.sendFile(__dirname + '/contato.html');
    app.use(express.static(__dirname + '/styles'))
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/login.html');
    app.use(express.static(__dirname + '/styles'));
});

app.post('/login', (req, res) => {
    const username = req.body.nome;
    const password = req.body.senha;
    const Email = req.body.email


    const sql = `SELECT * FROM ADM WHERE nome = ? AND senha = ?`;

    con.query(sql, [username, password, Email], (err, result) => {
        if (err) throw err;

        if (result.length > 0) {
            req.session.loggedin = true;
            req.session.username = username;
            res.redirect('/blog');
        } else {
            res.send('Credenciais inválidas. <a href="/login">Tente novamente</a>');
        }
    });
});

// Rota para a página do painel
app.get('/Blog', (req, res) => {
    //
    if (req.session.loggedin) {
        res.sendFile(__dirname + '/blog.html');
    } else {
        res.send('Faça login para acessar esta página. <a href="/login">Login</a>');
    }
});


app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
});


app.get('/cadastro', (req, res) => {
    res.sendFile(__dirname + '/cadastro.html');
    app.use(express.static(__dirname + '/styles'));
});

app.post('/cadastrar', (req, res) => {
    const nome = req.body.nome;
    const senha = req.body.senha;
    const email = req.body.email;
    const sobrenome = req.body.sobrenome;
    const TC = req.body.TC;


    const sqlCheckEmail = `SELECT * FROM ADM WHERE email = ?`;

    con.query(sqlCheckEmail, [email], (err, result) => {
        if (err) throw err;

        if (result.length > 0) {
            // Se o e-mail já existe no banco de dados
            res.send('Este e-mail já está cadastrado. <a href="/cadastro">Tente novamente</a>');
        } else {
            // Se o e-mail é único, inserir no banco de dados
            const sqlInsert = `INSERT INTO ADM (nome, senha, email, sobrenome, TC) VALUES (?, ?, ?, ?, ?)`;
            con.query(sqlInsert, [nome, senha, email, sobrenome, TC], (err, result) => {
                if (err) throw err;
                console.log("1 record inserted");
                res.redirect('/dashboard');
            });
        }
    });
});