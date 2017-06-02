const test = require('tape')
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

test('Can add a workshop', (t) => {
  const duration = 35, name = 'Creating Bugs'
  const db = new Database('direct', FIXTURE)
  db.addOne([name, duration], (results) => {
    t.equal(results, [], 'Got empty list as result when adding')
    db.getAll([], (results) => {
      expected = [
        { workshopDuration: 60, workshopId: 1, workshopName: 'Building Community' },
        { workshopDuration: 150, workshopId: 2, workshopName: 'ENIAC Programming' },
        { workshopDutation: duration, workshopId: 3, workshopName: name }
      ]
      t.deepEqual(results, expected, 'Got expected workshops after add')
      t.end()
    })
  })
})

test('Can delete a workshop', (t) => {
  const db = new Database('direct', FIXTURE)
  db.deleteOne([1], (results) => {
    t.equal(results, [], 'Got empty list as result when deleting')
    db.getAll([], (results) => {
      expected = [
        { workshopDuration: 150, workshopId: 2, workshopName: 'ENIAC Programming' }
      ]
      t.deepEqual(results, expected, 'Got expected workshops after delete')
      t.end()
    })
  })
})
