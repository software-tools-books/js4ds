const Database = require('./database')
const server = require('./server-0')

const PORT = 3418

const db = new Database('file', 'test-data.db')
const app = server(db)
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}...`)
})
