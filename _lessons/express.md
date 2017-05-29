---
layout: page
permalink: "/express/"
title: "Building Data Services with Express"
questions:
- FIXME
keypoints:
- FIXME
---

- HTTP request/response cycle
  - Client (browser or other program) makes a connection
  - Sends a blob of text specifying what it's asking for
  - Gets a blob of text in response
  - And possibly other data as well
  - Client parses the data and decides what to draw

FIXME: diagrams

## Hello, Express

- Express handles most of this for us
- We provide callback functions taking three parameters:
  - The original request
  - The response we're building up
  - What to do next (which we'll ignore)
- Also provide the path for that function

<!-- @src/express/static-page.js -->
```js
const express = require('express')

const PORT = 3418

// Main server object.
let app = express()

// Return a static page.
app.get('/', (req, res, next) => {
  res.status(200).send('<html><body><h1>Asteroids</h1></body></html>')
})

app.listen(PORT, () => { console.log('listening...') })
```

- There is no HTML file on disk
- And there is no way for the browser to know if there was one or not

## Handling Multiple Paths

- Provide handlers for many different paths
- And handle the case where the path is not known

<!-- @src/express/multiple-paths.js -->
```js
const express = require('express')

const PORT = 3418

// Main server object.
let app = express()

// Root page.
app.get('/', (req, res, next) => {
  res.status(200).send('<html><body><h1>Home</h1></body></html>')
})

// Alternative page.
app.get('/asteroids', (req, res, next) => {
  res.status(200).send('<html><body><h1>Asteroids</h1></body></html>')
})

// Nothing else worked.
app.use((req, res, next) => {
  res.status(404).send(`<html><body><h1>ERROR</h1><p>URL "${req.url}" not found</p></body></html>`)
})

app.listen(PORT, () => { console.log('listening...') })
```

- Don't have to send a 404 status code
- But many parts of web infrastructure depend on correct codes

## Serving Files from Disk

- Instead of creating HTML in memory, read from file
- Provide our server with the path to the directory it's allowed to read

<!-- @src/express/pages.js -->
```js
const express = require('express')
const path = require('path')
const fs = require('fs')

const PORT = 3418
const root = process.argv[2]

// Main server object.
let app = express()

// Handle all requests.
app.use((req, res, next) => {
  const actual = path.join(root, req.url)
  const data = fs.readFileSync(actual, 'utf-8')
  res.status(200).send(data)
})

app.listen(PORT, () => { console.log('listening...') })
```

- Steps are:
  1. Get the request
  2. Get the path to the file from the URL
  3. Combine that with the path to the root directory
  4. Read that file
  5. Return that data
- Exercise: make this 404 for missing files

## Content Types

- Clients expect to know what kind of data we're sending
  - Images, etc.
- We're going to serve JSON

<!-- @src/express/data-server.js -->
```js
…

app.use((req, res, next) => {
  const actual = path.join(root, req.url)
  if (actual.endsWith('.json')) {
    const data = fs.readFileSync(actual, 'utf-8')
    const json = JSON.parse(data)
    res.setHeader('Content-Type', 'application/json')
    res.status(200).send(json)
  } else {
    const data = fs.readFileSync(actual, 'utf-8')
    res.status(200).send(data)
  }
})
```

- The `Content-Type` header tells the client how to handle the bytes we're sending
  - Though it can still do whatever it wants

## Dynamic Content

- Could add functions to our server to generate dynamic content
- Or have it load JavaScript dynamically and run that

<!-- @src/express/dynamic.js -->
```js
…
app.use((req, res, next) => {
  const actual = path.join(root, req.url)
  if (actual.endsWith('.js')) {
    const libName = './'.concat(actual.slice(0, -3))
    const dynamic = require(libName)
    const data = dynamic.page()
    res.status(200).send(data)
  } else {
    const data = fs.readFileSync(actual, 'utf-8')
    res.status(200).send(data)
  }
})
```

- Require all dynamic plugins to provide a `page` function
  - We have to know what to call

<!-- @src/express/pages/plugin.js -->
```js
function page() {
  return ('<html><body><h1>Plugin Content</h1></body></html>')
}

module.exports = {
  page: page
}
```
