const express = require('express');
const router = express.Router();

// gets the connection from connect.js file
const pool = require('../connect');


// Generate guest with session
router.get("/create", (req, res) => {
    console.log("userid: " + req.session.userid);

    if(req.session.userid != null){
        return res.sendStatus(400);
    }else {

        // accsessible to all functions inside this function
        let name;
        // Generate random Guest name
        function randomName(prev){
            let i = 0;
            name = "Guest";
            while (i < 7) {
                name += Math.floor(Math.random()*10);
                i++;
            }
            if(name == prev){
                randomName(name);
            }
            if(findDuplicate()){
                randomName(name);
            }else{
                sendData()
            }
        }

        // need to generate a guest username
        randomName();


        function findDuplicate(){
            pool.execute(
                "SELECT email FROM users WHERE email=?",
                [name],
                function(err, result) {
                    if(result){
                        return false;
                    }
                    else{
                        return true;
                    }
                }
            );

        }
        function sendData(){
            pool.execute(
                "INSERT INTO users (email, wins, matches) VALUES (?, 0, 0)",
                [name],
                function(err) {
                    if(err) throw err;
                    pool.execute("SELECT ID FROM users WHERE email = ?",
                    [name],
                    function (err, result) {
                        if(err) throw err;
                        console.log(result[0]["ID"]);
                        req.session.userid = result[0]["ID"];
                        if(req.session.gameid != null){
                            console.log("Hey look we got this far :D");
                            pool.query("UPDATE game SET player_1=? WHERE room_code = ?",
                            [result[0]["ID"], req.session.gameid],
                            function (err) {
                                if (err) throw err;
                                console.log("This is the old gameid: " + req.session.gameid);
                                pool.query("SELECT game_id FROM game WHERE room_code = ?",
                                [req.session.gameid],
                                function (err, gameResult) {
                                    if (err) throw err;
                                    // set first time or overwrite previous same code :D
                                    req.session.gameid = gameResult[0]["game_id"];
                                    return res.status(200).json({"auth": true, "room": true});
                                });
                            });
                        }else{
                            // res.status(201).json({"ni":12})
                            return res.sendStatus(201);
                        }
                    });

                }
            );
        }


    }

});


module.exports = router;
