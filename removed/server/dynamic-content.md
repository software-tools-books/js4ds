## Dynamic Content {#s:server-dynamic}

- Could add functions to our server to generate dynamic content
- Or have it load JavaScript dynamically and run that

```js
...
app.use((req, res, next) => {
  const actual = path.join(root, req.url)

  if (actual.endsWith('.js')) {
    const libName = './'.concat(actual.slice(0, -3))
    const dynamic = require(libName)
    const data = dynamic.page()
    res.status(200).send(data)
  }

  else {
    const data = fs.readFileSync(actual, 'utf-8')
    res.status(200).send(data)
  }
})
```
{: title="src/server/dynamic.js"}

- Require all dynamic plugins to provide a `page` function
  - We have to know what to call

```js
function page() {
  return ('<html><body><h1>Plugin Content</h1></body></html>')
}

module.exports = {
  page: page
}
```
{: title="src/server/pages/plugin.js"}
