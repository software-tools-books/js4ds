---
permalink: "/en/testing/"
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

We are bad people,
because we have been writing code without testing it.
In this lesson we will redeem ourselves (partially)
by correcting that (also partially).

JavaScript uses the same pattern for [unit testing](../gloss/#g:unit-test) as most other modern languages.
Each test is written as a function,
and each of those functions tests one particular aspect of the code.
A standalone program called a [test runner](../gloss/#g:test-runner)
finds test functions,
runs them,
and reports the results.
Any setup code that needs to be run before each test to create a [fixture](../gloss/#g:fixture)
is put in a function of its own.
Similarly (but less frequently),
if some teardown needs to be done *after* each test,
we put those operations in a function as well.

Each unit test can have one of three results:

- pass: everything worked
- fail: the system being tested didn't do what was expected
- error: something went wrong with the test itself

We can combine tests into [test suites](../gloss/#g:test-suite)
(and test suites into larger suites, and so on)
so that we can more easily run related sets of tests.
This makes testing during development faster,
which in turn makes it more likely that we'll actually do it.

Finally,
we write the tests themselves using [assertions](../gloss/#g:assertion):
statements that check whether or not some condition holds
and generate an error if it doesn't.
Node provides an `assert` library with some useful functions for asserting various things;
we'll explore this as we go along.

## Introducing Mocha {#s:testing-mocha}

JavaScript has almost as many testing libraries as it has front-end frameworks.
We will use one called [Mocha][mocha] that is popular and well documented.
Unlike the libraries we have seen before,
we don't import anything to use it;
instead,
*it* imports *our* code and calls our functions.

When we're writing tests for Mocha to run,
we use a function called `describe` to create a group of tests
and another function called `it` for each test in that group:

```js
describe('first test', () => {
  it('should run without errors', (done) => {
    done()
  })
})
```
{: title="src/testing/hello-test.js"}

As this example shows,
`describe`'s arguments are an explanatory string and a callback function.
That callback makes calls to `it`, which takes:

- another explanatory string describing how the system should behave, and
- a callback that receives a function (called `done` by convention).

(The name `it` was chosen so that when we read tests aloud,
it sounds like we're saying, "It should do this or that.")
At the end of each test we call `done` to signal that it has finished.
We have to do this because callbacks run out of order,
so Mocha needs to know when each one completes.

We can run our tests from the shell by invoking `mocha`
and giving it the path to the file that contains the tests:

```shell
$ ./node_modules/.bin/mocha path/to/test.js
```
```text
  first test
    + should run without errors


  1 passing (12ms)
```

As with bundling,
we normally put the `mocha` command in `package.json`
so that `./node_modules/.bin` is automatically included in the path.
After we add this:

```js
{
  ...
  "scripts": {
    ...
    "test": "mocha",
    ...
  }
}
```
{: title="package.json"}

<!-- == \noindent -->
to `package.json`, our command becomes:

```shell
$ npm test -- path/to/test.js
```

(Again, everything after `--` is passed to the script itself.)

## Refactoring {#s:testing-refactoring}

The next step is to create testable software.
In the case of our server,
we have to:

- move the code that listens on a port into one file, and
- have that import a file that contains the code to do everything else.

Once we have done this,
we can run the server code in other contexts.
Here's the file `standalone.js` that actually launches a server:

```js
const server = require('./server')
const PORT = 3418
server.listen(PORT, () => { console.log(`listening on port ${PORT}...`) })
```
{: title="src/testing/standalone.js"}

And here is the application code we've extracted into `server.js`
so that we can test it:

```js
const express = require('express')

// Main server object.
let app = express()

// Root page.
app.get('/', (req, res, next) => {
  res.status(200).send('<html><body><h1>Home</h1></body></html>')
})

// ...as before...

module.exports = app
```
{: title="src/testing/server.js"}

Before going any further,
we can check that we haven't broken anything by running:

```shell
$ node standalone.js
```

## Testing the Server {#s:testing-server}

All right:
now that we have extracted the code that's specific to our server,
how do we test it?
The answer is yet another library called [supertest][supertest]
that sends fake HTTP requests to an Express server
that has been split in the way we just split ours
and lets us interact with that server's replies.
Here's a test of a simple request that uses Mocha to manage the test,
and supertest's `request` function to send something to the server
and check the result:

```js
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
})
```
{: title="src/testing/request-test.js"}

Going through this line by line:

1. `request(server)` starts building up a request to send.
2. `.get('/')` specifies the path in the URL we are sending.
3. `.expect(200)` checks that the return code is 200 (OK).
4. `.expect('Content-Type', /html/)`
   checks the content type in the returned value against
   a [regular expression](../gloss/#g:regular-expression).
5. `.end` is called when the whole response has been received,
   i.e., when we can start looking at the content of the page or data
   that the server has sent.
6. Inside the callback to `end`,
   `res` is the result data.
   We make sure that its text (i.e., `res.text`) includes the word "Home".
   We really should check `err` here to make sure everything worked properly,
   but we're not quite that virtuous.
7. Finally, we call `done()` to signal the end of the test.
   Again,
   we have to do this because there's no way Mocha can know
   when the enclosing `.end(...)` will be called

Let's run our code:

```text
  server
    + should return HTML with expected title (48ms)


  1 passing (58ms)
```

Excellent: let's add some more tests.

```js
describe('server', () => {

  it('should return HTML with expected title', (done) => {
    // ...as before...
  })

  it('should return asteroids page as HTML with expected title', (done) => {
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
```
{: title="src/testing/request-test.js"}
```text
  server
    + should return HTML with expected title (42ms)
    + should return asteroids page as HTML with expected title
    + should 404 for other pages


  3 passing (62ms)
```

Notice that we check to make sure that the server sends a 404
when we ask for something that doesn't exist.
Making sure the system fails gracefully is just as important
as making sure that it provides data when asked to.

## Checking the HTML {#s:testing-html}

It's increasingly common for servers to return data that is then rendered by the client,
but some servers still generate HTML.
Do *not* try to check this with substrings or regular expressions:
the exceptions have exceptions,
and [that way lies madness][parse-xml-regular-expressions].
Instead,
we should parse the HTML to create a structure in memory and check that;
if parsing fails because the HTML is badly formatted, that's worth knowing too.
The structure in question is our new friend the DOM,
and to get it,
we will use (yet another) library called [cheerio][cheerio].
`cheerio.load` turns HTML text into a DOM tree;
the resulting object can be used like a function,
and we can use the same selectors we met previously to find things in it.
Here's our test:

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
    + should have the correct headings (67ms)


  1 passing (77ms)
```

This gets the page as before,
parses it,
then looks for `h1` elements and checks the text of the first one.
(Note that this *doesn't* check if the title is `<em>H</em>ome`
because `.text()` concatenates all the text of the children.)
We won't explore this approach further because we're going to serve data for rendering
rather than generating HTML and sending that,
but if you're doing any web scraping at all,
libraries like `cheerio` are there to help.

## Exercises {#s:testing-exercises}

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

Suppose a JavaScript program contains some JSX expressions that produce HTML
which is then read and displayed by a browser.
Draw a diagram to show the form taken by an H1 heading containing the word "data"
from start to finish.

{% include links.md %}
