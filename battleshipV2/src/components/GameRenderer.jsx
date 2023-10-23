import { Tile } from "./Tile"

export function GameRenderer({ game }) {
  
  const handleClick = (tile) => {
    console.log(tile)
  }
  return (
    <section className="board">
      { 
      game.board.map( (tile) => (
        <Tile key={JSON.stringify(tile.position)} tile={tile} onClick={() => handleClick(tile)}/>
      )) 
      }
    </section>
  )
}
