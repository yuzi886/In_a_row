const express = require('express');
const router = express.Router();
const https = require('https');
const request = require('request');
const {google} = require('googleapis');


router.get("/facebook",(req,res) =>{
  let code = req.query.code;
  console.log(code);
  res.redirect("https://localhost:3000/Rooms");
  getAccessToken(receivedToken);
  function getAccessToken(callback) {
      const token_url = new URL("https://graph.facebook.com/v10.0/oauth/access_token");
      token_url.searchParams.append("client_id", "1064107504081175");
      token_url.searchParams.append("redirect_uri", "http://localhost:3001/api/login/facebook");
      token_url.searchParams.append("client_secret", "da7a28c7dbec0e72cdf3be0350238247");
      token_url.searchParams.append("code",code);
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
      var req = https.get(user_url, (response) => {
        response.on('data', function (chunk) {
          console.log(JSON.parse(chunk));// get the user data (try to send userdata to the user file
          var user_data = JSON.parse(chunk);
          var name = `${user_data.first_name} ${user_data.last_name}`;
          user_data["name"] = name;
          storeUserDara(user_data);//store data
          console.log("that's right");
        });
      });
      req.on('error',error =>{
        console.error(error);
      })
    };
  function receivedToken(accessToken) {
      getFacebookUserData(accessToken);
  };
});



router.get("/google",(req,res) =>{
  let code = req.query.code;
  console.log(code);
  res.redirect("https://localhost:3000/Rooms");
  var oauth2Client = new google.auth.OAuth2(
    '136640376347-m5f5925tl99f6gj67k116kes0oibftpm.apps.googleusercontent.com',
    'SjjWRWsF_wwpzh-tPKOEQDkG',
    'http://localhost:3001/api/login/google'
  );


  oauth2Client.getToken(code, function (err, tokens) {
      if (!err) {
          oauth2Client.setCredentials(tokens);
          console.log(tokens.access_token);
          getGoogleUserInfo(tokens);
      }
      else {
          console.log(err.message);
      };
    });

 function getGoogleUserInfo(tokens,callback) {
   const options = {
    hostname: 'www.googleapis.com',
    path:  `/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`,
    headers: {
        Authorization: `Bearer ${tokens.id_token}`
    }
  };
   var req = https.get(options, (response) => {
     response.on('data', function (chunk) {
       console.log(chunk.toString());// get the user data (try to send userdata to the user file )
       storeUserDara(JSON.parse(chunk.toString('utf-8')));//store the data
     });
   });
   req.on('error',error =>{
     console.error(error);
   });
   req.end();
 };
});

function storeUserDara(data){ //send the userdata in user.js
  user_url = new URL("http://localhost:3001/user/create");
  const options = {
    uri: user_url,
    method:'POST',
    json: true,
    body: data
  };
  request(options, function (error, response, body) {
       if(error) {
         console.log('error: '+ error);
       } else {
         console.log('document saved to api');
       }
     });
};

module.exports = router;
