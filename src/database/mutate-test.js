const assert = require('assert')
const Database = require('./mutate-database')

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

describe('mutating database', () => {

  it('can add a workshop', (done) => {
    const duration = 35, name = 'Creating Bugs'
    const db = new Database('direct', FIXTURE)
    db.addOne([name, duration], function (results, lastId) {
      assert.deepEqual(results, [], 'Got empty list as result when adding')
      assert.equal(lastId, 3, 'Got the correct last ID after adding')
      db.getAll([], (results) => {
        expected = [
          { workshopName: 'Building Community', workshopDuration: 60, workshopId: 1 },
          { workshopName: 'ENIAC Programming', workshopDuration: 150, workshopId: 2 },
          { workshopName: name, workshopDuration: duration, workshopId: 3 }
        ]
        assert.deepEqual(results, expected, 'Got expected workshops after add')
        done()
      })
    })
  })

  it('can delete a workshop', (done) => {
    const db = new Database('direct', FIXTURE)
    db.deleteOne([1], (results, lastId) => {
      assert.equal(lastId, undefined, 'Expected last ID to be undefined')
      assert.deepEqual(results, [], 'Got empty list as result when deleting')
      db.getAll([], (results) => {
        expected = [
          { workshopName: 'ENIAC Programming', workshopDuration: 150, workshopId: 2 }
        ]
        assert.deepEqual(results, expected, 'Got expected workshops after delete')
        done()
      })
    })
  })
})
