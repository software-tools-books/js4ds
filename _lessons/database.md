---
layout: lesson
permalink: "/database/"
questions:
- FIXME
keypoints:
- FIXME
---

- Put a database under our web service
- Many options these days
  - FIXME: quick explanation of differences between SQL and NoSQL
  - FIXME: pointer to SQL tutorial

<!-- @src/database/fixture.sql -->
```sql
drop table if exists Workshop;

create table Workshop(
	ident		integer unique not null primary key,
	name		text unique not null,
	duration	integer not null -- duration in minutes
);

insert into Workshop values(1, "Building Community", 60);
insert into Workshop values(2, "ENIAC Programming", 150);
```

- Build a class to handle interactions with database
- Test it
- Then put a web service on top of it
- Making it a separate class makes it easier to test

## Starting Point

- Class takes path to `.db` file as constructor parameter
- Creates connection manager
- Runs queries
- Displays results
- Query methods all have the same signature so that can be handled interchangeably

<!-- @src/database/database-initial.js -->
```js
class Database {

  constructor (path) {
    this.db = new sqlite3.Database(path, sqlite3.OPEN_READWRITE, (err) => {
      if (err) this.fail(`Database open error ${err} for "${path}"`)
    })
  }

  getAll (args) {
    this.db.all(Q_WORKSHOP_GET_ALL, [], (err, rows) => {
      if (err) this.fail(err)
      this.display(rows)
    })
  }

  getOne (args) {
    this.db.all(Q_WORKSHOP_GET_ONE, args, (err, rows) => {
      if (err) this.fail(err)
      this.display(rows)
    })
  }

  display (rows) {
    for (let r of rows) {
      console.log(r)
    }
  }

  fail (msg) {
    console.log(msg)
    process.exit(1)
  }
}
```

- What do the queries look like?

<!-- @src/database/database-initial.js -->
```js
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
```

- What does the driver look like?

<!-- @src/database/database-initial.js -->
```js
function main () {
  const path = process.argv[2]
  const action = process.argv[3]
  const args = process.argv.splice(4)
  const database = new Database(path)
  database[action](args)
}

main()
```

- Try running it

```sh
sqlite3 fixture.db < fixture.sql
node database-initial.js fixture.db getAll
```
```output
{ workshopId: 1,
  workshopName: 'Building Community',
  workshopDuration: 60 }
{ workshopId: 2,
  workshopName: 'ENIAC Programming',
  workshopDuration: 150 }
```

## In-Memory Database

- Previous example always manipulates database on disk
- Have it use an [in-memory database]({{'/gloss/#in-memory-database'|absolute_url}}) for testing purposes

<!-- @src/database/database-mode.js -->
```js
  constructor (mode, path) {
    this.path = path
    switch (mode) {
    case 'memory' :
      const setup = fs.readFileSync(this.path, 'utf-8')
      this.db = new sqlite3.Database(':memory:', sqlite3.OPEN_READWRITE, (err) => {
        if (err) this.fail(`IN-MEMORY DATABASE OPEN ERROR "${err}"`)
      })
      this.db.exec(setup, (err) => {
        if (err) this.fail(`UNABLE TO INITIALIZE IN-MEMORY DATABASE FROM "${this.path}"`)
      })
      break

    case 'file' :
      this.db = new sqlite3.Database(this.path, sqlite3.OPEN_READWRITE, (err) => {
        if (err) this.fail(`DATABASE OPEN ERROR ${err} for "${path}"`)
      })
      break

    default :
      this.fail(`UNKNOWN MODE "${mode}"`)
      break
    }
  }
```

- And use destructuring to handle command-line arguments in driver

<!-- @src/database/database-mode.js -->
```js
function main () {
  const [mode, path, action, ...args] = process.argv.splice(2)
  const database = new Database(mode, path)
  database[action](args)
}
```

```sh
node database-mode.js memory fixture.sql getOne 2
```
```output
{ workshopId: 2,
  workshopName: 'ENIAC Programming',
  workshopDuration: 150 }
```

- Take this even further to make testing easier
- Allow driver to read SQL script and pass that in
  - So that we can do the file I/O once and then repeatedly build a database in memory and run tests on it
  - A test fixture

<!-- @src/database/database-mixed.js -->
```js
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
      this.fail(`Unknown mode "${mode}"`)
      break
    }
  }

  …

  _inMemory (script) {
    this.db = new sqlite3.Database(':memory:', sqlite3.OPEN_READWRITE, (err) => {
      if (err) this.fail(`In-memory database open error "${err}"`)
    })
    this.db.exec(script, (err) => {
      if (err) this.fail(`Unable to initialize in-memory database from "${script}"`)
    })
  }

  _inFile (path) {
    this.db = new sqlite3.Database(path, sqlite3.OPEN_READWRITE, (err) => {
      if (err) this.fail(`Database open error "${err}" for "${path}"`)
    })
  }
```

- And:

<!-- @src/database/database-mixed.js -->
```js
function main () {
  let [mode, setup, action, ...args] = process.argv.splice(2)
  if (mode === 'direct') {
    setup = fs.readFileSync(setup, 'utf-8')
  }
  const database = new Database(mode, setup)
  if (!(action in database)) {
    database.fail(`No such operation "${action}"`)
  }
  database[action](args)
}
```

- Some duplication of functionality (the `fs.readFileSync`)
- And the control flow is a bit awkward
- Look at how to refactor this in the exercises

## Making It Testable

- Put database class and its driver in separate files so that applications can load just the former
- Have database query methods return results for display
  - Since we will eventually want to compare them or return them to a server rather than printing them

<!-- @src/database/separate-database.js -->
```js
class Database {

  …

  getAll (args) {
    this.db.all(Q_WORKSHOP_GET_ALL, [], (err, rows) => {
      if (err) this.fail(err)
      return rows
    })
  }

  …
}

module.exports = Database
```

<!-- @src/database/separate-driver.js -->
```js
const Database = require('./separate-database')

const display = (rows) => {
  for (let r of rows) {
    console.log(r)
  }
}

const main = () => {
  let [mode, path, action, ...args] = process.argv.splice(2)
  const db = new Database(mode, path)
  if (!(action in db)) {
    db.fail(`No such operation "${action}"`)
  }
  const result = db[action](args)
  display(result)
}

main()
```

- Try running it

```sh
node separate-driver.js file fixture.db getAll
```
```output
  for (let r of rows) {
              ^

TypeError: Cannot read property 'Symbol(Symbol.iterator)' of undefined
    at display (/project/src/database/separate-driver.js:4:15)
    at main (/project/src/database/separate-driver.js:16:3)
```

- Because the database's `.run` method delivers results to a callback
- Its own result is therefore `undefined`
- So there's nothing in the caller to print

- Solution: give the `get` methods a callback

<!-- @src/database/callback-database.js -->
```js
class Database {

  …

  getAll (callback, args) {
    this.db.all(Q_WORKSHOP_GET_ALL, [], (err, rows) => {
      if (err) this.fail(err)
      callback(rows)
    })
  }

  …
}
```

- And then in the driver:

<!-- @src/database/callback-driver.js -->
```js
const Database = require('./callback-database')

const display = (rows) => {
  for (let r of rows) {
    console.log(r)
  }
}

const main = () => {
  let [mode, path, action, ...args] = process.argv.splice(2)
  const db = new Database(mode, path)
  if (!(action in db)) {
    db.fail(`No such operation "${action}"`)
  }
  db[action](display, args)
}

main()
```

## Testing

- And *now* we can write tests

<!-- @src/database/basic-tests.js -->
```js
const test = require('tape')
const Database = require('./callback-database')

const FIXTURE = `
drop table if exists Workshop;

create table Workshop(
        ident           integer unique not null primary key,
        name            text unique not null,
        duration        integer not null -- duration in minutes
);

insert into Workshop values(1, "Building Community", 60);
insert into Workshop values(2, "ENIAC Programming", 150);
`

test('Can get all workshops', (t) => {
  expected = [
    { workshopName: 'Building Community', workshopDuration: 60, workshopId: 1 },
    { workshopName: 'ENIAC Programming', workshopDuration: 150, workshopId: 2 }
  ]
  new Database('direct', FIXTURE).getAll([], (results) => {
    t.deepEqual(results, expected, 'Got expected workshops')
    t.end()
  })
})

test('Can get one workshop', (t) => {
  expected = [
    { workshopName: 'Building Community', workshopDuration: 60, workshopId: 1 }
  ]
  new Database('direct', FIXTURE).getOne(1, (results) => {
    t.deepEqual(results, expected, 'Got single expected workshop')
    t.end()
  })
})

test('Can only get workshops that exist', (t) => {
  new Database('direct', FIXTURE).getOne(99, (results) => {
    t.deepEqual(results, [], 'Got no workshops matching nonexistent key')
    t.end()
  })
})
```

- Walk through the structure of each test
- Define expected result
- Create an entirely new database
- Call the method being tested, passing it:
  - Parameter needed for operation
  - Callback that will receives results
- That callback uses the `t` object passed to the callback given to `test`
  - Yes, it's mind-bending
- Use `deepEqual` to check that the data structures are exact matches
- Call `t.end()` to signal the end of the test
  - Because otherwise how would `tape` know?

## Extending

- Now that we have something testable, we can develop in very short iterations
- Add a method, write some tests, make sure nothing broke
- Doesn't have to be test-first (although that often helps clarify design thinking)
