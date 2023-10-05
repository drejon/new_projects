import { useState } from "react"
import { Game } from "../logic/Game"

export function GameRenderer() {
  const game = new Game(7, 7)
  const [count, setCount] = useState(0)


  return (
    <section className="board">
      {
        game.board?.map((cell) => (
          <article
            className="tile"
            key={cell.position.x.toString() + cell.position.y.toString()}>
              {[cell.position.x, cell.position.y]}
          </article>
        ))
      }
    </section>
  )
}
