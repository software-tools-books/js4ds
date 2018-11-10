const Database = require('./database')
const server = require('./server-0')

const PORT = 3418

const db = new Database('test-data.csv')
const app = server(db)
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}...`)
})
