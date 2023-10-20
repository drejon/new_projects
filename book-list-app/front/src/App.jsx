import { useEffect, useState } from 'react'
import './App.css'
import { Book } from './components/Book'
import { NewBook } from './components/NewBook'
import { CreateBook } from './components/CreateBook'

function App() {
  const [body, setBody] = useState([])
  const [modal, setModal] = useState(false)
  const URL = 'http://localhost:4000/v1/books'

  const getData = () => {
    fetch(URL)
    .then(res => res.json())
    .then(body => setBody(body))
    .catch((error) => {
      console.log(error)
    })
  }

  useEffect(() => {
   getData()
  }, [])

  const handleClick = () => {
    modal ? setModal(false) : setModal(true)
  }

  return (
    <>
      <h1>Book List</h1>
      <main className='library'>
        {
          body.map(book => (
            <Book book={book} />
          ))
        }
        <NewBook handleClick={handleClick}></NewBook>
      </main>
      <section>
        <CreateBook handleClick={handleClick} modal={modal}></CreateBook>
      </section>
    </>
  )
}

export default App
