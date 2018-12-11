---
permalink: "/en/logging/"
title: "Logging"
---

The `console.log` function we have been using
is a simple form of [logging](../gloss/#g:logging).
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
we have to create and add a [transport](../gloss/#g:logging-transport) to tell Winston where messages should go.
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
  fs.stat(actual, (err, stats) => {
    if (err) {
      winston.error(`Unable to find "${actual}"`)
      res.status(404).send(`<html><body><p>cannot read ${actual}</p></body></html>`)
    } else if (!stats.isFile()) {
      winston.error(`"${actual}" is not a file`)
      res.status(404).send(`<html><body><p>cannot read ${actual}</p></body></html>`)
    } else {
      winston.debug(`Serving "${actual}"`)
      fs.readFile(actual, 'utf-8', (err, data) => {
	res.status(200).send(data)
      })
    }
  })
})

app.listen(PORT, () => {
  winston.info(`Running on port ${PORT} with root ${root}`)
})
```
{: title="src/logging/logging-server.js"}

In the script above,
we set the logging level with an extra command-line parameter.
If we run the script with the `'debug'` level, all messages appear.
If we run it with the `'info'` level,
the startup message and the 404 error messages appear,
and if we run it with the level `'error'` only the latter appear.

```shell
$ node src/logging/logging-server.js src/logging/web-dir/ info
```
```text
{"message":"Running on port 3418 with root src/logging/web-dir/","level":"info"}
{"message":"Unable to find \"src/logging/web-dir/missing.html\"","level":"error"}
```

{% include links.md %}
