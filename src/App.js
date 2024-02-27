import './App.css';
import { useState } from 'react';

function Square({value, onSquareClicked}) {

  return (
    <button 
      className="square"
      onClick={onSquareClicked}
    >
      {value}
    </button>
  )
}

function Board({xIsNext, squares, onPlay}) {

  // const [value, setValue] : value stores the value and setValue is a function that can be used to change the value
  // The value passed in useState is the initial value
  // const [xIsNext, setXIsNext] = x
  // const [squares, setSquares] = useState(Array(9).fill(null));
  const winner = calculateWinner(squares);
  let status;
  
  function handleClick(i) {
    //Returns if square already clicked and if theres a winner
    if (squares[i] || calculateWinner(squares)) return;
    //Creates a copy to squares array as nextSquares
    const nextSquares = squares.slice();
    //Checks turn
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    //Lets React know the state of the component has changed
    //Updating board state and turn
    // setSquares(nextSquares);
    // setXIsNext(!xIsNext);

    onPlay(nextSquares);
  }

  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
    <div className='status'>{status}</div>
      <div className='board-row'>
        <Square value={squares[0]} onSquareClicked={() => handleClick(0)}/>
        <Square value={squares[1]} onSquareClicked={() => handleClick(1)}/>
        <Square value={squares[2]} onSquareClicked={() => handleClick(2)}/>
      </div>
      <div className='board-row'>
        <Square value={squares[3]} onSquareClicked={() => handleClick(3)}/>
        <Square value={squares[4]} onSquareClicked={() => handleClick(4)}/>
        <Square value={squares[5]} onSquareClicked={() => handleClick(5)}/>
      </div>
      <div className='board-row'>
        <Square value={squares[6]} onSquareClicked={() => handleClick(6)}/>
        <Square value={squares[7]} onSquareClicked={() => handleClick(7)}/>
        <Square value={squares[8]} onSquareClicked={() => handleClick(8)}/>
      </div>
    </>
  )
}

export default function Game() {
  
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  //xIsNext is true when current move is even
  //xIsNext is false when current move is odd
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(newSquares) {
    //Updates history (appends the updates squares array as a new history entry) and toggles player turn
    //Enumerated all the items in history
    // setHistory([...history, newSquares]);
    const nextHistory = [...history.slice(0, currentMove + 1), newSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    //Set xIsNext to true if the number that you're changing currentMove to is even
  }

  //For each move in the game's history, created a list item <li> which contains a button <button>
  const moves = history.map((squares, move) => {
      let description;
      if (move > 0) {
        description = "Go to move #" + move;
      } else {
        description = "Got to game start";
      }
      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{description}</button>
        </li>
      );
    }
  );

  return (
    <div>
      <div>
        <h1>TIC-TAC-TOE</h1>
      </div>
      <div className='game'>
        <div className='game-board'>
          <h2>Game</h2>
          <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/> 
        </div>
        <div className='game-info'>
          <h2>History</h2>
          <ol>{moves}</ol>
        </div>
      </div>
    </div>
    
  )
}

function calculateWinner(squares) {
  //All possible win states
  const lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ];

  for (let i=0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) return squares[a];
  }
  return null;
}


