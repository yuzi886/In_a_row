import React from 'react';
import{
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
  useHistory
} from "react-router-dom";

import waitingRoom from "./waitingRoom";






const SetUpGameS = () => {

  const history = useHistory();

  async function size(n) {
    console.log(n);
    const response = await fetch("/game/create", {
     method: "post",
     body: JSON.stringify({"size": 1, "inarow": n}),
     headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    console.log(response.ok);
    if(response.ok){
      history.push("/waitingRoom");
    }
  };




  return(

    <div className="container-0">
      <h2 class="text-0">Set Up a Game!</h2>
      <h3 class="text-2">What in a row? </h3>


      <div class="container-2">
        <button class="btn btn33" onClick={() => size(3)}>3 in a row</button>
        <button class="btn btn33" onClick={() => size(4)}>4 in a row</button>
        <button class="btn btn33" onClick={() => size(5)}>5 in a row</button>
        </div>


</div>

  );
};

export default SetUpGameS;
