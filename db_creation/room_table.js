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
    con.query("CREATE TABLE room (room_code varchar(6), user int, tournament_size int(2), random_players int(2), known_players int(2), nrinarow int(1), FOREIGN KEY (user) REFERENCES users(ID))", function (err) {
      if (err) throw err;
      console.log("room table created!");
    });
  });