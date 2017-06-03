const express = require('express')

// Main server object.
const app = express()

// Get all workshops.
app.get('/workshop', (req, res, next) => {
  this.db.getAll([], (rows, lastId) => {
    res.status(200).json(rows)
  })
})

// Get a single workshop.
app.get('/workshop/:workshopId', (req, res, next) => {
  const workshopId = req.params.workshopId
  this.db.getOne([workshopId], (rows, lastId) => {
    res.status(200).json(rows)
  })
})

// Add a workshop.
app.post('/workshop', (req, res, next) => {
  const workshopName = req.body.workshopName
  const workshopDuration = req.body.workshopDuration
  this.db.addOne([workshopName, workshopDuration], (rows, lastId) => {
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
  this.db.deleteOne([workshopId], (rows, lastId) => {
    res.status(200).json(rows)
  })
})

// Nothing else worked.
app.use((req, res, next) => {
  page = `<html><body><p>error: "${req.url}" not found</p></body></html>`
  res.status(404).send(page)
})

module.exports = (db) => {
  app.db = db
  return app
}
