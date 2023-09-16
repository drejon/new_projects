import { useEffect, useState } from 'react'

import { SHIPS } from './consts/ships'
import { generateRandomPosition } from './logic/generateRandomPosition'

import { Board } from './components/Board'
import { Tile } from './components/Tile'

import './App.css'

function App() {
  const [board, setBoard] = useState([])
  const SIZE = 7
  
  for (let column = 0; column < SIZE; column++) {
    board[column] = [];
    for (let row = 0; row < SIZE; row++) {
      board[column][row] = <Tile key={[column, row]}>{SHIPS[0]}</Tile>
    }
  }


  for (let ship = 1; ship < SHIPS.length; ship++) {
    const position = generateRandomPosition()
    
    const X = position[0]
    const Y = position[1]
    
    board[X][Y] = <Tile key={[X, Y]}>{SHIPS[ship]}</Tile>
  }
  
  return (
    <main>
      <h1>BattleShip</h1>
      <Board board={board}></Board>
    </main>
  )
}

export default App
