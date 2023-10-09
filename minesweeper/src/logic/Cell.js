export class Cell {
  constructor(x, y) {
    this.position = {x, y}
    this.isMine = false
    this.isRevealed = false
    this.isMarked = false
    this.nearMines = 0
    this.neighbours = []
  }

  isEqual(position) {
    return this.x === position.x && this.y === position.y
  }

  reveal() {
    this.isRevealed = true
    return this.nearMines
  }

  mark() {
    this.isMarked = true
    return this.isMarked
  }

  serialize() {
    return {
      position: {x: this.position.x, y: this.position.y},
      isMine: this.isMine,
      isRevealed: this.isRevealed,
      isMarked: this.isMarked,
      nearMines: this.nearMines,
      neightbours: this.neightbours
    }
  }
}
