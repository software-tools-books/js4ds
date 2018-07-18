---
layout: default
permalink: "/testing/"
title: "Testing"
questions:
- "How should software components be tested?"
- "What tools can I use to test JavaScript programs?"
- "How can I make software easier to test?"
- "How can testing code drive a web server?"
- "How can tests check the content of HTML pages?"
- "How is HTML represented in a JavaScript program?"
keypoints:
- "A unit test checks the behavior of one software component in isolation."
- "The result of a unit test can be pass, fail, or error."
- "Use Mocha to write and run unit tests in JavaScript."
- "Put assertions in unit tests to check results."
- "Combine tests in suites for easier management."
- "Divide modules into interactive and non-interactive parts for easier testing."
- "Use `supertest` to simulate interaction with a server for testing."
- "HTML is represented in memory using the Document Object Model (DOM)."
- "Check the structure of the DOM rather than the textual representation of the HTML when testing."
---

## Unit Testing

- Build some test infrastructure
- Each test is a function, and each function is one test
- Put repeated setup and teardown into functions that are automatically invoked before and after each test
- Each test can have one of three results:
  - Pass: everything worked
  - Fail: the system being tested didn't do what was expected
  - Error: something went wrong with the test itself
- Combine tests into test suites (and test suites into larger suites)
- Write the tests themselves using [assertions](../gloss/#assertion)
  - Node provides an `assert` library with some useful functions

## Introducing Mocha

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
{: title="src/testing/hello-test.js"}

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
{: title="package.json"}

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
{: title="src/testing/standalone.js"}

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
{: title="src/testing/server.js"}

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
{: title="src/testing/request-test.js"}

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
{: title="src/testing/request-test.js"}
```text
  server
    ✓ should return HTML with expected title (42ms)
    ✓ should return asteroids page as HTML with expected title
    ✓ should 404 for other pages


  3 passing (62ms)
```

> ### Regular Expressions
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
{: title="src/testing/dom-test.js"}
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

> ### JSX vs. DOM
>
> - JSX is an extension to JavaScript that allows us to embed HTML in programs
>   - That HTML is translated into function calls that create text
> - DOM is a data structure that a browser uses to store pages in memory
>   - Parses HTML to create a tree of nodes that are either elements with children and attributes or plain old text
>   - Or other things that we won't get into

## Challenges

### Not Done

What happens if we forget to call `done()` in a test?

### Adding Tests

1. What is the most useful test you could add for the asteroids application?
   Why?
2. Implement it.
3. Ask yourself why tutorials like this one don't say "*please* implement it".
   Reflect on the fact that this question didn't say "please" either.
   Are you comfortable with the paternalistic power relationship embodied in the absence of that one little word,
   and with the somewhat uncomfortable attempt at ironic humor embodied in this question?

### Lifecycle

Suppose a JavaScript program contains some JSX expressions
that produce HTML
which is then read and displayed by a browser.
Draw a diagram to show the form taken by an H1 heading containing the word "data"
from start to finish.
