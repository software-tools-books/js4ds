const express = require('express')
const bodyParser = require('body-parser')

const PORT = 3418

// Main server object.
const app = express()
app.use(bodyParser.json())

// Root page.
app.get('/', (req, res, next) => {
  res.status(200).send('<html><body><h1>Home</h1></body></html>')
})

// Alternative page.
app.post('/asteroids', (req, res, next) => {
  const name = req.body.name
  res.status(200).send(`<html><body><p>created ${name}</p></body></html>`)
})

// Nothing else worked.
app.use((req, res, next) => {
  res.status(404).send(`<html><body><p>error: "${req.url}" not found</p></body></html>`)
})

module.exports = app
