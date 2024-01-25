var mysql = require('mysql2');

var con = mysql.createConnection({
  host: "localhost",
  user: "phpmyadmin",
  password: "phpmyadmin",
  database: "PPDB"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
var sql = `INSERT INTO ADM (Nome, Senha)
            VALUES ('Pedro Pizarro', '392766')`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Info Inserted");
  });
});