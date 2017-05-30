const test = require('tape')
const request = require('supertest')
const server = require('./server')

test('Home page is HTML with expected title', (t) => {
  request(server)
    .get('/')
    .expect('Content-Type', /html/)
    .expect(200)
    .end((err, res) => {
      t.ok(res.text.includes('Home'), 'Has expected title')
      t.ok(res.text.includes('Should not contain this'), 'Has unexpected text')
      t.end()
    })
})

test('Asteroids page is HTML with expected title', (t) => {
  request(server)
    .get('/asteroids')
    .expect('Content-Type', /html/)
    .expect(200)
    .end((err, res) => {
      t.ok(res.text.includes('Asteroids'), 'Has expected title')
      t.end()
    })
})

test('Other page is missing', (t) => {
  request(server)
    .get('/other')
    .expect(404)
    .end((err, res) => {
      t.ok(res.text.includes('ERROR'), 'Has expected error message')
      t.end()
    })
})
