const express = require('express')
const cors = require('cors')

const app = express()

const PORT = process.env.PORT ?? 4000
const MOCK = {
  books:
  [
    {
      author: 'Brandon Sanderson',
      title: 'El camino de los Reyes',
      year: 2010,
      saga: 'El Archivo de las tormentas (1)',
    },
    {
      author: 'Brandon Sanderson',
      title: 'Palabras Radiantes',
      year: 2012,
      saga: 'El Archivo de las tormentas (2)',
    }
  ]
}

app.use(cors())
app.disable('x-powered-by')

app.get('/v1/books', (req, res) => {
  res.json(MOCK)
})

app.listen(PORT, () => {
  console.log(`Listening on port: http://www.localhost:${PORT}`)
})
