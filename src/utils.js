export function calculateWinner(squares) {
  const lines = [
    // Rows
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // Diagonals
    [0, 4, 8],
    [2, 4, 6],
    // Cols
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
  ];

  for (let line of lines.values()) {
    const [a, b, c] = line;
    //     const [a, ...tail] = line

    //     if (squares[a] && tail.every((cell) => squares[cell] == squares[a])) {
    //       console.log(squares[a])
    //     }

    if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}
