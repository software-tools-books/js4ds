const express = require('express')
const bodyParser = require('body-parser')
const winston = require('winston')
const expressWinston = require('express-winston')

// 'db' is a global variable that refers to our database.
// It must be set when the server is created.
let db = null

// Main server object and database object.
const app = express()
app.use(bodyParser.json())

// Set up logging.
app.use(expressWinston.logger({
  transports: [
    new winston.transports.Console({
      json: false,
      colorize: true
    })
  ],
  meta: false,
  msg: "HTTP {{res.statusCode}} {{req.method}} {{req.url}}"
}))

// Get survey statistics.
app.get('/survey/stats', (req, res, next) => {
  const data = db.getSurveyStats()
  res.status(200).json(data)
})

// Get a slice of the survey data.
app.get('/survey/:start/:end', (req, res, next) => {
  const start = parseInt(req.params.start)
  const end = parseInt(req.params.end)
  const data = db.getSurveyRange(start, end)
  res.status(200).json(data)
})

// Nothing else worked.
app.use((req, res, next) => {
  page = `<html><body><p>error: "${req.url}" not found</p></body></html>`
  res.status(404).send(page)
})

module.exports = (databaseHandler) => {
  db = databaseHandler
  return app
}
