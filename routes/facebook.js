const express = require('express');
const router = express.Router();
const https = require('https');
const request = require('request');


router.get("/facebook",(req,res) =>{
  let code = req.query.code;
  console.log(code);
  res.send("send the code");
  var accessToken = getAccessToken(receivedToken);
  function getAccessToken(callback) {
      const token_url = new URL("https://graph.facebook.com/v10.0/oauth/access_token");
      token_url.searchParams.append("client_id", "1064107504081175");
      token_url.searchParams.append("redirect_uri", "http://localhost:3001/api/facebook");
      token_url.searchParams.append("client_secret", "da7a28c7dbec0e72cdf3be0350238247");
      token_url.searchParams.append("code",code);
      console.log(token_url);
      var req = https.get(token_url, (response) => {
        response.on('data', function (chunk) {
          callback(JSON.parse(chunk.toString('utf-8')).access_token);
        });
      });
      req.on('error',error =>{
        console.error(error);
      })
  };

  function getFacebookUserData(accessToken) {
      const user_url = new URL("https://graph.facebook.com/me");
      user_url.searchParams.append("fields", "id,email,first_name,last_name");
      user_url.searchParams.append("access_token", accessToken);
      console.log(user_url);
      var req = https.get(user_url, (response) => {
        response.on('data', function (chunk) {
          console.log(chunk.toString());
        });
      });
      req.on('error',error =>{
        console.error(error);
      })
    };
  function receivedToken(accessToken) {
      console.log(accessToken);
      getFacebookUserData(accessToken);
  };
  function receivedUserData(userData){
      console.log(userData);// get the user data
  };

});

module.exports = router;
