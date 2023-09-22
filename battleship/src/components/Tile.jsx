import { useState } from "react"

export function Tile ({ children, initialColor }) {
  const [color, setColor] = useState(initialColor)
  const BLUE = 'blue'
  const RED = 'red'

  
  const handleClick = () => {
    if(children.symbol === null) {
      setColor(BLUE)
    } else {
      setColor(RED)
    }
  }

  return (
    <article className={'tile ' + color} onClick={handleClick}>
      {/* {children.symbol} */}
    </article>
  )
}