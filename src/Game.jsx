/* eslint-env es2022 */

import React, { useState, useEffect } from "react";

import Board from "./Board";
import Timer from "./components/Timer";
import { calculateWinner } from "./utils";

export default function () {
  const [history, setHistory] = useState([
    { squares: Array(9).fill(null), winner: null }
  ]);

  const [stepNumber, setStepNumber] = useState(0);

  useEffect(() => {
    document.title = `Ходит ${nextPlayer()}`;
  });

  // Decorators
  function xIsNext() {
    return stepNumber % 2 === 0;
  }

  function nextPlayer() {
    return xIsNext() ? "X" : "O";
  }

  //   Handlers

  function handleClick(i) {
    const currentHistory = history.slice(0, stepNumber + 1);
    const current = currentHistory[currentHistory.length - 1];

    if (current.squares[i] || current.winner) {
      return;
    }

    const squares = current.squares.slice();
    squares[i] = nextPlayer();

    setHistory(
      currentHistory.concat([
        { squares: squares, winner: calculateWinner(squares) }
      ])
    );

    setStepNumber(currentHistory.length);
  }

  function jumpTo(step) {
    setStepNumber(step);
  }

  //   View

  const current = history[stepNumber];

  const moves = history.map((step, move) => {
    const desc = move ? `To move: ${move}` : "To the start";
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  let status;
  if (current.winner) {
    status = `The Winner is ${current.winner}!`;
  } else {
    status = `Next player: ${nextPlayer()}`;
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current.squares}
          xIsNext={xIsNext()}
          nextPlayer={nextPlayer()}
          onClick={(i) => handleClick(i)}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <Timer />
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
