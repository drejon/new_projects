export class Game {
  constructor() {
    this.generateBoard
  }

  _generateBoard() {
    const board = emptyBoard()
    let index = 0
  
    do {
      let position = getRandomPosition()
      const isValid = isPositionValid(SHIPS[index], board, position)
      
      if (isValid) {
        placeShip(SHIPS[index], board, position)
        index++
      } else {
        const newPosition = getRandomPosition()
        position = newPosition
      }
    } while (index != 5)
    
    return board
  }
}
