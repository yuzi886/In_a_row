import React from 'react';
// import ReactDOM from 'react-dom';
// import{
//   BrowserRouter as Router,
//   Route,
//   Switch,
//   Link,
//   Redirect,
//   useHistory
// } from "react-router-dom";



class FiveIAR extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      player1: 1,
      player2: 2,
      thisPlayer: null,
      cord: null,
      currentPlayer: null,
      board: null,
      gameOver: false,
      message: ''
    };
    this.getState();
    // Bind play function to FourIAR component
    this.play = this.play.bind(this);
  }

  async getState(){
    const response = await fetch("/game/playerstate", {method: "get", headers: {"Content-type": "application/json; charset=UTF-8"}});
    let result = await response.json();
    console.log(result.starting);

    if (result.starting == false){
      this.state.thisPlayer = 2
    }else{
      this.state.thisPlayer = 1
    }
  }


  // Starts new game
  initBoard() {
    // Create a blank 6x7 matrix
    let board = [];
    for (let r = 0; r < 7; r++) {
      let row = [];
      for (let c = 0; c < 8; c++) { row.push(null) }
      board.push(row);
    }

    this.setState({
      board,
      currentPlayer: this.state.player1,
      gameOver: false,
      message: ''
    });
  }

  togglePlayer() {
    return (this.state.currentPlayer === this.state.player1) ? this.state.player2 : this.state.player1;
  }


  renderGame(xCord){
    console.log("update has arrived!");
    var board = this.state.board;
    for (let r = 6; r >= 0; r--) {
      if (!board[r][xCord]) {
        board[r][xCord] = this.state.currentPlayer;
        break;
      }
    }
    // Check status of board
    let result = this.checkAll(board);
    if (result === this.state.player1) {
      this.setState({ board, gameOver: true, message: 'Player 1 (red) wins!' });
    } else if (result === this.state.player2) {
      this.setState({ board, gameOver: true, message: 'Player 2 (blue) wins!' });
    } else if (result === 'draw') {
      this.setState({ board, gameOver: true, message: 'Draw game.' });
    } else {
      this.setState({ board, currentPlayer: this.togglePlayer() });
    }
  }


  play(xCord, user) {
    if (!this.state.gameOver) {
      // Place piece on board
      // console.log("this player: " + this.state.thisPlayer + " current player: " + this.state.currentPlayer);
      if (user == true && this.state.thisPlayer == this.state.currentPlayer){
        fetch("/game/sendmove", {
        method: "post",
        body: JSON.stringify({"x": xCord, "y": 0}),
        headers: {"Content-type": "application/json; charset=UTF-8"}
        });
        this.renderGame(xCord);
      }
    } else {
      this.setState({ message: 'Game over. Please start a new game.' });
    }
  }

  checkVertical(board) {
    // Check only if row is 3 or greater
    for (let r = 3; r < 7; r++) {
      for (let c = 0; c < 8; c++) {
        if (board[r][c]) {
          if (board[r][c] === board[r - 1][c] &&
              board[r][c] === board[r - 2][c] &&
              board[r][c] === board[r - 3][c]&&
              board[r][c] === board[r - 4][c] ) {
            return board[r][c];
          }
        }
      }
    }
  }

  checkHorizontal(board) {
    // Check only if column is 3 or less
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 5; c++) {
        if (board[r][c]) {
          if (board[r][c] === board[r][c + 1] &&
              board[r][c] === board[r][c + 2] &&
              board[r][c] === board[r][c + 3] &&
              board[r][c] === board[r][c + 4]) {
            return board[r][c];
          }
        }
      }
    }
  }

  checkDiagonalRight(board) {
    // Check only if row is 3 or greater AND column is 3 or less
    for (let r = 3; r < 7; r++) {
      for (let c = 0; c < 5; c++) {
        if (board[r][c]) {
          if (board[r][c] === board[r - 1][c + 1] &&
              board[r][c] === board[r - 2][c + 2] &&
              board[r][c] === board[r - 3][c + 3] &&
              board[r][c] === board[r - 4][c + 4]) {
            return board[r][c];
          }
        }
      }
    }
  }

  checkDiagonalLeft(board) {
    // Check only if row is 3 or greater AND column is 3 or greater
    for (let r = 3; r < 7; r++) {
      for (let c = 3; c < 8; c++) {
        if (board[r][c]) {
          if (board[r][c] === board[r - 1][c - 1] &&
              board[r][c] === board[r - 2][c - 2] &&
              board[r][c] === board[r - 3][c - 3] &&
              board[r][c] === board[r - 4][c - 4]) {
            return board[r][c];
          }
        }
      }
    }
  }

  checkDraw(board) {
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 8; c++) {
        if (board[r][c] === null) {
          return null;
        }
      }
    }
    return 'draw';
  }

  checkAll(board) {
    return this.checkVertical(board) || this.checkDiagonalRight(board) || this.checkDiagonalLeft(board) || this.checkHorizontal(board) || this.checkDraw(board);
  }


  // runs everytime the component loads including refresh
  async populateBoard(){
    const response = await fetch("/game/getboard", {method: "get", headers: {"Content-type": "application/json; charset=UTF-8"}});
    let res = await response.json();
    if (res.length != 0) {
      // code runs where there have been made moves
      let opponent;
      if (this.state.thisPlayer == 1) {
        opponent = 2;
      }else{
        opponent = 2;
      }
      for(let i=0; i < res.length; i++){
        console.log(res[i].thisUser);
        console.log(res[i].x);
        console.log(res[i].y);
        this.renderGame(res[i].x);

      }
    }else{
      // runs when no moves have been made
      console.log("is me mario");
      console.log(res);
    }
  }


  async getUpdate(){
    const response = await fetch("/game/update", {method: "get", headers: {"Content-type": "application/json; charset=UTF-8"}});
    let res = await response.json();
    console.log("fra api update:" + res.update);
    if (res.update == true) {
      console.log("fra api update:" + res.update);

      this.renderGame(res.x);
    }
  }

  componentWillMount() {
    this.initBoard();
    this.populateBoard()
    setInterval(this.getUpdate.bind(this), 2000);
  }

  render() {
    return (
      <div>
        <div className="space"></div>

        <table>
          <thead>
          </thead>
          <tbody>
            {this.state.board.map((row, i) => (<Row key={i} row={row} play={this.play} />))}
          </tbody>
        </table>

        <p className="message">{this.state.message}</p>
      </div>
    );
  }
}

// Row component
const Row = ({ row, play }) => {
  return (
    <tr>
      {row.map((cell, i) => <Cell key={i} value={cell} columnIndex={i} play={play} />)}
    </tr>
  );
};

const Cell = ({ value, columnIndex, play }) => {
  let color = 'white';
  if (value === 1) {
    color = 'red';
  } else if (value === 2) {
    color = 'blue';
  }

  return (
    <td>
      <div className="cell" onClick={() => {play(columnIndex, true)}}>
        <div className={color}></div>
      </div>
    </td>
  );
};



export default FiveIAR;
