const express = require('express')

const PORT = 3418

// Main server object.
const app = express()

// Root page.
app.get('/', (req, res, next) => {
  res.status(200).send('<html><body><h1>Home</h1></body></html>')
})

// Alternative page.
app.get('/asteroids', (req, res, next) => {
  res.status(200).send('<html><body><h1>Asteroids</h1></body></html>')
})

// Nothing else worked.
app.use((req, res, next) => {
  res
    .status(404)
    .send(`<html><body><p>ERROR: ${req.url} not found</p></body></html>`)
})

app.listen(PORT, () => { console.log('listening...') })
