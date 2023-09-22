import { useState } from "react"

export function Tile ({ children }) {
  const [color, setColor] = useState()
  const BLUE = 'blue'
  const RED = 'red'

  
  const handleClick = (event) => {
    if(children.symbol === 'w') {
      // const element = event.target
      // element.style = `background-color: ${BLUE}`
      setColor(BLUE)
    } else {
      // const element = event.target
      setColor(RED)
      // element.style = `background-color: ${RED}`
    }
  }

  return (
    <article className={'tile ' + color} onClick={handleClick}>
      {children.symbol}
    </article>
  )
}