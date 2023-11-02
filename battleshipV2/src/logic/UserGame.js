import { Cell } from "../logic/Cell"
import { Ship } from "./Ship"

export class UserGame {
  constructor() {
    this.columns = 7
    this.rows = 7
    this.subscribers = []
    this.placeState = true
    this.board = this._generateBoard()
    this.ships = this._generateShips()
  }

  serialize() {
    return {
      board: this.board.map(cell => cell.serialize())
    }
  }

  _generateShips() {
    this.ships = [
      new Ship('C', 5),
      new Ship('B', 4),
      new Ship('F', 3),
      new Ship('D', 3),
      new Ship('S', 2),
    ]

    return this.ships
  }

  _getNorthCells(position, ship) {
    const isNorthValid = position.y - ship.size >= -1 
    const northCells = []

    if(isNorthValid) {
      for (let offset = 0; offset < ship.size; offset++) {
        const newPosition = {x: position.x, y: position.y - offset}
        const cell = this._getCell(newPosition)
        if(cell.isWater) {
          northCells.push(cell)
        }
      }
    }

    return northCells
  }
  _getEastCells(position, ship) {
    const isEastValid = position.x + ship.size <= this.columns
    const eastCells = []

    if(isEastValid) {
      for (let offset = 0; offset < ship.size; offset++) {
        const newPosition = {x: position.x + offset, y: position.y}
        const cell = this._getCell(newPosition)
        if(cell.isWater) {
          eastCells.push(cell)
        }
      }
    }

    return eastCells
  }
  _getSouthCells(position, ship) {
    const isSouthValid = position.y + ship.size <= this.rows
    const southCells = []

    if(isSouthValid) {
      for (let offset = 0; offset < ship.size; offset++) {
        const newPosition = {x: position.x , y: position.y + offset}
        const cell = this._getCell(newPosition)
        if(cell.isWater) {
          southCells.push(cell)
        }
      }
    }

    return southCells
  }
  _getWestCells(position, ship) {
    const isWestValid = position.x - ship.size >= -1
    const westCells = []
    
    if(isWestValid) {
      for (let offset = 0; offset < ship.size; offset++) {
        const newPosition = {x: position.x - offset , y: position.y}
        const cell = this._getCell(newPosition)
        if(cell.isWater) {
          westCells.push(cell)
        }
      }
    }

    return westCells
  }

  _cellsToUpdate(position, ship) {

    const cells = [
      this._getNorthCells(position, ship),
      this._getEastCells(position, ship),
      this._getSouthCells(position, ship),
      this._getWestCells(position, ship),
    ]
    
    return cells
  }

  updatePlacement(position, visible, orientation, ship) {
    const cells = this._cellsToUpdate(position, ship)[orientation]
    if(cells.length !== ship.size) return
    if(visible) {
      cells.map(
        cell => {
          cell.reveal()
          cell.orientate(orientation)
        }
        )
    }
    
    if(!visible) {
      cells.map(
        cell => {
          cell.hide()
          cell.orientate(orientation)
      })
    }

    this._notifySubscribers()
    return cells
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

  _generateBoard() {
    const board = []

    for (const y of Array(this.rows).keys()) {
      for (const x of Array(this.rows).keys()) {
        board.push(new Cell('W', {x: x, y: y}))
      }
    }
    
    return board
  }

  placeShip(modules) {
    for (const module of modules) {
      const cell = this._getCell(module.position)
      cell.turnToModule()
    }
    this._notifySubscribers()
  }

  _getCell(position) {
    return this.board.find(cell => this._matchPosition(cell.position, position))
  }

  _matchPosition(a, b) {
    return a.x === b.x && a.y === b.y
  }
}
