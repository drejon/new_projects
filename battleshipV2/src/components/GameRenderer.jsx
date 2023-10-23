import { useEffect, useState } from "react"
import { Tile } from "./Tile"

export function GameRenderer({ game }) {
  const [board, setBoard] = useState(game.serialize().board)
  
  useEffect(() => {
    const subscriberCallback = (board) => {
      setBoard(board)
    }
    
    game.addSubscriber(subscriberCallback)
    
    return () => { game.removeSubscribers() }
  }, [])
  
  return (
    <section className="board">
      { 
      game.board.map( (tile) => (
        <Tile 
        key={JSON.stringify(tile.position)} 
        tile={tile} 
        updatePosition={game.updatePosition.bind(game)}
        />
      )) 
      }
    </section>
  )
}
