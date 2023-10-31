export class Water {
  constructor(position) {
    this.name = 'W'
    this.isModule = false
    this.position = position
    this.isRevealed = false
  }

  serialize() {
    return {
      name: this.mame,
      isModule: this.isModule,
      isDestroyed: this.isDestroyed,
      position: this.position,
      isRevealed: this.isRevealed
    }
  }

  reveal() {
    this.isDestroyed = true
    this.isRevealed = true
  }
}
