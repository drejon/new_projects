import { Module } from "./Module"

export class Ship {
  constructor(name, size) {
    this.name = name
    this.positions = []
    this.orientation = ''
    this.size = size
    this.modules = []
    this.isShip = true
    this.sunk = false
  }

  setPositions(positions) {
    this.positions = positions
    this._setModules()
    return this.positions
  }

  setOrientation(orientation) {
    this.orientation = orientation
  }

  _setModules() {
    const modules = []
    
    for (const position of this.positions) {
     modules.push(new Module(this.name, position))
    }
    this.modules = modules
    
    return modules
  }
}
