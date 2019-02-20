const assert = require('assert')
const request = require('supertest')
const server = require('./server')

describe('server', () => {

  it('should return HTML with expected title', (done) => {
    request(server)
      .get('/')
      .expect(200)
      .expect('Content-Type', /html/)
      .end((err, res) => {
        assert(res.text.includes('Home'), 'Has expected title')
        done()
      })
  })

  it('should return page as HTML with expected title', (done) => {
    request(server)
      .get('/asteroids')
      .expect(200)
      .expect('Content-Type', /html/)
      .end((err, res) => {
        assert(res.text.includes('Asteroids'), 'Has expected title')
        done()
      })
  })

  it('should 404 for other pages', (done) => {
    request(server)
      .expect(404)
      .get('/other')
      .end((err, res) => {
        assert(res.text.includes('ERROR'), 'Has expected error message')
        done()
      })
  })
})
