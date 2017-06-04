const assert = require('assert')
const request = require('supertest')
const Database = require('./database')
const server = require('./server')

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
    expected = [
      { workshopName: 'Building Community', workshopDuration: 60, workshopId: 1 },
      { workshopName: 'ENIAC Programming', workshopDuration: 150, workshopId: 2 }
    ]
    const db = new Database('direct', FIXTURE)
    request(server(db))
      .get('/workshop')
      .expect(200)
      .expect('Content-Type', 'application/json')
      .end((err, res) => {
        assert.deepEqual(res.body, expected, '')
        done()
      })
  })

  it('should create one workshop', (done) => {
    const name = 'Creating Bugs'
    const duration = 35
    const db = new Database('direct', FIXTURE)
    request(server(db))
      .post('/workshop')
      .send({
        workshopName: name,
        workshopDuration: duration
      })
      .expect(201)
      .expect('Content-Type', 'application/json')
      .end((err, res) => {
        console.log(`test received body ${res.body}`)
        assert.deepEqual(res.body, {
          workshopId: 3,
          workshopName: name,
          workshopDuration: duration
        })
        done()
      })
  })
})
