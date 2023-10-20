import { useEffect, useState } from "react"

export function Tile({ cell, updatePosition }) {
  const [color, setColor] = useState('')

  useEffect(() => {
    
    if(cell.isMarked) {return setColor('rightClick')}

    if(!cell.isRevealed) {setColor('hidden')}
    
    if(cell.isRevealed && cell.isMine) {setColor('red')}

    if(cell.isRevealed && !cell.isMine) {setColor('')}

  
  }, [cell.isMarked, cell.isRevealed])

  return (
    <article
      onClick={(event) => {
        event.preventDefault()
        
        if(event.altKey === true) {
          updatePosition(cell.position, true)
        } else {
          updatePosition(cell.position)}
        }
      }
      className={`tile ${color}`}
    >
      {cell.isRevealed && !cell.isMine && (cell.nearMines !== 0 ? cell.nearMines : null)}
      {}
    </article>
  )
}
