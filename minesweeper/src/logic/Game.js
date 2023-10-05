import { Cell } from "./Cell"

export class Game {
  constructor(columns, rows, mines) {
    this.columns = columns
    this.rows = rows
    this.mines = mines
    this.board = this.createBoard()
    this.getNearMines()
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

  getCell(position) {
    return this.board.find(cell => this.positionMatch(cell.position, position))
  }

  positionMatch(a, b) {
    return a.x === b.x && a.y === b.y
  }
  
  getNearCells(cellPosition) {
    const neighbours = []
    
    for (let xOffset = -1; xOffset <= 1; xOffset++) {
      for (let yOffset = -1; yOffset <= 1; yOffset++) {
        const position = {x: cellPosition.x + xOffset, y: cellPosition.y + yOffset}
        const neighbour = this.getCell(position)

        if(neighbour !== undefined) {neighbours.push(neighbour)}
      }
    }
    // console.log(neighbours)
    return neighbours
  }

  getNearMines() {
    this.board.map(cell => {
      const nearCells = this.getNearCells(cell.position)
      const mines = nearCells.filter((c) => c.isMine)
      
      cell.nearMines = mines.length
    })
  }
}
