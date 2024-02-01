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

  var sql = `
    ALTER TABLE ADM
    ADD COLUMN TC VARCHAR(255)
  `;
  
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Column Created'");
  });
});
