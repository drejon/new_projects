export function Tile ({ children }) {
  
  const handleClick = (event) => {
    event.preventDeafult
    const element = event.target
    console.log(element.textContent)
    if(children.symbol === ' ') {
      element.style = 'background-color: rgb(93, 166, 195)'
    } else {
      element.style = 'background-color: rgb(171, 89, 89)'
    }
  }

  return (
    <article className="tile" onClick={handleClick}>
      {/* {children.name} */}
    </article>
  )
}