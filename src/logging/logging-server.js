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
  fs.stat(actual, (err, stats) => {
    if (err) {
      winston.error(`Unable to find "${actual}"`)
      res.status(404).send(
        `<html><body><p>cannot read ${actual}</p></body></html>`)
    } else if (!stats.isFile()) {
      winston.error(`"${actual}" is not a file`)
      res.status(404).send(
        `<html><body><p>cannot read ${actual}</p></body></html>`)
    } else {
      winston.debug(`Serving "${actual}"`)
      fs.readFile(actual, 'utf-8', (err, data) => {
	res.status(200).send(data)
      })
    }
  })
})

app.listen(PORT, () => {
  winston.info(`Running on port ${PORT} with root ${root}`)
})
