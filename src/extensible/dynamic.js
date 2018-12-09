const express = require('express')

const PORT = 3418

// Main server object.
const app = express()

// Handle all requests.
app.use((req, res, next) => {
  if (req.url.endsWith('.js')) {
    const libName = './'.concat(req.url.slice(0, -3))
    const dynamic = require(libName)
    const data = dynamic.page()
    res.status(200).send(data)
  }

  else {
    res.status(404).send(`<html><body><p>"${req.url}" not found</p></body></html>`)
  }
})

app.listen(PORT, () => { console.log(`listening on port ${PORT}...`) })
