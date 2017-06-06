const assert = require('assert')
const request = require('supertest')
const Database = require('./database')
const server = require('./server')
const path = require('path')

TEST_DATA_PATH = path.resolve(__dirname, 'test-data.sql')

describe('server', () => {

  it('should return statistics about survey data', (done) => {
    expected = [
      {
        record_id_low: 1,
        record_id_high: 35501,
        record_count: 356
      }
    ]
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

  it('should return the first record when asked to slice', (done) => {
    expected = [
      {
        record_id: 1,
        year: 1977,
        month: 7,
        day: 16,
        sex: 'M',
        hindfoot_length: 32,
        weight: null,
        genus: 'Neotoma',
        species: 'albigula',
        taxa: 'Rodent',
        plot_type: 'Control'
      }
    ]
    const db = new Database('memory', TEST_DATA_PATH)
    request(server(db))
      .get('/survey/1/1')
      .expect(200)
      .expect('Content-Type', 'application/json')
      .end((err, res) => {
        assert.deepEqual(res.body, expected, '')
        done()
      })
  })
})
