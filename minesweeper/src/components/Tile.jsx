
export function Tile({ cell, updatePosition }) {
  const className = `tile ${cell.isRevealed && cell.isMine ? 'red' : ''}`

  return (
    <article
      onClick={() => {
        updatePosition(cell.position)
        }
      }
      className={className}
    >
      {cell.isRevealed && cell.nearMines}
    </article>
  )
}
