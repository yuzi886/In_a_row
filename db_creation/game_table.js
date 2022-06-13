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
    con.query("CREATE TABLE game (game_id int NOT NULL AUTO_INCREMENT, round_number varchar(2), room_code varchar(6), player_0 int, player_1 int, new_move int(1) CHECK(new_move IN (1, 0)), indicator int(1), PRIMARY KEY (game_id))", function (err, result, fields) {
      if (err) throw err;
      console.log("Game table created!");
    });
  });