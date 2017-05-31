---
layout: page
permalink: "/testing/"
title: "Testing"
questions:
- FIXME
keypoints:
- FIXME
---

## Unit Testing

- Build some test infrastructure
- FIXME: summary of unit testing
- We will use a library called `tape`

<!-- @src/testing/does-it-run.js -->
```js
const test = require('tape')

test('first test', (t) => {
  t.end()
})
```

- `test` takes:
  - An explanatory string
  - A callback function whose single parameter is a test object
  - Must call `t.end()` to signal the end of the test,
    since some of the test code might involve callbacks
- Run with `node does-it-run.js`

```output
TAP version 13
# first test

1..0
# tests 0
# pass  0

# ok
```

## Refactoring

- Next step is to create testable software
- In this case means:
  - Move code that listens on a port into a separate file
  - Have it import everything else
  - So that we can run the server code in other contexts

<!-- @src/testing/standalone.js -->
```js
const server = require('./server')
const PORT = 3418
server.listen(PORT, () => { console.log(`listening on port ${PORT}...`) })
```

- and

<!-- @src/testing/server.js -->
```js
const express = require('express')

// Main server object.
let app = express()

// Root page.
app.get('/', (req, res, next) => {
  res.status(200).send('<html><body><h1>Home</h1></body></html>')
})

…

module.exports = app
```

## Testing the Server

- Now add a test for our server
- Use `supertest` to interact with the server

<!-- @src/testing/make-request.js -->
```js
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
```

- `server` is our server code
- `request(server)` starts building up a request to send
- `.get('/')` specifies the path
- `.expect('Content-Type', /html/)` checks the content type against a regular expression
- `.expect(200)` checks that the return code is 200 (OK)
- `.end` is called when the whole response has been received
  - We really should check `err`
- `res` is the result data
  - Make sure `res.text` includes the word "Home"
  - And just to prove that tests don't automatically pass,
    check for something it *shouldn't* contain
  - Always make sure the equipment is switched on…
- Then call `t.end()` to signal the end of the test
  - Because there's no telling when the outer `.end(…)` will be called
- Run it

```output
TAP version 13
# Home page is HTML with expected title
ok 1 Has expected title
not ok 2 Has unexpected text
  ---
    operator: ok
    expected: true
    actual:   false
    at: Test.request.get.expect.expect.end (/project/src/testing/make-request.js:12:9)
  ...

1..2
# tests 2
# pass  1
# fail  1
```

- Add more tests

<!-- @src/testing/make-request.js -->
```js
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
```
```output
TAP version 13
# Home page is HTML with expected title
ok 1 Has expected title
not ok 2 Has unexpected text
  ---
    operator: ok
    expected: true
    actual:   false
    at: Test.request.get.expect.expect.end (/project/src/testing/make-request.js:12:9)
  ...
# Asteroids page is HTML with expected title
ok 3 Has expected title
# Other page is missing
ok 4 Has expected error message

1..4
# tests 4
# pass  3
# fail  1
```

## Checking the HTML

- More and more common to serve data for rendering by the client
- But still sometimes have servers generate HTML
- Do *not* try to check this with substrings or regular expressions
  - The exceptions have exceptions
- Instead, parse it to create a structure in memory and check that
  - If parsing fails because the HTML is badly formatted, that's worth knowing too
- Structure is called _Document Object Model_ (DOM)
  - Good news: there are lots of libraries that will parse HTML and produce DOM
  - Bad news: there are *lots* of libraries that will do this
- We use `cheerio`
  - `cheerio.load` turns the text of HTML into DOM
  - Resulting object can be used like a function
  - Can use _selectors_ to find things in it

<!-- @src/testing/check-dom.js -->
```js
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
```
```output
TAP version 13
# Home page is HTML with expected title
ok 1 Correct number of headings
ok 2 Correct heading text

1..2
# tests 2
# pass  2

# ok
```

- Get the page as before
- Parse it
- Look for `h1` elements
- Get the text of the first one
  - This *doesn't* check if the title is `<em>H</em>ome`
