import React from 'react';
import{
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
  useHistory
} from "react-router-dom";

// import setUpGameS from './SetUpGameS';
// import setUpGameF from './SetUpGameF';

const GameType = () => {
  const history = useHistory();


  const changeUrl1 = () => {
    history.push("/SetUpGameF");
  }

  const changeUrl2 = () => {
    history.push("/SetUpGameS");
  }


  return(
    <div className="container-0">
    <h2 class="text-0">Click one of the following</h2>
    <div class="container-2">

    <h3 class="text-2">Play 1v1 with friend</h3>
    <button className="btn btn33" onClick={changeUrl1}>Set up 1v1</button>
    </div>

    <div class="container-2">
    <h3 class="text-2">Play 1v1 with stranger</h3>
    <button className="btn btn33" onClick={changeUrl2}>Set up 1v1</button>

    </div>




    </div>








  )
}

export default GameType
