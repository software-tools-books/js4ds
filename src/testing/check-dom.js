const test = require('tape')
const request = require('supertest')
const cheerio = require('cheerio')
const server = require('./server')

test('Home page is HTML with expected title', (t) => {
  request(server)
    .get('/')
    .expect('Content-Type', /html/)
    .expect(200)
    .end((err, res) => {
      const tree = cheerio.load(res.text)
      const h1 = tree('h1')
      t.ok(h1.length === 1, 'Exactly one h1 heading')
      t.ok(h1[0].text === 'Home', 'Correct heading text')
      t.end()
    })
})
