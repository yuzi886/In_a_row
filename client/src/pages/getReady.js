import React from 'react';
import{
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect
} from "react-router-dom";

const getReady = () => {
  return (
    <div className="container-00">
      <h2 class="text-4">Get ready!</h2>

      <div class="container-2">
        <h3 class="text-2">Round 1: </h3>
        <button class="btn btn28">ID+pic</button>
          <h3 class="text-5">VS</h3>
        <button class="btn btn29">ID+pic</button>
      </div>


    </div>
  );
}





export default getReady;
