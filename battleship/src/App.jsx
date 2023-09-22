import { Board } from './components/Board'

import './App.css'
import { ShotCounter } from './components/ShotCounter'
import { useState } from 'react'
import { generateBoard } from './logic/generateBoard'

function App() {

  return (
    <main>
        <Board></Board>
    </main>
  )
}

export default App
