export function generateRandomPosition() {
  const X = Math.round(Math.random()*6)
  const Y = Math.round(Math.random()*6)

  return [X, Y]
}

// export function isPositionValid(board, position) {
//   const x = position[0]
//   const y = position[1]

//   board[x][y] !== ' ' ? true : false
// }