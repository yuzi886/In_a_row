import React from 'react';

import{
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect
} from "react-router-dom";

const podium = () => {
  return (
    <div className="container-01">

    <div className="podiumBox">
    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" class="bi bi-signpost-fill" viewBox="0 0 16 16">
    <path d="M7.293.707A1 1 0 0 0 7 1.414V4H2a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h5v6h2v-6h3.532a1 1 0 0 0 .768-.36l1.933-2.32a.5.5 0 0 0 0-.64L13.3 4.36a1 1 0 0 0-.768-.36H9V1.414A1 1 0 0 0 7.293.707z"/>
    </svg></div>

      <h2 class="text-6">At the podium!</h2>

      <div class="container-2">
        <h3 class="text-3">Last round you bested</h3>
        <button class="btn btn30">pic | ID  | wins: | win:  %</button>
      </div>

      <div class="container-3">
        <h3 class="text-3">Would you like to:</h3>
        <button class="btn btn31">pic + re do tourney</button>
        <button class="btn btn32">pic + new game</button>

      </div>

    </div>
  );
}





export default podium;
