const path = require('path')
const assert = require('assert')
const request = require('supertest')
const Database = require('./data-manager')
const make_server = require('./server-0')

TEST_DATA_PATH = path.resolve(__dirname, 'test-data.csv')

describe('server', () => {

  it('should return statistics about survey data', (done) => {
    expected = {
      minYear: 1979,
      maxYear: 2000,
      count: 10
    }
    const db = new Database(TEST_DATA_PATH)
    const server = make_server(db)
    request(server)
      .get('/survey/stats')
      .expect(200)
      .expect('Content-Type', 'application/json')
      .end((err, res) => {
        assert.deepEqual(res.body, expected, '')
        done()
      })
  })
})
