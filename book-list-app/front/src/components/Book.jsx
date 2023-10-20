export function Book({ book }) {
  
  return (
    <section className="book">
      <header>
        <p>{book.title}</p>
        <p>{book.author}</p>
      </header>
      <footer>
        <p>{book.saga}</p>
        <p>{book.year}</p>
      </footer>
    </section>
  )
}
