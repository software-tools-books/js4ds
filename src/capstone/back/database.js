const sqlite3 = require('sqlite3')
const fs = require('fs')

class Database {

  constructor (mode, arg) {
    switch (mode) {

    case 'direct' :
      this._inMemory(arg)
      break

    case 'memory' :
      const setup = fs.readFileSync(arg, 'utf-8')
      this._inMemory(setup)
      break

    case 'file' :
      this._inFile(arg)
      break

    default :
      fail(`Unknown mode "${mode}"`)
      break
    }
  }

  getSurveyStats (args, callback) {
    this.db.all(Q_WORKSHOP_GET_SURVEY_STATS, [], (err, rows) => {
      if (err) fail(err)
      callback(rows, undefined)
    })
  }

  getSurveyData (args, callback) {
    this.db.all(Q_WORKSHOP_GET_SURVEY_DATA, args, (err, rows) => {
      if (err) fail(err)
      callback(rows, undefined)
    })
  }

  _inMemory (script) {
    this.db = new sqlite3.Database(':memory:', sqlite3.OPEN_READWRITE, (err) => {
      if (err) fail(`In-memory database open error "${err}"`)
    })
    this.db.exec(script, (err) => {
      if (err) fail(`Unable to initialize in-memory database from "${script}"`)
    })
  }

  _inFile (path) {
    this.db = new sqlite3.Database(path, sqlite3.OPEN_READWRITE, (err) => {
      if (err) fail(`Database open error "${err}" for "${path}"`)
    })
  }
}

const fail = (msg) => {
  console.log(msg)
  process.exit(1)
}

module.exports = Database
