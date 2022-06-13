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
    con.query("CREATE TABLE move (id int(11) NOT NULL AUTO_INCREMENT, game_id int(11), player_id int(11), x_cord int(1), y_cord int(2), PRIMARY KEY (id), FOREIGN KEY (game_id) REFERENCES game(game_id))", function (err) {
      if (err) throw err;
      console.log("room table created!");
    });
  });