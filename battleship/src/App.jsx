import { Board } from './components/Board'

import './App.css'
import { ShotCounter } from './components/ShotCounter'
import { useState } from 'react'
import { generateBoard } from './logic/generateBoard'

function App() {

  return (
    <main>
        <h1>Battleship</h1>
        <main className='wrapper'>
            <Board player={false}></Board>
            <Board player={true}></Board>
        </main>
        {/* ------------------ */}
        {/* <Board player={true}></Board> */}
    </main>
  )
}

export default App
