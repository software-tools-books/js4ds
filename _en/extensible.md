---
permalink: "/en/extensible/"
title: "Extensible Servers"
---

Suppose we want to extend our [server](../server/) in some way.
We could edit the source file and add some more URL handlers,
or we could have it load JavaScript dynamically and run that.

```js
const express = require('express')

const PORT = 3418

// Main server object.
const app = express()

// Handle all requests.
app.use((req, res, next) => {
  if (req.url.endsWith('.js')) {
    const libName = './'.concat(req.url.slice(0, -3))
    const dynamic = require(libName)
    const data = dynamic.page()
    res.status(200).send(data)
  }

  else {
    res.status(404).send(`<html><body><p>"${req.url}" not found</p></body></html>`)
  }
})

app.listen(PORT, () => { console.log(`listening on port ${PORT}...`) })
```
{: title="src/extensible/dynamic.js"}

This simple server checks whether the path specified in the URL ends with `.js`.
If so,
it constructs something that looks like the name of a library by stripping off the `.js`
and prefixing the stem with `./`,
then uses `require` to load that file.
Assuming the load is successful,
it then calls the `page` function defined in that file.
We can create a very simple plugin like this:

```js
function page() {
  return ('<html><body><h1>Plugin Content</h1></body></html>');
}

module.exports = {
  page: page
}
```
{: title="src/extensible/plugin.js"}

If we run the server:

```shell
$ node src/extensible/dynamic.js
```

<!-- == \noindent -->
and then go to `http://localhost:4000/plugin.js`,
we get back a page containing the title "Plugin Content".

This is an example of a very powerful technique.
Rather than building everything into one program,
we can provide a [protocol](../gloss/#g:protocol) for plugins
so that people can add new functionality without rewriting what's already there.
Each plugin must have an [entry point](../gloss/#g:entry-point) like the function `page`
so that the framework knows where to start.
