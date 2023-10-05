import { Cell } from "./Cell"

export class Game {
  constructor(columns, rows, mines) {
    this.columns = columns
    this.rows = rows
    this.mines = mines
    this.board = this.createBoard()
  }

  createBoard() {
    const board = []
    const mines = this.getMinePositions()

    for (const y of Array(this.rows).keys()) {
      for (const x of Array(this.columns).keys()) {
        const newCell = new Cell(x, y)
        newCell.isMine = mines.some((mine) => this.positionMatch(mine, newCell.position))
        board.push(newCell)
      }
    }
    console.log(board)
    return board
  }

  getMinePositions() {
    const positions = []

    while (positions.length < this.mines) {
      const position = {
        x: this.generatePosition(this.columns),
        y: this.generatePosition(this.rows)
      }

      if (!positions.some(this.positionMatch.bind(null, position))) {
        positions.push(position)
      }
    }

    return positions
  }
  
  generatePosition(size) {
    return Math.floor(Math.random()*size)
  }
  
  positionMatch(a, b) {
    return a.x === b.x && a.y === b.y
  }
  

}
