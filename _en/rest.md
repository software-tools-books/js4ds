---
permalink: "/en/rest/"
title: "Building a REST API"
questions:
- "FIXME"
keypoints:
- "FIXME"
---

## Logging {#s:server-logging}

The `console.log` function we have been using
is a simple form of [logging](#g:logging).
We can use a library called [Winston][winston] to get more control and structure.
By control,
we mean that we candefine levels for messages and a threshold for the logger,
and only log things that are at least that important.
This is much better than commenting and uncommenting messages,
both because it involves less typing
and because we can leave the logging code in place when we put our application into production
to debug the problems that inevitably arise after we thought we were done.
The standard error levels provided by Winston (and similar logging libraries)
are `'error'`, `'warn'`, `'info'`, `'verbose'`, and `'debug'`,
so if we set the threshold to `'info'`,
then `'verbose'` and `'debug'` messages won't be displayed.

As for structure,
Winston produces log messages as JSON objects by default
so that other programs can easily read them.
We can also configure it to produce CSV,
or even define some custom format,
though doing that will make everyone's life more difficult.

Whatever format we choose,
we have to create and add a [transport](#g:logging-transport) to tell Winston where messages should go.
We will use one called `Console` that sends messages to the screen;
we can also send messages to files, to remote logging servers, and so on.
Note that we do *not* create a variable called `console` for the transport,
because that will overwrite the `console` we have been using up until now,
and yes, that took a couple of minutes to figure out...

```js
const express = require('express')
const path = require('path')
const fs = require('fs')
const winston = require('winston')

const PORT = 3418
const root = process.argv[2]
const level = process.argv[3]

const transport = new winston.transports.Console()
winston.add(transport)
winston.level = level

// Main server object.
const app = express()

// Handle all requests.
app.use((req, res, next) => {
  const actual = path.join(root, req.url)

  if (actual.endsWith('.js')) {
    const libName = './'.concat(actual.slice(0, -3))
    winston.debug('Loading "${libName}"')
    const dynamic = require(libName)
    const data = dynamic.page()
    res.status(200).send(data)
  }

  else {
    winston.debug('Reading "${actual}"')
    const data = fs.readFileSync(actual, 'utf-8')
    res.status(200).send(data)
  }
})

app.listen(PORT, () => {
  winston.info('Running on port ${PORT} with root ${root}')
})
```
{: title="src/server/logging.js"}

In the script above,
we set the logging level with an extra command-line parameter.
If we run the script with the `'debug'` level, all messages appear.
If we run it with the `'info'` level, only the startup message appears,
and if we run it with the level `'warning'`,
no messages appear
because none are deemed important enough.

## Middleware {#s:robust-middleware}

FIXME: We will use `bodyParser` because we're always serving JSON.
FIXME: a library called `express-winston` to log all requests:

```js
// Main server object and database object.
// db is provided during load.
let db = null
const app = express()
app.use(bodyParser.json())

// Set up logging.
app.use(expressWinston.logger({
  transports: [
    new winston.transports.Console({
      json: false,
      colorize: true
    })
  ],
  meta: false,
  msg: "HTTP {{res.statusCode}} {{req.method}} {{req.url}}"
}))
```

## Exercises {#s:robust-exercises}

{% include links.md %}
