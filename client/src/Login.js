import React from 'react';
import{
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
  useHistory
} from "react-router-dom";

import Rooms from "./pages/Rooms";

import * as queryString from 'query-string';
import facebook_url from "./components/facebook";
import google_url from "./components/google";


import logo from './logo_transparent.png';



const Login = () => {
  const history = useHistory();

  async function auth(){
    const response = await fetch("/user/signedin");
    let result = await response.json();
    if(result.auth){
      history.push("/Rooms");
    }
  }
  auth();

  async function guestBtn(){
    const response = await fetch("/guest/create");
    console.log(response.status);
    if(response.status == 200){
      const inerRes = await fetch("/game/inarowtype");
      let result = await inerRes.json();
      if (result.inarow == 3) {
        history.push("/ThreeIAR");
      }
      else if (result.inarow == 4) {
        history.push("/FourIAR");
      }
      else if (result.inarow == 5) {
        history.push("/FiveIAR");
      }
    }else{
      history.push("/Rooms");
    }
  }

  const facebookLoginUrl = facebook_url();
  const googleLoginUrl = google_url();


  return(
    <div className="container-0">


    <div>
    <img src={logo} alt="Logo" className="logo"  />
    </div>


    <div className="flex-box-container-1">

    <a className="fbbt" href={ facebookLoginUrl }></a>
    <div className="containerblank">
    <a className="ggbt" href={ googleLoginUrl }></a>
    </div>



    <div class="line"></div>

    <div className="flex-box-container-2">

    </div>
    <button className="btn4 btn-4th btn-lg" onClick={() => guestBtn()}>Continue as a Guest
    </button>

    </div>




    </div>
  );
};

export default Login;
