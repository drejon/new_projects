import { Ship } from "./Ship"
import { Water } from "./Water"

export class Game {
  constructor() {
    this.orientations = ['Horizontal', 'Vertical']
    this.columns = 7
    this.rows = 7
    this.subscribers = []
    this.winState = null
    this.board = this._generateBoard()
    this.ships = this._generateShips()
    this._placeShips()
  }

  updatePosition(position) {
    const tile = this._getTile(position)

    if(tile.isRevealed) return
    
    tile.reveal()
    console.log(tile)
    this._notifySubscribers()
  }

  serialize() {
    return {
      board: this.board.map(tile => tile.serialize())
    }
  }

  reset() {
    this.board = this._generateBoard()
    this.ships = this._generateShips()
    this._placeShips()
    this._notifySubscribers()
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

  _placeShips() {
    let shipsPlaced = 0
    
    while (shipsPlaced != 5) {
      const shipToPlace = this.ships[shipsPlaced]
      let position = this._randomPosition()

      const positions = this._getPositions(position, shipToPlace)
      const isValidPositions = this._isValidPositions(positions, shipToPlace)
      
      if(isValidPositions) {
        this._placeShip(shipToPlace.positions, shipToPlace)
        shipsPlaced++
      } else {
        const newPosition = this._randomPosition()
        position = newPosition
      }
    }
  }

  _isValidPositions(positions, ship) {
    const horizontals = positions[0]?.length
    const verticals = positions[1]?.length

    const orientation = Math.round(Math.random())

    if(horizontals === verticals === ship.size) {
      ship.setOrientation(this.orientations[orientation])
      this._placeShip(positions[orientation], ship)
      return true
    }

    if(horizontals === ship.size) {
      ship.setOrientation(this.orientations[0])
      this._placeShip(positions[0], ship)
      return true
    }

    if(verticals === ship.size) {
      ship.setOrientation(this.orientations[1])
      this._placeShip(positions[1], ship)
      return true
    }

    return false
  }

  _placeShip(positions, ship) {
    ship.setPositions(positions)
    const modules = ship.modules

    for (const index in modules) {
      const aModule = modules[index]
      const position = positions[index]
      this._setTile(position, aModule)
    }
  }

  _getPositions(position, ship) {
    // Horizontal
    const positions = []

    let horizontal = []
    for (let offset = 0; offset < ship.size; offset++) {
      const newPosition = {x: position.x + offset, y: position.y}
      const tile = this._getTile(newPosition)
      if(tile !== undefined) {
        !tile.isModule ? horizontal.push(newPosition) : horizontal = []
      }
    }
    
    let vertical = []
    for (let offset = 0; offset < ship.size; offset++) {
      const newPosition = {x: position.x, y: position.y + offset}
      const tile = this._getTile(newPosition)
      
      if(tile !== undefined) {
        !tile.isModule ? vertical.push(newPosition) : vertical = []
      }
    }

    positions.push(horizontal, vertical)
    
    return positions
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

  _matchPosition(a, b) {
    return a.x === b.x && a.y === b.y
  }
}

