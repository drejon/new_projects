import { Cell } from "./Cell"

export class Game {
  constructor(columns, rows) {
    this.columns = columns
    this.rows = rows
    this.board = this.createBoard()
  }

  createBoard() {
    const board = []

    for (const row of Array(this.rows).keys()) {
      for (const column of Array(this.columns).keys()) {
        board.push(new Cell(column, row))
      }
    }

    return board
  }
  
  generatePosition() {
    return {x: Math.floor(Math.random()*this.columns), y: Math.floor(Math.random()*this.rows)}
  }
}
