import express from 'express'
import { BooksController } from './controllers/Books.js'

const app = express()

const PORT = process.env.PORT ?? 4000
const ACCEPTED_ORIGINS = [
  'http://localhost:5173'
]

app.disable('x-powered-by')

app.get('/v1/books', (req, res) => {
  const origin = req.header('origin')

  if(ACCEPTED_ORIGINS.includes(origin) || !origin){
    res.header('Access-Control-Allow-Origin', origin)
  }
  res.json(BooksController.getAll())
})

app.listen(PORT, () => {
  console.log(`Listening on port: http://www.localhost:${PORT}`)
})
