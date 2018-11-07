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

FIXME: rewrite this with Tape for consistency with database testing.

We are bad people,
because we have been writing code without testing it.
In this lesson we will redeem ourselves
(at least partially)
by correcting that.

JavaScript uses the same pattern for unit testing as most other modern languages.
Each test is written as a function,
and each of those functions tests one particular aspect of the code.
A standalone program called a [test runner](#g:test-runner)
finds test functions,
runs them,
and reports the results.
Any setup code that needs to be run before each test to create a [fixture](#g:fixture)
is put in a function of its own.
Similarly (but less frequently),
if some teardown needs to be done *after* each test,
we put those operations in a function as well.

Each unit test can have one of three results:

- pass: everything worked
- fail: the system being tested didn't do what was expected
- error: something went wrong with the test itself

We can combine tests into [test suites](#g:test-suite)
(and test suites into larger suites, and so on)
so that we can more easily run related sets of tests.
This makes testing during development faster,
which in turn makes it more likely that we'll actually do it.

Finally,
we write the tests themselves using [assertions](#g:assertion):
statements that check whether or not some condition holds
and generate an error if it doesn't.
Node provides an `assert` library with some useful functions for asserting various things;
we'll explore this as we go along.

## Introducing Mocha {#s:testing-mocha}

JavaScript has almost as many testing libraries as it has front-end frameworks.
We will use one called Mocha,
mostly because it is well documented.
We don't need to import anything to use it;
instead,
it imports our code and calls our functions.

When writing Mocha tests,
we use a function called `describe` to create a group of tests
and another function called `it` for individual tests:

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
When our tests are done,
we call `done` to signal that we're finished.
We need to do this because callbacks run out of order
and some tests might take a while to complete,
so Mocha needs to know when each one is done.

We can run our tests from the shell by invoking `mocha`
and giving it the path to the file that contains the tests:

```sh
./node_modules/.bin/mocha path/to/test.js
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

to `package.json`, our command becomes:

```sh
npm test -- path/to/test.js
```

(Again,
everything after `--` is passed to the script itself.)

## Refactoring {#s:testing-refactoring}

The next step is to create testable software.
In the case of our server,
we have to:

- move the code that listens on a port into a separate file, and
- have that import everything else

Once we have done this,
we can run the server code in other contexts.
Here's the file `standalone.js` that actually runs the server:

```js
const server = require('./server')
const PORT = 3418
server.listen(PORT, () => { console.log(`listening on port ${PORT}...`) })
```
{: title="src/testing/standalone.js"}

And here is the application code we've extracted to be tested:

```js
const express = require('express')

// Main server object.
let app = express()

// Root page.
app.get('/', (req, res, next) => {
  res.status(200).send('<html><body><h1>Home</h1></body></html>')
})

...as before...

module.exports = app
```
{: title="src/testing/server.js"}

Before going any further,
we can check that we haven't broken anything by running:

```sh
node standalone.js
```

## Testing the Server {#s:testing-server}

All right:
now that we have extracted the code that's specific to our server,
how do we test it?
The answer is yet another library called `supertest`
that sends fake HTTP requests to a server and lets us interact with the replies:

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

Going through this line by line:

1. `request(server)` starts building up a request to send.
2. The `.get('/')` call specifies the path in the pretended URL.
3. `.expect('Content-Type', /html/)`
   checks the content type in the returned value against a regular expression
   (discussed briefly at the end of this section).
4. `.expect(200)` checks that the return code is 200 (OK).
5. `.end` is called when the whole response has been received.
   We really should check `err` to make sure everything worked properly,
   but we're not quite that virtuous.
6. Inside the callback to `end`,
   `res` is the result data.
   We make sure that `res.text` includes the word "Home",
   and then just to prove that tests don't automatically pass
   we check for something it *shouldn't* contain.
   (Rule #2 of testing: always make sure the equipment is switched on...)
7. Finally, we call `done()` to signal the end of the test.
   Again,
   we have to do this because there's no way Mocha can know
   when the encloding `.end(...)` will be called

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
    ...
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
    + should return HTML with expected title (42ms)
    + should return asteroids page as HTML with expected title
    + should 404 for other pages


  3 passing (62ms)
```

> **Regular Expressions**
>
> A [regular expression](#g:regular-expression) is
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
we will use (yet another) library called `cheerio`.
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

### FIXME: exercise on testing randomness

FIXME

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

{% include links.md %}
