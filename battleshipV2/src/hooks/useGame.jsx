import { useEffect, useState } from "react"

export function useGame( game ) {
  console.log('hey', game)
  const [board, setBoard] = useState(game.serialize().board)

  useEffect(() => {
    const subscriberCallback = (board) => {
      setBoard(board)
    }
    
    game.addSubscriber(subscriberCallback)
    
    return () => { game.removeSubscribers() }
  }, [])

  return { board }
}
