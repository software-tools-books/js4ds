const test = require('tape')
const request = require('supertest')
const database = require('./database')

const FIXTURE = `
drop table if exists Workshop;

create table Workshop(
	ident		integer unique not null primary key,
	name		text unique not null,
	duration	integer not null -- duration in minutes
);

insert into Workshop values(1, "Building Community", 60);
insert into Workshop values(2, "ENIAC Programming", 150);
`

test('Can get all workshops', (t) => {
  db = new database('direct', FIXTURE)
  t.equal(db.getAll(), [], 'Got expected workshops')
  t.end()
})

test('Can get one workshop', (t) => {
  db = new database('direct', FIXTURE)
  t.equal(db.getOne(1), [], 'Got single expected workshop')
  t.end()
})

test('Can only get workshops that exist', (t) => {
  db = new database('direct', FIXTURE)
  t.equal(db.getOne(99), [], 'Got no workshops matching nonexistent key')
  t.end()
})
