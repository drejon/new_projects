import { useEffect, useState } from "react"
import { UserGame } from "../logic/userGame"
import { Cell } from "./Cell"


export function User( ) {
  const [game] = useState(new UserGame())
  const [board, setBoard] = useState(game.serialize().board)
  const [orientation, setOrientation] = useState(1)
  const [currentShip, setCurrentShip] = useState(0)

  const ships = game.ships
  const ship = ships[currentShip]
  useEffect(() => {
    const subscriberCallback = (board) => {
      setBoard(board)
    }
    
    game.addSubscriber(subscriberCallback)
    
    return () => { game.removeSubscribers() }
  }, [])

  return (
    <main>
      <section 
        className="board"
        style={{gridTemplateColumns: `repeat(${game.columns}, 1fr)`}}
        >
        { 
        board?.map( (cell) => (
            <Cell
            orientation={orientation}
            setOrientation = {setOrientation}
            ship={ship}
            currentShip={currentShip}
            setCurrentShip={setCurrentShip}
            updatePlacement={
              (position, visible, orientation) => 
              game.updatePlacement(position, visible, orientation, ship)
            }
            placeShip={(modules) => {game.placeShip(modules)}}
            key={cell.position.x.toString() + cell.position.y.toString()} 
            cell={cell} 
            />
          ))
        }
      </section>
    </main>
  )
}
