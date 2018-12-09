const express = require('express')

// 'dataManager' is a global variable that refers to our database.
// It must be set when the server is created.
let dataManager = null

// Main server object.
const app = express()

// Get survey statistics.
app.get('/survey/stats', (req, res, next) => {
  const data = dataManager.getSurveyStats()
  res.setHeader('Content-Type', 'application/json')
  res.status(200).send(data)
})

// Get a slice of the survey data.
app.get('/survey/:start/:end', (req, res, next) => {
  const start = parseInt(req.params.start)
  const end = parseInt(req.params.end)
  const data = dataManager.getSurveyRange(start, end)
  res.setHeader('Content-Type', 'application/json')
  res.status(200).send(data)
})

// Nothing else worked.
app.use((req, res, next) => {
  page = `<html><body><p>error: "${req.url}" not found</p></body></html>`
  res.status(404)
     .send(page)
})

module.exports = (dbm) => {
  dataManager = dbm
  return app
}
