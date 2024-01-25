var mysql = require('mysql2');

var con = mysql.createConnection({
  host: "localhost",
  user: "phpmyadmin",
  password: "phpmyadmin",
  database: "polarisdb"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

  var sql = `
    ALTER TABLE users
    ADD COLUMN sexo VARCHAR(255)
  `;
  
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Column name changed from 'senha' to 'email'");
  });
});
