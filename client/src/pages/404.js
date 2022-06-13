import React from 'react';

import{
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
  useHistory
} from "react-router-dom";


const NotFoundPage = () => {
  const history = useHistory();

  const get = () => {  
    let url = window.location.href;
    // grabs potential roomcode that is always 6 chars long
    let code = url.substring(url.length-6, url.length);
    console.log(code);
    fetch("/game/roomlink", {
      method: "post",
      body: JSON.stringify({"roomcode": code}),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then((resp) => resp.json())
    .then(function(data){
      console.log(data);
      console.log(data.auth);
      console.log(data.room);
      if(data.auth){
        if (data.room) {
          // he is connected send this man to his game
        }else{
          // room does not exist
          history.push("/Rooms");
        }
      }else{
        history.push("/");
      }
    })
  }

  return(

    <div>
      <h2>404 Not Found! code: {get()}</h2>
    </div>

  );
};

export default NotFoundPage;
