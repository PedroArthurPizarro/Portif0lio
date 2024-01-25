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
var sql = "DELETE FROM users WHERE nome = 'p'";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result.affectedRows + "record(s) updated");
  });
});