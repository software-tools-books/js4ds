const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors'); // https://github.com/rangle/hub/wiki/CORS
const winston = require('winston');
const expressWinston = require('express-winston');

// Main server object and database object.
// db is provided during load.
let db = null
const app = express()
app.use(bodyParser.json())
app.use(cors())

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
}));

// Get survey statistics.
app.get('/survey/stats', (req, res, next) => {
  db.getSurveyStats([], (rows, lastId) => {
    res.status(200).json(rows[0])
  })
})

// Get a slice of the survey data.
app.get('/survey/:start/:end', (req, res, next) => {
  const start = req.params.start
  const end = req.params.end
  db.getSurveyData([start, end], (rows, lastId) => {
    res.status(200).json(rows)
  })
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
