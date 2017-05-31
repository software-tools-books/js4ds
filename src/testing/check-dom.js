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
      t.ok(tree('h1').length === 1, 'Correct number of headings')
      t.ok(tree('h1').text() === 'Home', 'Correct heading text')
      t.end()
    })
})
