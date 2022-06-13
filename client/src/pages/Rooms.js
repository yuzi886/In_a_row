import React from 'react';
import{
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
  useHistory
} from "react-router-dom";

const Rooms = () => {
  const history = useHistory();


  const changeUrl = () => {
    history.push("/SetUpGameF");
  }

  const changeUrl2 = () => {
    history.push("/EnterCode");
  }

  const changeUrl3 = () => {
    history.push("/PlayRandom");
  }


  return(
    <div className="container-0">
    <h2 class="text-0">Click one of the following</h2>
    <div class="container-2">

    <h3 class="text-2">Join existing room</h3>
    <button className=" btn btn33" onClick={changeUrl2}>Enter code</button>
    </div>

    <div class="container-2">
    <h3 class="text-2">Create a new room</h3>
    <button className="btn btn33" onClick={changeUrl}>Set up game</button>

    </div>

    <div class="container-2">
    <h3 class="text-stranger">Play with stranger</h3>
    <button className="btn btn33" onClick={changeUrl3}>Find game</button>


    </div>




    </div>


  )
}

export default Rooms
