export class Arbitrator {
  constructor(player, computer) {
    this.player = player
    this.computer = computer
    this.playerBoard = player.board
    this.computerBoard = computer.board
    this.gameState = null
    this.turn = 0
    this.turns = [0, 1]
  }

  fireToPlayer() {
    let randomPosition = this.getRandomPosition()
    let notFiredPosition = true

    if(!this.player.isPlacing) {
      
      while(notFiredPosition) {
        const cell = this.player.getCell(randomPosition)
        
        if(!cell.isHit) {
          this.player.fired(randomPosition)
          notFiredPosition = false
        } else {
          const newRandomPosition = this.getRandomPosition()
          randomPosition = newRandomPosition
        }
      }
    }
  }

  getRandomPosition() {
    return {
      x: Math.floor(Math.random()*this.columns), 
      y: Math.floor(Math.random()*this.rows)
    }
  }
}
