var mysql = require('mysql2');

var con = mysql.createConnection({
	host: "localhost",
	user: "phpmyadmin",
	password: "phpmyadmin"
	});


con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("CREATE DATABASE PPDB", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });
});
