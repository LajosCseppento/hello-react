const enum Player {
  X = 'X',
  O = 'O',
}

type Squares = (Player | null)[];

const Draw = 'Draw';

const calculateWinner = (squares: Squares): Player | typeof Draw | null => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  if (!squares.includes(null)) {
    return Draw;
  }

  return null;
};

export {calculateWinner, Draw, Player};
export type {Squares};
