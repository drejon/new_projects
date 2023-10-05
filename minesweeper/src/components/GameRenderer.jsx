import { useState } from "react"
import { Game } from "../logic/Game"

export function GameRenderer() {
  const COLUMNS = 7
  const ROWS = 7
  const NUMBER_OF_MINES = 7
  const game = new Game(COLUMNS, ROWS, NUMBER_OF_MINES)

  return (
    <section className="board">
      {
        game.board?.map((cell) => (
          <article
            className="tile"
            onClick={() => {
              // console.log(cell)
              console.log('juego',game.getNearCells(cell.position))
            }
              // console.log(game.getNearCells(cell.position))
            }
            key={cell.position.x.toString() + cell.position.y.toString()}
            style={{backgroundColor: cell.isMine && 'red'}}
            >
              {
              /* {[cell.position.x, cell.position.y]} */
              // cell.isMine.toString()
              cell.nearMines
              }
          </article>
        ))
      }
    </section>
  )
}
