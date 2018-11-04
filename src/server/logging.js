const express = require('express')
const path = require('path')
const fs = require('fs')
const winston = require('winston')

const PORT = 3418
const root = process.argv[2]
const level = process.argv[3]

const transport = new winston.transports.Console()
winston.add(transport)
winston.level = level

// Main server object.
const app = express()

// Handle all requests.
app.use((req, res, next) => {
  const actual = path.join(root, req.url)

  if (actual.endsWith('.js')) {
    const libName = './'.concat(actual.slice(0, -3))
    winston.debug('Loading "${libName}"')
    const dynamic = require(libName)
    const data = dynamic.page()
    res.status(200).send(data)
  }

  else {
    winston.debug('Reading "${actual}"')
    const data = fs.readFileSync(actual, 'utf-8')
    res.status(200).send(data)
  }
})

app.listen(PORT, () => {
  winston.info('Running on port ${PORT} with root ${root}')
})
