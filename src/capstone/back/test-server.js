const assert = require('assert')
const request = require('supertest')
const Database = require('./database')
const server = require('./server')
const path = require('path')

TEST_DATA_PATH = path.resolve(__dirname, 'test-data.sql')

describe('server', () => {

  it('should return statistics about survey data', (done) => {
    expected = {
      year_low: 1977,
      year_high: 2002,
      record_count: 1000
    }
    const db = new Database('memory', TEST_DATA_PATH)
    request(server(db))
      .get('/survey/stats')
      .expect(200)
      .expect('Content-Type', 'application/json')
      .end((err, res) => {
        assert.deepEqual(res.body, expected, '')
        done()
      })
  })

  it('should return nothing when asked for records before 1977', (done) => {
    expected = []
    const db = new Database('memory', TEST_DATA_PATH)
    request(server(db))
      .get('/survey/0/0')
      .expect(200)
      .expect('Content-Type', 'application/json')
      .end((err, res) => {
        assert.deepEqual(res.body, expected, '')
        done()
      })
  })
  
  it('should return the records for 1977 when asked to slice', (done) => {
    expected = [{
      year: 1977,
      hindfoot_min: 21,
      hindfoot_avg: 30.25,
      hindfoot_max: 36,
      weight_min: 39,
      weight_avg: 41,
      weight_max: 43
    }]
    const db = new Database('memory', TEST_DATA_PATH)
    request(server(db))
      .get('/survey/1977/1977')
      .expect(200)
      .expect('Content-Type', 'application/json')
      .end((err, res) => {
        assert.deepEqual(res.body, expected, '')
        done()
      })
  })

  it('should return one record for each year when given the whole date range', (done) => {
    const db = new Database('memory', TEST_DATA_PATH)
    yearLow = 1977
    yearHigh = 2002
    request(server(db))
      .get(`/survey/${yearLow}/${yearHigh}`)
      .expect(200)
      .expect('Content-Type', 'application/json')
      .end((err, res) => {
        assert.equal(res.body.length, (yearHigh - yearLow) + 1, 'Got expected number of records')
        done()
      })
  })
})
