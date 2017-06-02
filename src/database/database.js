const sqlite3 = require('sqlite3')
const fs = require('fs')

const Q_WORKSHOP_GET_ALL = `
select
  Workshop.ident        as workshopId,
  Workshop.name         as workshopName,
  Workshop.duration     as workshopDuration
from
  Workshop
`

const Q_WORKSHOP_GET_ONE = `
select
  Workshop.ident        as workshopId,
  Workshop.name         as workshopName,
  Workshop.duration     as workshopDuration
from
  Workshop
where
  Workshop.ident = ?
`

const Q_WORKSHOP_ADD = `
insert into Workshop(name, duration) values(?, ?);
`

const Q_WORKSHOP_DELETE = `
delete from Workshop where ident = ?;
`

class Handler {

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
      this.db = new sqlite3.Database(arg, sqlite3.OPEN_READWRITE, (err) => {
        if (err) this.fail(`Database open error "${err}" for "${arg}"`)
      })
      break

    default :
      this.fail(`Unknown mode "${mode}"`)
      break
    }
  }

  getAll (args) {
    this.db.all(Q_WORKSHOP_GET_ALL, [], (err, rows) => {
      if (err) this.fail(err)
      return rows
    })
  }

  getOne (args) {
    this.db.all(Q_WORKSHOP_GET_ONE, args, (err, rows) => {
      if (err) this.fail(err)
      return rows
    })
  }

  addOne (args) {
    this.db.run(Q_WORKSHOP_ADD, args, (err, rows) => {
      if (err) this.fail(err)
      return []
    })
  }

  deleteOne (args) {
    this.db.run(Q_WORKSHOP_DELETE, args, (err, rows) => {
      if (err) this.fail(err)
      return []
    })
  }

  fail (msg) {
    console.log(msg)
    process.exit(1)
  }

  _inMemory (script) {
    this.db = new sqlite3.Database(':memory:', sqlite3.OPEN_READWRITE, (err) => {
      if (err) this.fail(`In-memory database open error "${err}"`)
    })
    this.db.exec(script, (err) => {
      if (err) this.fail(`Unable to initialize in-memory database from "${script}"`)
    })
  }
}

module.exports = Handler
