import { useEffect, useState } from "react"

export function Tile({ tile, updatePosition }) {
  const [color, setColor] = useState('')
  
  useEffect(() => {
    if(tile.isDestroyed && tile.isModule) {setColor('red')}
    if(tile.isDestroyed && !tile.isModule) {setColor('blue')}

  }, [tile.isModule, tile.isDestroyed]) 

  return (
    <div
    className={color}
    onClick={() => {updatePosition(tile.position)}}>
      {tile.name !== 'W' && tile.name}
    </div>
  )
}