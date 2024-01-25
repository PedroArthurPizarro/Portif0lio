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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});