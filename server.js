const express = require('express')
const convert = require('./convert')
const getZipcode = () => {
  const {readFileSync} = require('fs')
  return Promise.resolve(readFileSync('./zip-code.csv').toString())
}

const todo = () => getZipcode().then(convert)

const start = () => {
  const app = express()
  const port = process.env.PORT || 3000

  app.get('/', (req, res) => res.end('Hello World!'))
  app.get('/land-code', (req, res) =>
    getZipcode().then(convert).then(it => res.json(it))
  )
  app.listen(port, () => console.log('Example app listening on port 3000!'))
}

start()
