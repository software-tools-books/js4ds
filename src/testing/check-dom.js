const test = require('tape')
const request = require('supertest')
const server = require('./server')

test('Home page is HTML with expected title', (t) => {
  request(server)
    .get('/')
    .expect('Content-Type', /html/)
    .expect(200)
    .end((err, res) => {
      const dom = htmlparser.parseDOM(res.text)
      console.log('dom is', dom)
      t.end()
    })
})
