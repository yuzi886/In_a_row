import React, { useState, useEffect } from 'react';
import{
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
  useHistory
} from "react-router-dom";


const SetUpGameS = () => {



  const [info, setInfo] = useState("");
  const [time, setTime] = useState("");
  const [ref, setRef] = useState("");
  // const [test, setTest] = useState("");
  // const [findState, setFindState] = useState("");
  

  // const [qTime, setQTime] = useState(0);

  var looking = false;
  var clickable = true;
  const history = useHistory();
  
  var interval;
  var timeInterval;
  var count = 0;
 
  
  
  window.addEventListener("beforeunload", function(e) {
    // generates popup it's sort of ugly but it's the only simple way
    // console.log(looking);
    if (looking == true) {
      clearInterval(interval);  
      clearInterval(timeInterval);
      setInfo("Queue Stopped");
      setTime("You need to re queue");
      e.returnValue = 'Data removed, feel free to exit site now';
      fetch("/game/removerandom/");
    }
  });


  // async function stopQ(){
  //   console.log("eyy");
  //   looking = false;
  //   console.log("dette er looking" + looking);
  //   let btn = document.getElementById("btn");
  //   btn.style.display = "none";
  //   clearInterval(interval);  
  //   clearInterval(timeInterval);
  //   setInfo("Queue Stopped");
  //   setTime("You need to re queue");
  //   fetch("/game/removerandom/");
  // }

  async function playerFound(){
    console.log("dette er looking i player " + looking);
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


  function updateTime(){
      count += 1;
      setTime("Time elapsed: " + count + " seconds");
  }

  async function size(n) {
    if(looking == false){
      console.log(n);
      const response = await fetch("/game/randomlink", {
      method: "post",
      body: JSON.stringify({"inarow": n}),
      headers: {"Content-type": "application/json; charset=UTF-8"}
      });
      let result = await response.json();
      if(result.gameFound){
        if (n== 3) {
          history.push("/ThreeIAR");
        }
        else if (n == 4) {
          history.push("/FourIAR");
        }
        else if (n == 5) {
          history.push("/FiveIAR");
        }
      }else{
        looking = true;
        const innerResponse = await fetch("/game/create", {
          method: "post",
          body: JSON.stringify({"size": 1, "inarow": n}),
          headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        if(innerResponse.ok){
          // setFindState("1");
          setRef("Refresh page to requeue");
          console.log("endret: " + looking);
          
          setInfo("Queuing for " + n + " in a row:");
          setTime("Time elapsed: 0 seconds");
          timeInterval = setInterval(() => {
            updateTime();
          }, 1000);

          interval = setInterval(() => {
            playerFound();
          }, 5000);
        }
      }
    }else{
      setInfo("Stop queing first");
    }
  };

  // removes interval when component unmounts
  useEffect(() => {
    return () => {
      clearInterval(interval);  
      clearInterval(timeInterval);  
    }
  }, []);

  


  return(

    <div className="container-0">
      <h2 class="text-0">Play with a stranger</h2>
      <h3 class="text-2">What in a row? </h3>


      <div class="container-2">
        <button class="btn btn33" onClick={() => size(3)}>3 in a row</button>
        <button class="btn btn33" onClick={() => size(4)}>4 in a row</button>
        <button class="btn btn33" onClick={() => size(5)}>5 in a row</button>
        <h5 class="text-small">{info}</h5>
        <h5 class="text-small">{time}</h5>
        <h5 class="grey-small">{ref}</h5>        
        </div>


</div>

  );
};

export default SetUpGameS;
