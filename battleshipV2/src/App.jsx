import './App.css'
import { GameRenderer } from './components/GameRenderer'
import { Game } from './logic/Game'

const game = new Game()

function App() {

  return (
    <>
      <h1>Battleship</h1>
      <GameRenderer game={game}></GameRenderer>
    </>
  )
}

export default App
