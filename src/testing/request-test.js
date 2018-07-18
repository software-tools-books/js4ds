const assert = require('assert')
const request = require('supertest')
const server = require('./server')

describe('server', () => {

  it('should return HTML with expected title', (done) => {
    request(server)
      .get('/')
      .expect('Content-Type', /html/)
      .expect(200)
      .end((err, res) => {
        assert(res.text.includes('Home'), 'Has expected title')
        assert(!res.text.includes('Should not contain this'), 'Has unexpected text')
        done()
      })
  })

  it('should return asteroids page as HTML with expected title', (done) => {
    request(server)
      .get('/asteroids')
      .expect('Content-Type', /html/)
      .expect(200)
      .end((err, res) => {
        assert(res.text.includes('Asteroids'), 'Has expected title')
        done()
      })
  })

  it('should 404 for other pages', (done) => {
    request(server)
      .get('/other')
      .expect(404)
      .end((err, res) => {
        assert(res.text.includes('ERROR'), 'Has expected error message')
        done()
      })
  })
})
