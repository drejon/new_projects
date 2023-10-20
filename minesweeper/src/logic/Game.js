import { Cell } from "./Cell"
const STATES = {
  WIN: 'win',
  LOSE: 'lose'
}
export class Game {
  constructor(columns, rows, mines) {
    this.columns = columns
    this.rows = rows
    this.mines = mines
    this.subscribers = []
    this.winState = null
    this.board = this._createBoard()
    this._getNearMines()
  }

  updatePosition(position, isMarked) {
    const cell = this._getCell(position)
    
    if(cell.isRevealed) return
    
    if (isMarked) {
      cell.mark()
      this._checkWin()
      this._notifySubscribers()
      return
    }
    
    if (cell.isMine) {
      this._reveal()
      this.winState = STATES.LOSE
    }
    
    cell.reveal()
    
    if (cell.nearMines === 0) {
      const nearCells = this._getNearCells(position)
      nearCells.forEach((nearcell) => this.updatePosition(nearcell.position))
    }
    
    this._checkWin()
    this._notifySubscribers()
  }

  reset() {
    this.board = this._createBoard()
    this.winState = null
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
      const serializedBoard = this.serialize().board
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

  _checkWin() {
    const markedCells = this.board.filter((cell) => cell.isMine && cell.isMarked)
    if (markedCells.length === this.mines) {
      this.winState = STATES.WIN
      this._reveal()
    }
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

  _reveal() {
    this.board.map((cell) => {
      cell.reveal()
      this._notifySubscribers()
    })
  }

}
