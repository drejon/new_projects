import { Cell } from "./Cell"

export class Game {
  constructor(columns, rows, mines) {
    this.columns = columns
    this.rows = rows
    this.mines = mines
    this.subscribers = []
    this.board = this._createBoard()
    this._getNearMines()
  }

  updatePosition(position) {
    const cell = this._getCell(position)
    if(cell.isRevealed) return
    const nearCells = this._getNearCells(position)
    console.log(cell)
    cell.reveal()
    this._notifySubscribers()

    if (cell.nearMines === 0) {
      nearCells.forEach((nearcell) => this.updatePosition(nearcell.position))
      this._notifySubscribers()

    //   console.log('true')
    //   cell.neighbours.forEach(neighbour => {
    //     console.log('2true')
    //     neighbour.reveal()
    //     // if (neighbour.nearMines === 0) {
    //     //   neighbour.reveal()
    //     //   this.updatePosition(neighbour.position)
    //     //   this._notifySubscribers()
    //     // }
    //     // this.updatePosition(neighbour.position)
    //     // this._notifySubscribers()
    //   })
    }
    
  }

  reset() {
    this.board = this._createBoard()
    this._getNearMines()
    this._notifySubscribers()
  }

  serialize() {
    return {
      board: this.board.map(cell => cell.serialize())
    }
  }
  
  addSubscriber(subscriber) {
    this.subscribers.push(subscriber)
  }
  
  removeSubscribers() {
    this.subscribers = []
  }
  
  _notifySubscribers() {
    for (const subscriber of this.subscribers) {
      const serializedBoard = this.board.map(cell => cell.serialize())
      subscriber(serializedBoard)
    }
  }

  _createBoard() {
    const board = []
    const mines = this._getMinePositions()

    for (const y of Array(this.rows).keys()) {
      for (const x of Array(this.columns).keys()) {
        const newCell = new Cell(x, y)
        newCell.isMine = mines.some((mine) => this._positionMatch(mine, newCell.position))
        board.push(newCell)
      }
    }
    
    return board
  }

  _getMinePositions() {
    const positions = []

    while (positions.length < this.mines) {
      const position = {
        x: this._generatePosition(this.columns),
        y: this._generatePosition(this.rows)
      }

      if (!positions.some(this._positionMatch.bind(null, position))) {
        positions.push(position)
      }
    }

    return positions
  }
  
  _generatePosition(size) {
    return Math.floor(Math.random()*size)
  }

  _getCell(position) {
    return this.board.find(cell => this._positionMatch(cell.position, position))
  }

  _positionMatch(a, b) {
    return a.x === b.x && a.y === b.y
  }
  
  _getNearCells(cellPosition) {
    const neighbours = []
    
    for (let xOffset = -1; xOffset <= 1; xOffset++) {
      for (let yOffset = -1; yOffset <= 1; yOffset++) {
        
        const position = {x: cellPosition.x + xOffset, y: cellPosition.y + yOffset}
        const neighbour = this._getCell(position)

        if(neighbour !== undefined && !(this._positionMatch(cellPosition, neighbour.position)) ) {
          neighbours.push(neighbour)
        }
        // if(neighbour !== undefined) {
        //     neighbours.push(neighbour)
        // }
      }
    }

    return neighbours
  }

  _getNearMines() {
    this.board.map(cell => {
      const nearCells = this._getNearCells(cell.position)
      cell.neighbours = nearCells
      const mines = nearCells.filter((c) => c.isMine)
      
      cell.nearMines = mines.length
    })
  }

}
