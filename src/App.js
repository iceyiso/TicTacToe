import './App.css';
import { Link } from 'react-router-dom';
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

export default function Board() {

  // const [value, setValue] : value stores the value and setValue is a function that can be used to change the value
  // The value passed in useState is the initial value
  const [xIsNext, setXIsNext] = useState(true)
  const [squares, setSquares] = useState(Array(9).fill(null));
  const winner = calculateWinner(squares);
  let status;
  
  function handleClick(i) {
    //Returns if square already clicked and if theres a winner
    if (squares[i] || calculateWinner(setSquares)) return;
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
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
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
    if (squares[a] && squares[a] == squares[b] && squares[a] == squares[c]) return squares[a];
  }
  return null;
}
