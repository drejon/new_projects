export class Module {
  constructor(ship, position) {
    this.name = ship
    this.ship = ship
    this.position = position
    this.isModule = true
    this.isDestroyed = false
  }

  destroy() {
    this.isDestroyed = true
  }

  serialize() {
    return {
      name: this.name,
      ship: this.ship,
      position: this.position,
      isDestroyed: this.isDestroyed,
      isModule: this.isModule,
    }
  }
}
