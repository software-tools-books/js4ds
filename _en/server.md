---
title: "Creating a Server"
questions:
- "How do browsers and servers communicate?"
- "What tools can I use to create a data server in JavaScript?"
- "How can I tell a server to handle different URLs differently?"
- "How can I serve files from disk?"
- "How does a server specify the type of data it's sending?"
- "How can I add new abilities to a server without rewriting it?"
keypoints:
- "An HTTP request or response consists of a plain-text header and an optional body."
- "HTTP is a stateless protocol."
- "Express provides a simple path-based JavaScript server."
- "Write callback functions to handle requests matching specified paths."
- "Provide a default handler for unrecognized requests."
- "Use `Content-Type` to specify the type of data being returned."
- "Use dynamic loading to support plugin extensions."
---

Now that we have a data manager ([s:dataman](#REF))
the next step is to create a server to share our data with the world,
which we will build using a library called [Express][express].
Before we start writing code,
though,
we need to understand how computers talk to each other.

## HTTP {#s:server-http}

Almost everything on the web communicates via [HTTP](#g:http),
which stands for HyperText Transfer Protocol.
The core of HTTP is a [request](#g:http-request)/[response](#g:http-response) cycle
that specifies the kinds of requests applications can make of servers,
how they exchange data,
and so on.
The diagram below shows this cycle in action for a page that includes one image:

{% include figure.html id="f:server-cycle" src="../../figures/server-cycle.svg" caption="HTTP Request/Response Cycle" %}

1.  The client (a browser or some other program) makes a connection to a server.
2.  It then sends a blob of text specifying what it's asking for.
3.  The server replies with a blob of text and the HTML.
4.  The connection is closed.
5.  The client parses the text and realizes it needs an image.
6.  It sends another blob of text to the server asking for that image.
7.  The server replies with a blob of text and the contents of the image file.
8.  The connection is closed.

This cycle might be repeated many times to display a single web page,
since a separate request has to be made for every image,
every CSS or JavaScript file,
and so on.
In practice,
a lot of behind-the-scenes engineering is done to keep connections alive as long as they're needed,
and to [cache](#g:cache) items that are likely to be re-used.

An HTTP request is just a block of text with two important parts:

- The [method](#g:http-method) is almost always either `GET` (to get data) or `POST` (to submit data).
- The [URL](#g:url) is typically a path to a file,
  but as we'll see below,
  it's completely up to the server to interpret it.

The request can also contain [headers](#g:http-header),
which are key-value pairs with more information about what the client wants.
Some examples include:

- `"Accept: text/html"` to specify that the client wants HTML
- `"Accept-Language: fr, en"` to specify that the client prefers French, but will accept English
- `"If-Modified-Since: 16-May-2018"` to tell the server that the client is only interested in recent data

(Unlike a dictionary, a key may appear any number of times,
which allows a request to do things like specify that it's willing to accept several types of content.
The [body](#g:http-body) of the request is any extra data associated with it,
such as files that are being uploaded.
If a body is present,
the request must contain the `Content-Length` header
so that the server knows how much data to read.

{% include figure.html id="f:server-request" src="../../figures/server-request.svg" caption="Structure of an HTTP Request" %}

The headers and body in an HTTP response have the same form, and mean the same thing.
Crucially,
the response also includes a status code to indicate what happened:
200 for OK, 404 for "page not found", and so on.
Some of the more common are:

| Code | Name                  | Meaning                                                              |
| ---- | --------------------- | -------------------------------------------------------------------- |
| 100  | Continue              | The client should continue sending data                              |
| 200  | OK                    | The request has succeeded                                            |
| 204  | No Content            | The server completed the request but doesn't need to return any data |
| 301  | Moved Permanently     | The requested resource has moved to a new permanent location         |
| 307  | Temporary Redirect    | The requested resource is temporarily at a different location        |
| 400  | Bad Request           | The request is badly formatted                                       |
| 401  | Unauthorized          | The request requires authentication                                  |
| 404  | Not Found             | The requested resource could not be found                            |
| 408  | Timeout               | The server gave up waiting for the client                            |
| 418  | I'm a Teapot          | Originally an April Fool's joke, now used to identify devices        |
| 500  | Internal Server Error | An error occurred in the server while trying to handle the request   |
| 601  | Connection Timed Out  | The server did not respond before the connection timed out           |

One final thing we need to understand is the structure and interpretation of URLs.
This one:

```text
http://example.org:1234/some/path?value=deferred&limit=200
```

<!-- == \noindent -->
has five parts:

- The protocol `http`, which specifies what rules are going to be used to exchange data.
- The [hostname](#g:hostname) `example.org`, which tells the client where to find the server.
  If we are running a server on our own computer for testing,
  we can use the name `localhost` to connect to it.
  (Computers rely on a service called [DNS](#g:dns)
  to find the machines associated with human-readable hostnames,
  but its operation is out of scope for this tutorial.)
- The [port](#g:port) `1234`, which tells the client where to call the service it wants.
  (If a host is like an office building, a port is like a phone number in that building.
  The fact that we think of phone numbers as having physical locations
  says something about our age...)
- The path `/some/path` tells the server what the client wants.
- The [query parameters](#g:query-parameter) `value=deferred` and `limit=200`.
  These come after a question mark and are separated by ampersands,
  and are used to provide extra information.

It used to be common for paths to identify actual files on the server,
but the server can interpret the path however it wants.
In particular,
when we are writing a data service,
the segments of the path can identify what data we are asking for.
Alternatively,
it's common to think of the path as identifying a function on the server that we want to call,
and to think of the query parameters as the arguments to that function.
We'll return to these ideas after we've seen how a simple server works.

## Hello, Express {#s:server-express}

A Node-based library called Express handles most of the details of HTTP for us.
When we build a server using Express,
we provide callback functions that take three parameters:

- the original request,
- the response we're building up, and
- what to do next (which we'll ignore for now).

We also provide a pattern with each function that specifies what URLs it is to match.
Here is a simple example:

```js
const express = require('express')

const PORT = 3418

// Main server object.
const app = express()

// Return a static page.
app.get('/', (req, res, next) => {
  res.status(200).send('<html><body><h1>Asteroids</h1></body></html>')
})

app.listen(PORT, () => { console.log('listening...') })
```
{: title="server/static-page.js"}

The first line of code loads the Express library.
The next defines the port we will listen on,
and then the third creates the object that will do most of the work.

Further down,
the call to `app.get` tells that object to handle any `GET` request for '/'
by sending a reply whose status is 200 (OK)
and whose body is an HTML page containing only an `h1` heading.
There is no actual HTML file on disk,
and in fact no way for the browser to know if there was one or not:
the server can send whatever it wants in response to whatever requests it wants to handle.

Note that `app.get` doesn't actually get anything right away.
Instead,
it registers a callback with Express that says,
"When you see this URL, call this function to handle it."
As we'll see below,
we can register as many path/callback pairs as we want to handle different things.

Finally,
the last line of this script tells our application to listen on the specified port,
while the callback tells it to print a message as it starts running.
When we run this, we see:

```shell
$ node static-page.js
```
```text
listening...
```

Our little server is now waiting for something to ask it for something.
If we go to our browser and request `http://localhost:3418/`,
we get a page with a large title `Asteroids` on it.
Our server has worked,
and we can now stop it by typing <kbd>Ctrl-C</kbd> in the shell.

## Handling Multiple Paths {#s:server-paths}

Let's extend our server to do different things when given different paths,
and to handle the case where the request path is not known:

```js
const express = require('express')

const PORT = 3418

// Main server object.
const app = express()

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
{: title="server/multiple-paths.js"}

The first few lines are the same as before.
We then specify handlers for the paths `/` and `/asteroids`,
each of which sends a different chunk of HTML.

The call to `app.use` specifies a default handler:
if none of the `app.get` handlers above it took care of the request,
this callback function will send a "page not found" code
*and* a page containing an error message.
Some sites skip the first part and only return error messages in pages for people to read,
but this is sinful:
making the code explicit makes it a lot easier to write programs to scrape data.

As before, we can run our server from the command line
and then go to various URLs to test it.
`http://localhost:3418/` produces a page with the title "Home",
`http://localhost:3418/asteroids` produces one with the title "Asteroids",
and `http://localhost:3418/test` produces an error page.

## Serving Files from Disk {#s:server-files}

It's common to generate HTML in memory when building data services,
but it's also common for the server to return files.
To do this,
we will provide our server with the path to the directory it's allowed to read pages from,
and then run it with <code>node <em>server-name</em>.js <em>path/to/directory</em></code>.
We have to tell the server whence it's allowed to read files
because we definitely do *not* want it to be able to send everything on our computer to whoever asks for it.
(For example,
a request for the `/etc/passwd` password file on a Linux server should probably be refused.)

Here's our updated server:

```js
const express = require('express')
const path = require('path')
const fs = require('fs')

const PORT = 3418
const root = process.argv[2]

// Main server object.
const app = express()

// Handle all requests.
app.use((req, res, next) => {
  const actual = path.join(root, req.url)
  const data = fs.readFileSync(actual, 'utf-8')
  res.status(200).send(data)
})

app.listen(PORT, () => { console.log('listening...') })
```
{: title="server/serve-pages.js"}

The steps in handling a request are:

1. The URL requested by the client is given to us in `req.url`.
2. We use `path.join` to combine that with the path to the root directory,
   which we got from a command-line argument when the server was run.
3. We try to read that file using `readFileSync`,
   which blocks the server until the file is read.
   We will see later how to do this I/O asynchronously
   so that our server is more responsive.
4. Once the file has been read, we return it with a status code of 200.

If a sub-directory called `web-dir` holds a file called `title.html`,
and we run the server as:

```shell
$ node serve-pages.js ./web-dir
```

<!-- == \noindent -->
we can then ask for `http://localhost:3418/title.html`
and get the content of `web-dir/title.html`.
Notice that the directory `./web-dir` doesn't appear in the URL:
our server interprets all paths as if the directory we've given it
is the root of the filesystem.

If we ask for a page that doesn't exist,
such as `http://localhost:3418/missing.html`,
we get this:

```text
Error: ENOENT: no such file or directory, open 'web-dir/missing.html'
    at Object.openSync (fs.js:434:3)
    at Object.readFileSync (fs.js:339:35)
    ... etc. ...
```

We will see in the exercises how to add proper error handling to our server.

> **Favorites and Icons**
>
> If we use a browser to request a page such as `title.html`,
> the browser may actually make two requests:
> one for the page,
> and one for a file called `favicon.ico`.
> Browsers do this automatically,
> then display that file in tabs, bookmark lists, and so on.
> Despite its `.ico` suffix,
> the file is (usually) a small PNG-formatted image,
> and must be placed in the root directory of the website.

## Content Types {#s:server-content-types}

So far we have only served HTML,
but the server can send any type of data,
including images and other binary files.
For example,
let's serve some JSON data:

```js
// ...as before...

app.use((req, res, next) => {
  const actual = path.join(root, req.url)

  if (actual.endsWith('.json')) {
    const data = fs.readFileSync(actual, 'utf-8')
    const json = JSON.parse(data)
    res.setHeader('Content-Type', 'application/json')
    res.status(200).send(json)
  }

  else {
    const data = fs.readFileSync(actual, 'utf-8')
    res.status(200).send(data)
  }
})
```
{: title="server/data-server.js"}

What's different here is that when the requested path ends with `.json`
we explicitly set the `Content-Type` header to `application/json`
to tell the client how to interpret the bytes we're sending back.
If we run this server with `web-dir` as the directory to serve from
and ask for `http://localhost:3418/data.json`,
a modern browser will provide a folding display of the data
rather than displaying the raw text.

## Exercises {#s:server-exercises}

### Report Missing Files

Modify the version of the server that returns files from disk
to report a 404 error if a file cannot be found.
What should it return if the file exists but cannot be read
(e.g., if the server does not have permissions)?

### Serving Images

Modify the version of the server that returns files from disk
so that if the file it is asked for has a name ending in `.png` or `.jpg`,
it is returned with the right `Content-Type` header.

### Delayed Replies

Our file server uses `fs.readFileSync` to read files,
which means that it stops each time a file is requested
rather than handling other queries while waiting for the file to be read.
Modify the callback given to `app.use` so that it uses `fs.readFile` with a callback instead.

### Using Query Parameters

URLs can contain query parameters in the form `http://site.edu?first=1&second=b`.
Read the online documentation for [Express][express] to find out
how to access them in a server,
and then write a server to do simple arithmetic:
the URL `http://localhost:3654/add?left=1&right=2` should return `3`,
while the URL `http://localhost:3654/subtract?left=1&right=2` should return `-1`.

{% include links.md %}
