export class Water {
  constructor(position) {
    this.name = 'W'
    this.isModule = false
    this.position = position
    this.isDestroyed = false
  }

  serialize() {
    return {
      name: this.mame,
      isModule: this.isModule,
      isDestroyed: this.isDestroyed,
      position: this.position,
    }
  }

  destroy() {
    this.isDestroyed = true
  }
}
