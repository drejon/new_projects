import { expect } from 'chai'
import  { BooksModel }  from '../models/Books.js'

describe('Battleship', () => {
  it('works', () => {
    const books = BooksModel.getAll()
    const result = 1

    expect(result).to.equal(1)
  });
})
