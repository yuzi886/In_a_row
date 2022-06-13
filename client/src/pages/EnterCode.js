import React, { useState, useEffect } from 'react';
import{
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
  useHistory
} from "react-router-dom";

import logo from './logo_transparent.png';


const EnterCode = () => {
  const history = useHistory();

  const [inputValue, setInputValue] = useState("");

  async function verify(){
    console.log("running boss");
    // console.log(code);
    console.log(inputValue);
    const response = await fetch("/game/roomlink", {
      method: "post",
      body: JSON.stringify({"roomcode": inputValue}),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    });
    let result = await response.json();
    console.log(result);
    if(result.auth && result.room){
      console.log("Running:D");
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

  

  return(
    <div className="container-0">
      <div>
    <img src={logo} alt="Logo" className="logo"  />
    </div>

      <div class="container-4">
      <h2 class="text-0">Enter the Room Code:</h2>
      <form>
      <input type="text" value={inputValue} onChange={e => setInputValue(e.target.value)}/>
      </form>
      <button className="btn btn33" onClick={() => verify(inputValue)}>START</button>
      </div>
    </div>
    )
}
export default EnterCode;