import React from "react";
import { Board } from "./Board";
import { calculateWinner, Draw, Player, Squares } from "../utils/model";

export type GameProps = {
  // Missing you Stuff Made Here :-(
  wifeMode?: boolean;
};

export type GameState = {
  history: { squares: Squares }[];
  stepNumber: number;
  nextPlayer: Player;
};

export class Game extends React.Component<GameProps, GameState> {
  constructor(props: GameProps) {
    super(props);
    this.state = {
      history: [{ squares: Array(9).fill(null) }],
      stepNumber: 0,
      nextPlayer: Player.X,
    };
  }

  private handleClick(i: number) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    // Simple but does the job (tested)
    if (
      this.props.wifeMode &&
      this.state.stepNumber > 3 &&
      this.state.nextPlayer === Player.X
    ) {
      if (i > 0 && squares[i - 1] === null) {
        console.log("Oops!");
        i--;
      }
    }

    squares[i] = this.state.nextPlayer;
    this.setState({
      history: history.concat([{ squares: squares }]),
      stepNumber: history.length,
      nextPlayer: this.state.nextPlayer === Player.X ? Player.O : Player.X,
    });
  }

  private jumpTo(step: number) {
    console.log("Jumping to step", step);

    this.setState({
      stepNumber: step,
      nextPlayer: step % 2 === 0 ? Player.X : Player.O,
    });
  }

  render() {
    console.log("Game rendering", this.state);

    const history = this.state.history;
    const squares = history[this.state.stepNumber].squares;
    const winner = calculateWinner(squares);

    let status: string;
    if (winner === Draw) {
      status = "Draw";
    } else if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + this.state.nextPlayer;
    }

    const moves = history.map((step, move) => {
      const desc = move ? "Go to move #" + move : "Go to game start";
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    return (
      <>
        <h1>Tic Tac Toe (TS/React)</h1>
        <div className="game">
          <div className="game-board">
            <Board squares={squares} onClick={(i) => this.handleClick(i)} />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      </>
    );
  }
}
