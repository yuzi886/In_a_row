var mysql = require('mysql');
require('dotenv').config();

var con = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASS,
    database: process.env.DB
});

con.connect(function(err) {
    if (err) throw err;
    con.query("CREATE TABLE users (ID int NOT NULL AUTO_INCREMENT, email varchar(255), name varchar(255), wins int, matches int, PRIMARY KEY (ID))", function (err, result, fields) {
      if (err) throw err;
      console.log("user table created!");
    });
  });