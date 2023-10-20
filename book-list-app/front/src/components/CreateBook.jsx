export function CreateBook({ handleClick, modal }) {
  let style = modal ? { display: 'block' } : { display: 'none' }
  
  return (
    <div 
      style={style}
    >
      <form onSubmit={() => {}} method="POST">
        <input name="title" type="text" placeholder="A title" />
        <input name="author" type="text" placeholder="An author" />
        <input name="saga" type="text" placeholder="A saga" />
        <input name="year" type="text" placeholder="A year" />
        <input name="poster" type="text" placeholder="A poster link" />
        <button>Add Book</button>
        <button onClick={handleClick}>X</button>
      </form>

    </div>
  )
}
