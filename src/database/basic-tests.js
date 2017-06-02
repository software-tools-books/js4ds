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
