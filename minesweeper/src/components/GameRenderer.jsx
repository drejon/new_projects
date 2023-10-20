import { useEffect, useState } from "react"
import { Game } from "../logic/Game"
import { Tile } from "./Tile"

export function GameRenderer() {
  const COLUMNS = 7
  const ROWS = 7
  const NUMBER_OF_MINES = 7

  const [game] = useState(new Game(COLUMNS, ROWS, NUMBER_OF_MINES))
  const [board, setBoard] = useState(game.serialize().board)

  const resetGame = () => {
    game.reset()
  }

  useEffect(() => {
    const subscriberCallback = (board) => {
      setBoard(board)
    }
    
    game.addSubscriber(subscriberCallback)
    
    return () => { game.removeSubscribers() }
  }, [])

  return (
    <main>
      <header><h1>{game.winState}</h1></header>
      <button onClick={resetGame}>
        Reset
      </button>
    <section className="board">
      {
        board?.map((cell) => (
          
          <Tile
            updatePosition={game.updatePosition.bind(game)}
            key={cell.position.x.toString() + cell.position.y.toString()}
            cell={cell}
          />
        )) 
      }
    </section>
    </main>
  )
}
