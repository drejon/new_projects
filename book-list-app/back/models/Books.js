export class BooksModel {
  
  getAll() {
    const URL = 'http://www.localhost:4000/v1/books'

    fetch(URL)
      .then(res => res.json())
      .then(body => setBody(body))
      .catch((error) => {
        console.log(error)
      })
      
    return body
  }
}
