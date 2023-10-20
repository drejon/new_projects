// import { SHIPS } from "../consts"
import { Ship } from "./Ship"
import { Water } from "./Water"

const COLUMNS = 7
const ROWS = 7

export class Game {
  constructor() {
    this.board = this._generateBoard()
    this.ships = this._generateShips()
    this._placeShip({x: 1, y: 1}, this.ships[0])
  }

  _generateBoard() {
    const board = []

    for (const y of Array(ROWS).keys()) {
      for (const x of Array(COLUMNS).keys()) {
        board.push(new Water({x, y}))
      }
    }

    return board
  }

  _generateShips() {
    const ships = [
      new Ship('C', 5),
      new Ship('Battleship', 4),
      new Ship('Frigate', 3),
      new Ship('Destroyer', 3),
      new Ship('Submarine', 2),
    ]

    return ships
  }
  _getTile(position) {
    return this.board.find((tile) => this._matchPosition(tile.position, position))
  }

  _setTile(position, content) {
    const tile = this._getTile(position)
    const index = this.board.indexOf(tile)

    this.board[index] = content
  }

  _matchPosition(a, b) {
    return a.x === b.x && a.y === b.y
  }

  _getPositions(position, ship) {
    const positions = []

    if(position.x + ship.size > COLUMNS) return
    if(position.y + ship.size > ROWS) return

    if(ship.orientation === 'Horizontal') {
      for (let i = position.x; i < position.x + ship.size; i++) {
        const newPosition = {x: i, y: position.y}
        if(!this._isShip(position)) {positions.push(newPosition)}
      }
    }

    if (ship.orientation === 'Vertical') {
      for (let i = position.y; i < position.y + ship.size; i++) {
        const newPosition = {x: position.x, y: i}
        if(!this._isShip(position)) {positions.push(newPosition)}
      }
    }

    // else {
    //   for (let i = position.y; i < position.y + ship.size; i++) {
    //     const newPosition = {x: position.x, y: i}
    //     if(!this._isShip(position)) {positions.push(newPosition)}
    //   }
    // }

    if(positions.length === ship.size) {
      ship.setPositions(positions)
      return positions
    }
  }

  _isShip(position) {
    const tile = this._getTile(position)

    return tile.name !== 'Water'
  }

  _placeShip(position, ship) {
    const positions = this._getPositions(position, ship)
    const modules = ship._generateModules()
    
    for (const aModule of modules) {
      for (const position of positions) {
        this._setTile(position, aModule)
      }
    }
  }
}

