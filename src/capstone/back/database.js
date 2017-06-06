const sqlite3 = require('sqlite3')
const fs = require('fs')

const Q_WORKSHOP_GET_SURVEY_STATS = `
select
  min(record_id) as record_id_low,
  max(record_id) as record_id_high,
  count(*) as record_count
from
  surveys
`

const Q_WORKSHOP_GET_SURVEY_DATA = `
select
  surveys.record_id,
  surveys.year,
  surveys.month,
  surveys.day,
  surveys.sex,
  surveys.hindfoot_length,
  surveys.weight,
  species.genus,
  species.species,
  species.taxa,
  plots.plot_type
from
  surveys join species join plots
on
  surveys.species_id=species.species_id
and
  surveys.plot_id=plots.plot_id
where
  surveys.record_id >= ?
limit
  ?
`

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
