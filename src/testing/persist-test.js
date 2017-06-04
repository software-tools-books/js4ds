const assert = require('assert')
const request = require('supertest')
const server = require('./persist')

describe('server', () => {
  it('should report creation of an asteroid', (done) => {
    const name = 'Ceres'
    request(server)
      .post('/asteroids')
      .send({name: name})
      .expect('Content-Type', /html/)
      .expect(200)
      .end((err, res) => {
        assert(res.text.includes(`created ${name}`))
        done()
      })
  })
})
