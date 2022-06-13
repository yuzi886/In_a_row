import React, { useState, useEffect } from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import{
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
  useHistory
} from "react-router-dom";



const WaitingRoom = () => {

  const history = useHistory();

  const [inputValue, setInputValue] = useState("");

  async function getUrl() {
    let baseUrl = "https://localhost:3000/";
    const response = await fetch("/game/getcode");
    let res = await response.json();
    console.log(res.roomcode);
    setInputValue(baseUrl + res.roomcode);
  };

  async function updateRoom(){
    let response = await fetch("/game/waitingroom");
    let result = await response.json();
    console.log(result);
    if(result.userArrived){
      if (result.inarow == 3) {
        history.push("/ThreeIAR");
      }
      else if (result.inarow == 4) {
        history.push("/FourIAR");
      }
      else if (result.inarow == 5) {
        history.push("/FiveIAR");
      }
    }
  }

  // interval = setInterval(updateRoom(), 4000);
  // Works as componentdidmount in class
  useEffect(() => {
    getUrl();
    const interval = setInterval(() => {
      updateRoom();
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  



 


  return (
    <div className="container-0">
      <h2 class="text-0">Waiting Room!</h2>

      <div class="container-2">
        <h3 class="text-2">Game link: </h3>
        <h6 class="text-share">Share the link to your friend!</h6>
        <input type="text" value={inputValue} onChange={e => setInputValue(e.target.value)} readOnly/>
        <CopyToClipboard text={inputValue}>
          <button class="btn btn22">Copy</button>
        </CopyToClipboard>
      </div>

      <div class="container-3">
        <h3 class="text-3">Waiting for opponent!</h3>

      </div>

</div>
  );
}




export default WaitingRoom;
