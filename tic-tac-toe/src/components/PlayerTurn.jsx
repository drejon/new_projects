import { Square } from './Square'
import { TURNS } from '../const.d.js'

export const PlayerTurn = ({turn}) => {
  
  const turnX = turn === TURNS.X ? true : false
  const turnO = turn === TURNS.O ? true : false

  return (
    <section className='player-turn'>
      <Square turn={turnX}>
        <strong>{TURNS.X}</strong>
      </Square>
      <Square turn={turnO}>
        <strong>{TURNS.O}</strong>
      </Square>
    </section>
  )
}