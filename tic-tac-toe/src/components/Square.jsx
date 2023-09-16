export const Square = ({children, turn, updateBoard, index}) => {

  const className = `Square ${turn ? 'Selected' : ''}`
  
  const handleClick = () => {updateBoard(index)}

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}