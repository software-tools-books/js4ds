---
layout: page
permalink: "/testing/"
---

## Unit Testing

- Build some test infrastructure
- FIXME-32: summary of unit testing
- We will use a library called Mocha
  - Don't need to import anything: it imports our code and calls our functions
- Use `describe` to create a group of tests and `it` for individual tests

```js
describe('first test', () => {
  it('should run without errors', (done) => {
    done()
  })
})
```
{: data-toggle="tooltip" title="src/testing/hello-test.js"}

- `describe` takes an explanatory string and a callback function
- Callback makes calls to `it`, which takes:
  - An explanatory string
  - A callback that receives a function (called `done` by convention)
  - Call `done` to signal the end of the test
- Run with `./node_modules/.bin/mocha path/to/test.js`

```text
  first test
    ✓ should run without errors


  1 passing (12ms)
```

- Normally put the command in `package.json`
  - Which automatically puts `./node_modules/.bin` in the path

```js
{
  …
  "scripts": {
    …
    "test": "mocha",
    …
  }
}
```
{: data-toggle="tooltip" title="package.json"}

- and then:

```sh
npm test -- path/to/test.js
```

## Refactoring

- Next step is to create testable software
- In this case means:
  - Move code that listens on a port into a separate file
  - Have it import everything else
  - So that we can run the server code in other contexts

```js
const server = require('./server')
const PORT = 3418
server.listen(PORT, () => { console.log(`listening on port ${PORT}...`) })
```
{: data-toggle="tooltip" title="src/testing/standalone.js"}

- and

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
{: data-toggle="tooltip" title="src/testing/server.js"}

## Testing the Server

- Now add a test for our server
- Use `supertest` to interact with the server

```js
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
})
```
{: data-toggle="tooltip" title="src/testing/request-test.js"}

- `server` is our server code
- `request(server)` starts building up a request to send
- `.get('/')` specifies the path
- `.expect('Content-Type', /html/)` checks the content type against a [regular expression](../gloss/#regular-expression)
- `.expect(200)` checks that the return code is 200 (OK)
- `.end` is called when the whole response has been received
  - We really should check `err`
- `res` is the result data
  - Make sure `res.text` includes the word "Home"
  - And just to prove that tests don't automatically pass,
    check for something it *shouldn't* contain
  - Always make sure the equipment is switched on…
- Then call `done()` to signal the end of the test
  - Because there's no telling when the outer `.end(…)` will be called
- Run it

```text
  server
    ✓ should return HTML with expected title (48ms)


  1 passing (58ms)
```

- Add more tests

```js
describe('server', () => {

  it('should return HTML with expected title', (done) => {
    …
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
```
{: data-toggle="tooltip" title="src/testing/request-test.js"}
```text
  server
    ✓ should return HTML with expected title (42ms)
    ✓ should return asteroids page as HTML with expected title
    ✓ should 404 for other pages


  3 passing (62ms)
```

> **Regular Expressions*
>
> A [regular expression](../gloss/#regular-expression) is
> a pattern for matching text which is itself written as text.
> Alphanumeric characters match themselves,
> so the regexp `/abc/` matches the strings `"abc"` and `"some abc here"`,
> but not the string `"no a-b-c here"`.
> Most punctuation characters have special meaning:
> the character `.`, for example, matches any single character,
> while `+` means "one or more",
> so `/a.+c/` matches an 'a' followed by one or more characters followed by a 'c'.
> Regular expressions are widely used in JavaScript,
> but are outside the scope of this tutorial.

## Checking the HTML

- Increasingly common to serve data for rendering by the client
- But some servers still generate HTML
- Do *not* try to check this with substrings or regular expressions
  - The exceptions have exceptions
- Instead, parse it to create a structure in memory and check that
  - If parsing fails because the HTML is badly formatted, that's worth knowing too
- Structure is called [Document Object Model](../gloss/#dom) (DOM)
  - Good news: there are lots of libraries that will parse HTML and produce DOM
  - Bad news: there are *lots* of libraries that will do this
  - FIXME-34: explain differences between JSX and DOM
- We use `cheerio`
  - `cheerio.load` turns the text of HTML into DOM
  - Resulting object can be used like a function
  - Can use [selectors](../gloss/#selector) to find things in it

```js
const assert = require('assert')
const request = require('supertest')
const cheerio = require('cheerio')
const server = require('./server')

describe('server', () => {
  it('should have the correct headings', (done) => {
    request(server)
      .get('/')
      .expect('Content-Type', /html/)
      .expect(200)
      .end((err, res) => {
        const tree = cheerio.load(res.text)
        assert.equal(tree('h1').length, 1, 'Correct number of headings')
        assert.equal(tree('h1').text(), 'Home', 'Correct heading text')
        done()
      })
  })
})
```
{: data-toggle="tooltip" title="src/testing/dom-test.js"}
```text
  server
    ✓ should have the correct headings (67ms)


  1 passing (77ms)
```

- Get the page as before
- Parse it
- Look for `h1` elements
- Get the text of the first one
  - This *doesn't* check if the title is `<em>H</em>ome`,
    because `.text()` concatenates all the text of the children
- Won't explore this approach further because we're going to serve data for rendering
  rather than generating HTML and sending that

## Challenges

FIXME-35: write challenges for testing

{% include links.md %}
