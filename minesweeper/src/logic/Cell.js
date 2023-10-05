export class Cell {
  constructor(x, y) {
    this.position = {x, y}
    this.isMine = false
    this.nearMines = 0
    this.index = 0
  }

  isEqual(position) {
    return this.x === position.x && this.y === position.y
  }
}
