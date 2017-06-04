const Database = require('./database')
const server = require('./server')

const PORT = 3418

const db = new Database('memory', 'fixture.sql')
const app = server(db)
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}...`)
})
