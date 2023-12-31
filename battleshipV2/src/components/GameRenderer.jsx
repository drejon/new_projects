import { useEffect, useState } from "react"
import { Tile } from "./Tile"
import { Game } from "../logic/Game"
import { Arbitrator } from "../logic/Arbitrator"

// const arbitrator = new Arbitrator()


export function GameRenderer( ) {
  const [game] = useState(new Game())
  const [board, setBoard] = useState(game.serialize().board)
  
  useEffect(() => {
    const subscriberCallback = (board) => {
      setBoard(board)
    }
    
    game.addSubscriber(subscriberCallback)
    
    return () => { game.removeSubscribers() }
  }, [])
  
  const resetGame = () => {
    game.reset()
  }

  return (
    <main>
      <h1>{game.winState}</h1>
      <section 
      className="board"
      style={{gridTemplateColumns: `repeat(${game.columns}, 1fr)`}}
      >
        { 
        board?.map( (tile) => (
            <Tile
            // fire={arbitrator.fireToPlayer}
            updatePosition={(position) => game.updatePosition(position)}
            key={tile.position.x.toString() + tile.position.y.toString()} 
            tile={tile} 
            />
          ))
        }
      </section>
    </main>
  )
}
