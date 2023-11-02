import { useEffect, useState } from "react"

export function Tile({ tile, updatePosition }) {
  const [color, setColor] = useState('')
  
  useEffect(() => {
    
    if(!tile.isRevealed) {setColor('')}
    if(tile.isRevealed && tile.isModule) {setColor('red')}
    if(tile.isRevealed && !tile.isModule) {setColor('blue')}

  }, [tile.isRevealed, tile.isDestroyed]) 

  return (
    <div
    className={color}
    onClick={() => {updatePosition(tile.position)}}
    >
      {tile.name !== 'W' && tile.name}
      {/* {tile.name} */}
    </div>
  )
}
