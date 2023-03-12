import React, {useState} from 'react';
import Board from './Board';
import {calculateWinner, Draw, Player, Squares} from '../utils/model';

type Props = {
  // Missing you Stuff Made Here :-(
  wifeMode?: boolean;
};

const Game = ({wifeMode}: Props) => {
  const [history, setHistory] = useState<{squares: Squares}[]>([
    {squares: Array(9).fill(null)},
  ]);
  const [stepNumber, setStepNumber] = useState(0);
  const [nextPlayer, setNextPlayer] = useState(Player.X);

  const handleClick = (i: number) => {
    const slicedHistory = history.slice(0, stepNumber + 1);
    const current = slicedHistory[slicedHistory.length - 1];
    const squares = current.squares.slice();

    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    // Simple but does the job (tested)
    if (wifeMode && stepNumber > 3 && nextPlayer === Player.X) {
      if (i > 0 && squares[i - 1] === null) {
        console.log('Oops!');
        i--;
      }
    }

    squares[i] = nextPlayer;
    setHistory(slicedHistory.concat([{squares: squares}]));
    setStepNumber(slicedHistory.length);
    setNextPlayer(nextPlayer === Player.X ? Player.O : Player.X);
  };

  const jumpTo = (step: number) => {
    console.log('Jumping to step', step);

    setStepNumber(step);
    setNextPlayer(step % 2 === 0 ? Player.X : Player.O);
  };

  console.log('Game rendering', history, stepNumber, nextPlayer);

  const squares = history[stepNumber].squares;
  const winner = calculateWinner(squares);

  let status: string;
  if (winner === Draw) {
    status = 'Draw';
  } else if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + nextPlayer;
  }

  const moves = history.map((_, move) => {
    const desc = move ? 'Go to move #' + move : 'Go to game start';
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  return (
    <>
      <h1>Tic Tac Toe (TS/React/function arrow components)</h1>
      <div className="game">
        <div className="game-board">
          <Board squares={squares} onClick={i => handleClick(i)} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    </>
  );
};

export default Game;
