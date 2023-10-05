export class Cell {
  constructor(x, y) {
    this.position = {x, y}
    this.isMine = false
    this.nearMine = false
  }

  isEqual(position) {
    return this.x === position.x && this.y === position.y
  }
}
