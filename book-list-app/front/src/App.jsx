import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  
  const [body, setBody] = useState([])
  
  const getData = () => {
    const URL = 'http://www.localhost:4000/v1/books'

      fetch(URL)
      .then(res => res.json())
      .then(body => setBody(body))
      .catch((error) => {
        console.log(error)
      })
      return body
  }

  useEffect(() => {
    getData()
  }, [])
  
  return (
    <>
      <h1>Book List</h1>
      {
        body.books?.map(book => (
          <section>
            <header>
              <p>{book.title}</p>
              <p>{book.author}</p>
            </header>
            <footer>
              <p>{book.saga}</p>
              <p>{book.year}</p>
            </footer>
          </section>
        ))
      }
    </>
  )
}

export default App
