const express = require('express')

// Main server object and database object.
// db is provided during load.
let db = null
const app = express()

// Get all workshops.
app.get('/workshop', (req, res, next) => {
  db.getAll([], (rows, lastId) => {
    res.status(200).json(rows)
  })
})

// Get a single workshop.
app.get('/workshop/:workshopId', (req, res, next) => {
  const workshopId = req.params.workshopId
  db.getOne([workshopId], (rows, lastId) => {
    res.status(200).json(rows)
  })
})

// Add a workshop.
app.post('/workshop', (req, res, next) => {
  const workshopName = req.body.workshopName
  const workshopDuration = req.body.workshopDuration
  db.addOne([workshopName, workshopDuration], (rows, lastId) => {
    const result = {
      lastId,
      workshopName,
      workshopDuration
    }
    res.status(201).json(result)
  })
})

// Delete a workshop.
app.delete('/workshop/:workshopId', (req, res, next) => {
  const workshopId = req.params.workshopId
  db.deleteOne([workshopId], (rows, lastId) => {
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
