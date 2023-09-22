import { useState } from "react";
import { generateBoard } from "../logic/generateBoard";
import { ShotCounter } from "./ShotCounter";
import { ResetGame } from "./ResetGame";

export function Board () {
  const [board, setBoard] = useState(generateBoard)
  const [counter, setCounter] = useState(0)
  const [color, setColor] = useState()

  const handleCounter = () => {
    const newCounter = counter + 1
    setCounter(newCounter)
  }

  const resetGame = () => {
    setBoard(generateBoard)
    setCounter(0)
    setColor(null)
  }

  return (
    <main className="userInterface" >
      <section>
        <h1>Battleship</h1>
        <article onClick={handleCounter} className="board">
          {board}
        </article>
      </section>

      <section>
        <ShotCounter counter={counter}></ShotCounter>
        <ResetGame resetGame={resetGame}></ResetGame>
      </section>
    </main>

  )
}