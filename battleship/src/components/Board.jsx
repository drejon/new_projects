import { useState } from "react";
import { generateBoard } from "../logic/generateBoard";

export function Board () {
  const [board, setBoard] = useState(generateBoard)

  return (
    <section className="board">
      {board}
    </section>
  )
}