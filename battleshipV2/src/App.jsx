import { useEffect } from 'react'
import './App.css'
import { GameRenderer } from './components/GameRenderer.jsx'
import { User } from './components/User.jsx'
import { Game } from './logic/Game'
import { UserGame } from './logic/userGame'

// const game = new Game()
const user = new UserGame()
function App() {

  return (
    <main>
      {/* <h1>Battleship</h1> */}
      {/* <GameRenderer></GameRenderer> */}
      <User></User>
    </main>
  )
}

export default App
