import { Square } from './Square.jsx'
import { ResetGame } from './ResetGame.jsx'

export const WinnerModal = ({winner, resetGame}) => {
  if (winner === null) return null

  const WinnerText = winner == false ? 'DRAW' : ' WIN'

  return (
    <section className='Winner'>
        <h2>{WinnerText}</h2>
        <header>
          {winner && <Square>{winner}</Square>}
        </header>
        <ResetGame resetGame={resetGame}></ResetGame>
    </section>
  )
} 