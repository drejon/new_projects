export function GameRenderer({ game }) {
  
  const handleClick = (cell) => {
    console.log(cell)
  }
  return (
    <section className="board">
      { game.board.map( (cell) => (
        <div onClick={() => handleClick(cell)}>
          {/* <h2>{cell.name}</h2> */}
          {cell.name !== 'W' && cell.name}
          {/* {cell.position.x} */}
          {/* {cell.position.y} */}
        </div>
      )) 
      }
    </section>
  )
}
