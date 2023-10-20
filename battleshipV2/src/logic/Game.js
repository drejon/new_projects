import { Ship } from "./Ship"
import { Water } from "./Water"

export class Game {
  constructor() {
    this.orientations = ['Horizontal, Vertical']
    this.columns = 7
    this.rows = 7
    this.board = this._generateBoard()
    this.ships = this._generateShips()
    this._placeShips()
  }

  _generateBoard() {
    const board = []

    for (const y of Array(this.rows).keys()) {
      for (const x of Array(this.columns).keys()) {
        board.push(new Water({x, y}))
      }
    }

    return board
  }

  _placeShips() {
    let shipsPlaced = 0
    let position = this._randomPosition()
    
    while (shipsPlaced != 5) {
      const shipToPlace = this.ships[shipsPlaced]
      const isPositionValid = this._isPositionAvailable(position, shipToPlace)
      
      if(isPositionValid) {
        this._placeShip(shipToPlace.positions, shipToPlace)
        shipsPlaced++
      } else {
        const newPosition = this._randomPosition()
        position = newPosition
      }
    }
  }

  _generateShips() {
    const ships = [
      new Ship('C', 5),
      new Ship('B', 4),
      new Ship('F', 3),
      new Ship('D', 3),
      new Ship('S', 2),
    ]

    return ships
  }

  _getTile(position) {
    return this.board.find(tile => this._matchPosition(tile.position, position))
  }

  _setTile(position, content) {
    const tile = this._getTile(position)
    const index = this.board.indexOf(tile)

    this.board[index] = content
  }

  _randomPosition() {
    return {
      x: Math.floor(Math.random()*this.columns), 
      y: Math.floor(Math.random()*this.rows)
    }
  }

  _isPositionAvailable(position, ship) {
    const positions = this._getPositions(position, ship)
    
    const horizontal = positions[0]?.length
    const vertical = positions[1]?.length

    const orientation = Math.round(Math.random())
    
    if(horizontal === ship.size && vertical === ship.size) {
      ship.orientation = this.orientations[orientation]
      ship.positions = positions[orientation]
      return true
    }
    
    if(horizontal === ship.size) {
      ship.orientation = this.orientations[0]
      ship.positions = positions[0]
      return true
    }
    
    if(vertical === ship.size) {
      ship.orientation = this.orientations[1]
      ship.positions = positions[1]
      return true
    }
    
    return false
  }

  _matchPosition(a, b) {
    return a.x === b.x && a.y === b.y
  }

  _getPositions(position, ship) {
    const positions = [this._getHorizontalPositions(position, ship), this._getVerticalPositions(position, ship)]
    return positions
  }

  _getHorizontalPositions(position, ship) {
    const positions = []
    
    if(position.x + ship.size > this.columns) return []
    
    for (let i = position.x; i < position.x + ship.size; i++) {
      const newPosition = {x: i, y: position.y}
      const isShip = this._isShip(position)
      if(!isShip) {positions.push(newPosition)}
    }

    console.log(positions, ship)
    if(positions.length === ship.size) return positions
  }

  _getVerticalPositions(position, ship) {
    const positions = []

    if(position.y + ship.size > this.rows) return []

    for (let i = position.y; i < position.y + ship.size; i++) {
      const newPosition = {x: position.x, y: i}
      const isShip = this._isShip(position)
      if(!isShip) {positions.push(newPosition)}
    }

    if(positions.length === ship.size) return positions
  }

  _isShip(position) {
    const tile = this._getTile(position)
    return tile.isShip
  }

  _placeShip(positions, ship) {
    ship.setPositions(positions)
    const modules = ship._generateModules()

    for (const index in modules) {
      const aModule = modules[index]
      const position = positions[index]
      this._setTile(position, aModule)
    }
  }
}

