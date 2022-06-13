// Express
const express = require('express');
const router = express.Router();


// const mysql = require('mysql');
// let con = mysql.createConnection({
//     host: process.env.HOST,
//     user: process.env.USER,
//     password: process.env.PASS,
//     database: process.env.DB
// });

const pool = require('../connect');


// takes json data on this format:

// {
//     "email": "Test@google.com",
//     "name" : "Testman"
// }


// code is sort of useless but good for demo
router.post('/create', (req, res) => {
    if(req.body.email != undefined && req.body.name != undefined){
        // pool.execute(function(err) {
        //     if (err) throw err;
        pool.execute("SELECT email FROM users WHERE email=?",
        [req.body.email],
        function (err, result) {
            if (err) throw err;
            // if there is no match result is [] and if([]) evaluates to true in javascript
            if(result.length == 0){
                create_user();
                console.log("make user!");
            }else{
                // bad parameter
                res.sendStatus(400);
            }
        });
        // });
        function create_user(){
            pool.execute("INSERT INTO users (email, name, wins, matches) VALUES (?, ?, 0, 0)",[
                req.body.email,
                req.body.name
              ], function (err) {
                if (err) throw err;
                // Created
                res.sendStatus(201);
            });
        }


    }
});

router.get("/signedin", (req, res) => {
    if(req.session.userid != null){
      res.status(200).json({"auth": true});
    }else{
      res.status(200).json({"auth": false});
    }
});


module.exports = router;
