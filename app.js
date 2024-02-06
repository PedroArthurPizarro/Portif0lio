const express = require('express');
const mysql = require('mysql2');
const session = require('express-session');
const ejs = require('ejs')
const bodyParser = require('body-parser');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/styles'));
app.use('/Imagens_Polaris', express.static(__dirname + '/Imagens_Polaris'));
app.use('/assets', express.static(__dirname + '/assets'));


const db = mysql.createConnection({
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
app.use(express.static('public'));
app.set('view engine', 'ejs');

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

app.get('/blogadm', (req, res) => {
    res.render('blogadm');
    app.use(express.static(__dirname + '/styles'));
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
            res.redirect('/blogadm');
        } else {
            res.send('Credenciais inválidas. <a href="/login">Tente novamente</a>');
        }
    });
});



app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
});

app.get('/blogadm', (req, res) => {
    res.sendFile(__dirname + '/blogadm.html');
    app.use(express.static(__dirname + '/styles'));
});


// READ
app.get('/blog', (req, res) => {
    db.query('SELECT * FROM postagens', (err, result) => {
      if (err) throw err;
      res.render('blog', { postagens: result });
    });
});
  
  // CREATE
  app.post('/add', (req, res) => {
    const { título, conteúdo } = req.body;
    const sql = 'INSERT INTO postagens (título, conteúdo) VALUES (?, ?)';
    db.query(sql, [título, conteúdo], (err, result) => {
        if (err) {
            console.error('Erro ao adicionar postagem:', err);
            res.status(500).send('Erro ao adicionar postagem');
            return;
        }
        res.redirect('/blog');
    });
  });
  
  // UPDATE
  app.post('/update/:id', (req, res) => {
    const { id } = req.params;
    const { título, conteúdo } = req.body;
    const sql = 'UPDATE users SET título = ?, conteúdo = ? WHERE id = ?';
    db.query(sql, [título, conteúdo, id], (err, result) => {
      if (err) throw err;
      res.redirect('/');
    });
  });
  
  // DELETE
  app.get('/delete/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM postagens WHERE id = ?';
    db.query(sql, [id], (err, result) => {
      if (err) throw err;
      res.redirect('/');
    });
  });