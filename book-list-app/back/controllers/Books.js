import { BooksModel } from "../models/Books.js";

export class BooksController {
  
  static getAll() {
    return BooksModel.getAll()
  }

  static getById(id) {
    return BooksModel.getBookById(id)
  }
}
