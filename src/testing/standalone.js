// Server wrapper.

const server = require('./server')
const PORT = 3418
server.listen(PORT,
              () => { console.log(`listening on port ${PORT}...`) })
