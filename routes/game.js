const { json } = require('body-parser');
const express = require('express');
const router = express.Router();

const pool = require('../connect');


function update(updateValue, gameId) {
    pool.execute("UPDATE game SET new_move = ? WHERE game_id = ?",
    [updateValue, gameId],
    function (err){
        if (err) throw err;
    });
}

// Sends newmoves back to client along a update:true
// sends indicatror back to client with update:false
// (works as intended :D)
router.get("/update", (req, res) => {
    console.log("Dette er player: " + req.body.player);
    if (req.session.userid != null && req.session.gameid != null) {
        pool.execute("SELECT new_move FROM game WHERE game_id = ? AND (player_0 = ? OR player_1 = ?)",
        [req.session.gameid, req.session.userid, req.session.userid],
        function (err, gameResult) {
            if (err) throw err;
            pool.execute("SELECT player_id, x_cord, y_cord FROM move WHERE game_id = ? ORDER BY id DESC LIMIT 1",
            [req.session.gameid],
            function (err, moveResult) {
                if (err) throw err;
                if(moveResult.length  == 0){
                      // No result from query both false indicates no move has been made
                      res.status(200).json({
                        "update": false
                    });
                }else{
                    if(moveResult[0]["player_id"] != req.session.userid && gameResult[0]["new_move"] == 1){
                        //update newmove to false
                        update(0, req.session.gameid);
                        res.status(200).json({
                            "update": true,
                            "x": moveResult[0]["x_cord"],
                            "y": moveResult[0]["y_cord"]
                        });
                    }
                    else{
                        // only get indicator if update is false indicator might be the same but that does not matter :D
                        res.status(200).json({
                            "update": false,
                            "indicator": gameResult[0]["indicator"]
                        });
                    }
                }
            });
        });
    }else{
        res.sendStatus(401);
    }
});

router.post("/newindicator", (req, res) => {
    if (req.session.userid != null && req.session.gameid != null && req.body.indicator != null) {
        pool.execute("UPDATE game SET indicator = ? WHERE game_id = ?",
        [req.body.indicator, req.session.gameid],
        function (err) {
            if (err) throw err;
            res.sendStatus(200);

        });
    }else{
        res.sendStatus(401);
    }
});




// takes a new move from client and stores it to the database
router.post("/sendmove", (req, res) => {
    if(req.session.gameid != null && req.session.userid != null && req.body.x != null && req.body.y != null){
        // checks that same user does not send two moves in a row need opponent to send opne in between
        pool.execute("SELECT player_id FROM move WHERE game_id = ? ORDER BY id DESC LIMIT 1",
        [req.session.gameid],
        function (err, result) {
            if (result.length != 0) {
                if(result[0]["player_id"] == req.session.userid){
                    return res.status(402).send("User cant go twice in a row");
                }
            }//else it's firstmove of the game which is okei :D
            // send cordiantae from client to database
            pool.execute("INSERT INTO move (game_id, player_id, x_cord, y_cord) VALUES(?, ?, ?, ?)",
            [req.session.gameid, req.session.userid, req.body.x, req.body.y],
            function (err) {
                if (err) throw err;
                update(1, req.session.gameid);
                res.sendStatus(200);
            });
        });
    }else{
        res.sendStatus(401);
    }



});


// generates a new room
router.post("/create", (req, res) => {
    console.log(req.session.userid);
    if(req.session.userid != null && req.body.size != null && req.body.inarow != null){


        function randomRoom(){
            let chars = "abcdefghijklmnpqrstuvwxyz123456789";
            let code = "";
            for(let i = 0; i < 6; i++){
                code += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            console.log("Code before query: " + code);
            pool.execute("SELECT room_code FROM room WHERE room_code = ?",
            [code],
            function (err, result) {
                if (err) throw err;
                // [] returns true in if
                if(result){
                    // no hit from query
                    create_room(code);
                }else{
                    // Hit from query we need a nwe room code
                    randomRoom();
                }
            });
        }
        randomRoom();
        // let room_code = randomRoom();

        // console.log("this is roomcode:" + room_code);
        // console.log(req.session.userid);
        // does not work for some un understandable reason

        function create_room(room_code){
            pool.execute("INSERT INTO room(room_code, user, tournament_size, random_players, known_players, nrinarow) VALUES(?, ?, ?, 0, 0, ?)",
            [room_code, req.session.userid, req.body.size, req.body.inarow],
            function (err) {
                if (err) throw err;
                // if (req.body.size > 2) {
                //     // it's a tournament and We need code here to decide the round number in this game
                // }
                pool.execute("INSERT INTO game (room_code, player_0, player_1, new_move, indicator) VALUES(?, ?, 0, 0, 0)",
                [room_code, req.session.userid],
                function (err) {
                    if (err) throw err;
                    // takes the new game_id for the user and store it to it's session
                    pool.execute("SELECT game_id FROM game WHERE room_code = ? AND player_0 = ? ORDER BY game_id DESC LIMIT 1",
                    [room_code, req.session.userid],
                    function (err, gameResult) {
                        if (err) throw err;
                        req.session.gameid = gameResult[0]["game_id"];
                        res.sendStatus(201);
                    });
                });
            });
        }
    }
    else{
        res.sendStatus(401);
    }

});

// grabs all moves from both users and send it back as a 2D json
router.get("/getboard", (req, res) => {
    if (req.session.userid != null && req.session.gameid != null) {
        // case where a user refreshes the page and the client needs all cordinates on the board to print it
        pool.execute("SELECT player_id, x_cord, y_cord FROM move WHERE game_id = ?",
        [req.session.gameid],
        function (err, result) {
            if (err) throw err;
            let jsonVar = [];
            for(let i = 0; i < result.length; i++){
                if(result[i]["player_id"] == req.session.userid){
                    jsonVar.push({
                        // move from user that sent the request
                        "thisUser": true,
                        "x": result[i]["x_cord"],
                        "y": result[i]["y_cord"]
                    });
                }else{
                    // move from opponent
                    jsonVar.push({
                        "thisUser": false,
                        "x": result[i]["x_cord"],
                        "y": result[i]["y_cord"]
                    });
                }
            }
            res.status(200).json(jsonVar);
        });
    }else{
        res.sendStatus(401);
    }
});


router.post("/roomlink", (req, res) => {
    // checks of there is a room in the DB whith that code
    if(req.body.roomcode != null){
        pool.execute("SELECT room_code, tournament_size FROM room WHERE room_code = ?",
        [req.body.roomcode],
        function (err, result) {
            if (err) throw err;
            if(result.length == 0){
                // no hit from query
                verify(false, null);
            }else{
                // Hit from query
                pool.execute("SELECT player_0, player_1 FROM game WHERE room_code = ?",
                [req.body.roomcode],
                function (err, player) {
                    if (err) throw err;
                    // code does not consider tourney
                    if(player[0]["player_1"] == 0){
                        // room is not taken
                        verify(true, player[0]["player_0"]);
                    }else{
                        // room is taken
                        verify(false, null)
                    }

                });
            }
        });


        function verify(roomExists, player){
            if (req.session.userid == null && req.session.gameid == null) {
                //If it's a new user he needs to signup first
                if(roomExists){
                    req.session.gameid = req.body.roomcode;
                    return res.status(200).json({"auth": false, "room": true});
                }else{
                    return res.status(200).json({"auth": false, "room": false})
                }
            }
            else if (req.session.userid != null){
                if(roomExists){
                    if(player != req.session.userid){
                      console.log("denne kjøreer");
                        pool.execute("UPDATE game SET player_1=? WHERE room_code = ?",
                        [req.session.userid, req.body.roomcode],
                        function (err) {
                            if (err) throw err;
                            pool.execute("SELECT nrinarow FROM room WHERE room_code = ?",
                            [req.body.roomcode],
                            function (err, inarowResult) {
                                if (err) throw err;
                                pool.execute("SELECT game_id FROM game WHERE room_code = ?",
                                [req.body.roomcode],
                                function (err, innerResult) {
                                    if (err) throw err;
                                    // set first time or overwrite previous same code
                                    req.session.gameid = innerResult[0]["game_id"];
                                    res.status(200).json({"auth": true, "room": true, "inarow": inarowResult[0]["nrinarow"]});
                                });

                            });

                        });
                    }else{
                        // forbidden to match up agains oneself
                        res.sendStatus(403);
                    }

                }else{
                    return res.status(200).json({"auth": true, "room": false})
                }
            }else{
                res.sendStatus(401);
            }
        }
    }else{
        res.sendStatus(400);
    }
});

router.get("/waitingroom", (req, res) => {
    if (req.session.userid != null && req.session.gameid != null) {
        pool.execute("SELECT room_code, player_0, player_1 FROM game WHERE game_id = ?",
        [req.session.gameid],
        function (err, result) {
            if (err) throw err;
            if (result[0]["player_0"] == req.session.userid) {
                if(result[0]["player_1"] != 0){
                    pool.execute("SELECT nrinarow FROM room WHERE room_code = ?",
                    [result[0]["room_code"]],
                    function (err, inarowResult) {
                        if (err) throw err;
                        res.status(200).json({"userArrived": true, "inarow": inarowResult[0]["nrinarow"]});
                    });
                }else{
                    res.status(200).json({"userArrived": false});
                }
            }else{
                res.sendStatus(400);
            }
        });
    }else{
        res.sendStatus(401);
    }
});

router.get("/getcode", (req, res) => {
    if (req.session.userid != null && req.session.gameid != null) {
        pool.execute("SELECT room_code FROM game WHERE game_id = ?",
        [req.session.gameid],
        function (err, result) {
            if (err) throw err;
            res.status(200).json({"roomcode": result[0]["room_code"]});
        });
    }else{
        res.sendStatus(401);
    }
});

router.get("/inarowtype", (req, res) => {
  if (req.session.userid != null && req.session.gameid != null) {
      pool.execute("SELECT room_code FROM game WHERE game_id = ?",
      [req.session.gameid],
      function (err, result) {
          if (err) throw err;
          pool.execute("SELECT nrinarow FROM room WHERE room_code = ?",
          [result[0]["room_code"]],
          function (err, inarowRes) {
              if (err) throw err;
              res.status(200).json({"inarow": inarowRes[0]["nrinarow"]});
          });
      });
  }else{
      res.sendStatus(401);
  }
});


router.get("/playerstate", (req, res) => {
    if (req.session.userid != null && req.session.gameid != null) {
        pool.execute("SELECT player_0, player_1 FROM game WHERE game_id = ?",
        [req.session.gameid],
        function (err, result) {
            if (err) throw err;
            if(result[0]["player_0"] != result[0]["player_1"]){
                if(result[0]["player_0"] == req.session.userid){
                    res.status(200).json({"starting": true});
                }else if(result[0]["player_1"] == req.session.userid){
                    res.status(200).json({"starting": false});
                }else{
                    res.sendStatus(500);
                }
            }else{
                res.sendStatus(500);
            }

        });
    }else{
        res.sendStatus(401);
    }
});


module.exports = router;
