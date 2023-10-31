export class Module {
  constructor(ship, position) {
    this.name = ship
    this.ship = ship
    this.position = position
    this.isModule = true
    this.isDestroyed = false
    this.isRevealed = false
  }

  reveal() {
    this.isDestroyed = true
    this.isRevealed = true
  }

  serialize() {
    return {
      name: this.name,
      ship: this.ship,
      position: this.position,
      isDestroyed: this.isDestroyed,
      isModule: this.isModule,
      isRevealed: this.isRevealed
    }
  }
}
