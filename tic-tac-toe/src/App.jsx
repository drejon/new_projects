import { useState } from 'react'

import { Board } from './components/Board'
import { PlayerTurn } from './components/PlayerTurn'
import { ResetGame } from './components/ResetGame'
import { Title } from './components/Title'
import { WinnerModal } from './components/WinnerModal'

import { checkWinner, checkEndGame } from './logic/board.d.js'
import { TURNS } from './const.d.js'

import './App.css'

function App() {
  const EMPTY_BOARD = Array(9).fill(null)

  const [board, setBoard] = useState(EMPTY_BOARD)
  const [turn, setTurn] = useState(TURNS.X)
  const [winner, setWinner] = useState(null)
  
  const resetGame = () => {
    setBoard(EMPTY_BOARD)
    setTurn(TURNS.X)
    setWinner(null)
  }
  
  const updateBoard = (index) => {
    if (board[index] || winner) return
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
  
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
  
    const newWinner = checkWinner(newBoard)
    if (newWinner) {setTurn(TURNS.END), setWinner(newWinner)} 
    else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
  }

  return (
    <main>
      <Title></Title>
      <ResetGame resetGame={resetGame}></ResetGame>
      <Board board={board} updateBoard={updateBoard}></Board>
      <PlayerTurn turn={turn}></PlayerTurn>
      <WinnerModal resetGame={resetGame} winner={winner}></WinnerModal>
    </main>
  )
}

export default App
