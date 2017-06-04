const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors'); // https://github.com/rangle/hub/wiki/CORS

// Main server object and database object.
// db is provided during load.
let db = null
const app = express()
app.use(bodyParser.json())
app.use(cors())

// Get all workshops.
app.get('/workshop', (req, res, next) => {
  db.getAll([], (rows, lastId) => {
    console.log(`/workshop GET => ${rows}`)
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
  console.log('server post req.body is', req.body)
  const workshopName = req.body.workshopName
  const workshopDuration = req.body.workshopDuration
  console.log(`server name ${workshopName} duration ${workshopDuration}`)
  db.addOne([workshopName, workshopDuration], (rows, lastId) => {
    const result = {
      workshopId: lastId,
      workshopName: workshopName,
      workshopDuration: workshopDuration
    }
    console.log(`/workshop POST => ${result}`)
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
