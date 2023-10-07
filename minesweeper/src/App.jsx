import { useState } from 'react'
import './App.css'
import { Game } from './logic/Game'
import { GameRenderer } from './components/GameRenderer'

function App() {

  return (
    <>
      <h1>Minesweeper</h1>
      
      <GameRenderer></GameRenderer>
    </>
  )
}

export default App
