const assert = require('assert')
const request = require('supertest')
const Database = require('./database')
const makeServer = require('./server')

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

describe('server', () => {

  it('should return all workshops', (done) => {
    db = new Database('direct', FIXTURE)
    const server = makeServer(db)
    request(makeServer(db))
      .get('/workshop')
      .expect(200)
      .end((err, res) => {
        done()
      })
  })
})
