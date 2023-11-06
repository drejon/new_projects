import { useEffect, useState } from "react"

export function Cell({ 
  cell,
  updatePlacement,
  placeShip,
  orientation,
  setOrientation,
  ship,
  currentShip,
  setCurrentShip
}) {
  const [color, setColor] = useState('')
  
  useEffect(() => {
    if(cell.isRevealed) {setColor('yellow')}
    if(!cell.isRevealed) {setColor('')}
    if(cell.isHit) {setColor('red')}
  }, [cell.isRevealed, cell.isHit])
  
  const handleOver = () => {
    if(ship === undefined) return
    updatePlacement(cell.position, true, orientation, ship)
  }

  const handleLeave = () => {
    if(ship === undefined) return
    updatePlacement(cell.position, false, orientation, ship)
  }

  const handleOrientation = () => {
    if(ship === undefined) return
    updatePlacement(cell.position, false, orientation, ship)
    let newOrientation = orientation + 1

    if(newOrientation > 3) {
      newOrientation = 0
      setOrientation(newOrientation)
    } else {
      setOrientation(newOrientation)
    }
    updatePlacement(cell.position, true, newOrientation, ship)
  }

  const handleClick = () => {
    const cells = updatePlacement(cell.position, true, orientation, ship)
    if(ship === undefined || cells === undefined) return
    
    cells.map(cell => cell.turnToModule(ship.name))
    ship.setModules(cells)
    ship.setOrientation(orientation)
    placeShip(cells)
    setCurrentShip(currentShip + 1)
  }

  return (
    <div
      onMouseOver={handleOver}
      onMouseOut={handleLeave}
      onWheel={handleOrientation}
      className={color}
    onClick={handleClick}
    >
      {cell.name !== 'W' && cell.name}
    </div>
  )
}
