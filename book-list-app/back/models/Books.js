import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const BOOKS = require('../mock.json')

export class BooksModel {
  
  static getAll() {
    // const URL = 'http://www.localhost:4000/v1/books'
    const URL = BOOKS

    // const body = fetch('../mock.json')
    //   .then(res => res.json())
    //   .catch((error) => {
    //     console.log(error)
    //   })
    
    return BOOKS
  }

  static getBookById(id) {
    if(!id) {return null}
    const books = this.getAll()
    const desiredBook = books.find((book) => book.id === id)
    
    return desiredBook
  }

  static postBook(book) {
    const books = this.getAll()
    const lastId = books[books.length - 1].id

    const newBook = {
      id: lastId + 1,
      ...book
    }

    BOOKS.push(newBook)

    return newBook
    // console.log(books)
  }
}
