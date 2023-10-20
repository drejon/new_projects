export function GameRenderer({ game }) {
  
  const handleClick = (cell) => {
    console.log(cell)
  }
  return (
    <section className="board">
      { game.board.map( (cell) => (
        <div onClick={() => handleClick(cell)}>
          {cell.name}
          {/* {cell.position.y} */}
        </div>
      )) 
      }
    </section>
  )
}
