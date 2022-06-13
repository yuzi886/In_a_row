const express = require('express');
const router = express.Router();

// gets the connection from connectPromises.js file
// this file enables promises but does not work with callback
const pool = require('../connectPromises');

router.post("/", (req, res) => {


    function update(roomCode, gameId){
        console.log("This is roomcode match: " + roomCode);
        pool.execute("UPDATE game SET player_1 = ? WHERE room_code = ?", [req.session.userid, roomCode]);
        req.session.gameid = gameId;
        res.status(200).json({"gameFound": true});
    }

    async function start(){
        if(req.session.userid != null && req.body.inarow != null){
            const randomRooms = await pool.query("SELECT room_code, nrinarow FROM room WHERE tournament_size = 1");

            let noMatch = true;
            for(i = 0; i < randomRooms[0].length; i++){

                // Fetches only one result per loop so index is 0 for both in randomGame
                let randomGame = await pool.execute("SELECT game_id, player_0, player_1 FROM game WHERE room_code = ?",[randomRooms[0][i]["room_code"]]);

                if(randomGame[0][0]["player_1"] == 0 && randomGame[0][0]["player_0"] != req.session.userid && randomRooms[0][i]["nrinarow"] == req.body.inarow){
                    console.log("Room match is " + randomRooms[0][i]["room_code"]);
                    update(randomRooms[0][i]["room_code"], randomGame[0][0]["game_id"]);
                    noMatch = false;
                    break;
                }
            }
            if (noMatch) {
                res.status(200).json({"gameFound": false});
            }
        }else{
            res.sendStatus(401);
        }
    }
    start();
});

module.exports = router;
