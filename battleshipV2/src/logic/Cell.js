export class Cell {
  constructor(name, position) {
    this.name = name
    this.position = position
    this.isRevealed = false
    this.isHit = false
    this.orientations = ['N', 'E', 'S', 'W']
    this.orientation = this.orientations[1]
    this.isWater = true
  }
  
  turnToModule(newName) {
    this.name = newName
    this.isWater = false
  }

  serialize() {
    return {
      name: this.name,
      position: this.position,
      isRevealed: this.isRevealed,
      isHit: this.isHit,
      orientations: this.orientations,
      orientation: this.orientation,
      isWater: this.isWater,
      ship: this.ship,
    }
  }

  orientate(orientation) {
    this.orientation = this.orientations[orientation]
  }

  reveal() {
    this.isRevealed = true
  }

  hide() {
    this.isRevealed = false
  }

  hit() {
    this.isHit = true
  }
}
