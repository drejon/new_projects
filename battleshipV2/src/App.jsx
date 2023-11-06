import './App.css'
import { GameRenderer } from './components/GameRenderer.jsx'
import { User } from './components/User.jsx'
import { Arbitrator } from './logic/Arbitrator.js'


function App() {
  return (
    <main>
      {/* <h1>Battleship</h1> */}
      <GameRenderer></GameRenderer>
      <User></User>
    </main>
  )
}

export default App
