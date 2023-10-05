import { useState } from "react";
import { generateBoard } from "../logic/generateBoard";
import { ShotCounter } from "./ShotCounter";
import { ResetGame } from "./ResetGame";

export function Board ({ player }) {
  const [board, setBoard] = useState(generateBoard)
  const [counter, setCounter] = useState(0)

  const handleCounter = () => {
    const newCounter = counter + 1
    setCounter(newCounter)
  }

  const resetGame = () => {
    setBoard([])
    setBoard(generateBoard())
    setCounter(0)
    // setColor(null)
  }

  return (
    <main className="userInterface" >
      <article onClick={handleCounter} className="board">
        {board}
      </article>
      <section className="counter">
        <ShotCounter counter={counter}></ShotCounter>
        <ResetGame resetGame={resetGame}></ResetGame>
      </section>
    </main>

  )
}
