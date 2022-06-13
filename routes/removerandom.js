const express = require('express');
const router = express.Router();

// gets the connection from connectPromises.js file
// this file enables promises but does not work with callback
const pool = require('../connect');

router.get("/", (req, res) => {
    if(req.session.userid != null && req.session.gameid != null){
        pool.execute("SELECT room_code FROM room WHERE user = ?", [req.session.userid],
        function(err, result) {
            if(err) throw err;
            if(result.length > 0){
                pool.execute("UPDATE room SET tournament_size = 0 WHERE user = ?",[req.session.userid]);
            }
            res.sendStatus(200);
        });

    }else{
        res.sendStatus(401);
    }
});


module.exports = router;
