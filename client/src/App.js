// import React, { Component } from 'react';
import React, { useState, Component } from 'react';
import Login from './Login';
import logo from './logo_transparent.png';
import Getdata from './components/getdata'

// import Facebook from "./components/Facebook";

import{
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect
} from "react-router-dom";

import SetUpGameF from "./pages/SetUpGameF";
import SetUpGameS from "./pages/SetUpGameS";
import PlayRandom from "./pages/PlayRandom";
import WaitingRoom from "./pages/waitingRoom";
import getReady from "./pages/getReady";
import podium from "./pages/podium";
import NotFoundPage from "./pages/404"
import Rooms from './pages/Rooms';
import GameType from './pages/GameType';
import EnterCode from "./pages/EnterCode";
import ThreeIAR from "./pages/ThreeIAR";
import FourIAR from "./pages/FourIAR";
import FiveIAR from "./pages/FiveIAR";


function App() {
  return (
    <Router>
      {/* <div className="App"> */}
      {/* <img src={logo} alt="Logo" className="center"  /> */}
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/Rooms" component={Rooms} />
          <Route exact path="/GameType" component={GameType} />
          <Route exact path="/SetUpGameF" component={SetUpGameF} />
          <Route exact path="/SetUpGameS" component={SetUpGameS} />
          <Route exact path="/PlayRandom" component={PlayRandom} />
          <Route exact path="/waitingRoom" component={WaitingRoom} />
          <Route exact path="/getReady" component={getReady} />
          <Route exact path="/ThreeIAR" component={ThreeIAR} />
          <Route exact path="/FourIAR" component={FourIAR} />
          <Route exact path="/FiveIAR" component={FiveIAR} />
          {/* <Route exact path="/inarow" component={inarow} /> */}
          <Route exact path="/EnterCode" component={EnterCode} />
          <Route exact path="/podium" component={podium} />
          <Route exact path="/*" component={NotFoundPage} />
          {/* <Redirect to="/404"/> */}

        </Switch>


      {/* </div> */}
    </Router>
  )
}



export default App;
