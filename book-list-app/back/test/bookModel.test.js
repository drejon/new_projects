import { expect } from 'chai'
import  { BooksModel }  from '../models/Books.js'

describe('Book Model', () => {
  it('Returns an array of books', () => {
    const books = BooksModel.getAll()
    const result = books.length

    expect(result).to.equal(5)
  });

  it('Returns a book by given Id', () => {
    const book = BooksModel.getBookById(1)
    const result = book.title

    expect(result).to.equal('The Way of the Kings')
  })

  it('Posts a Book', () => {
    const book = {
      title: 'The Three-body Problem',
      author: 'Liu Cixin',
      saga: `Remembrance of Earth's Past`,
      year: 2008,
      poster: '',
    } 

    const postedBook = BooksModel.postBook(book)
    const result = postedBook.id

    expect(result).to.equal(6)
  })
});

// const expect = require('chai').expect

// describe('Test Harness',  () => {
//     it('should return -1 when the value is not present',  () => {
//         expect(true).to.equal(true)
//     });
// });
