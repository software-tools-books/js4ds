const assert = require('assert')
const request = require('supertest')
const Database = require('./database')
const server = require('./server-0')
const path = require('path')

TEST_DATA_PATH = path.resolve(__dirname, 'test-data.csv')

describe('server', () => {

  it('should return statistics about survey data', (done) => {
    expected = {
      minYear: 1979,
      maxYear: 2000,
      count: 10
    }
    const db = new Database(TEST_DATA_PATH)
    request(server(db))
      .get('/survey/stats')
      .expect(200)
      .expect('Content-Type', 'application/json')
      .end((err, res) => {
        assert.deepEqual(res.body, expected, '')
        done()
      })
  })
})
