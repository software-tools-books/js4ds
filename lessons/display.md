---
layout: page
permalink: "/display/"
---

## Introduction

- In the beginning, people created HTML pages by typing them in
- Quickly realized that a lot of pages shared a lot of content
  - Headers, footers, etc.
- Create a [template](../gloss/#template) with some embedded commands to:
  - Include other bits of HTML (like headers)
  - Loop over data structures to create lists and tables
- [Server-side page generation](../gloss/#server-side-page-generation) because:
  - That's where the data was
  - That was the only place code could be run

FIXME-18: diagram

- Balance shifted as browsers and JavaScript became more powerful
- Current standard model is:
  - JavaScript running in the browser fetches data from one or more servers
  - Uses that data to generate HTML in the browser for display
- [Client-side page generation](../gloss/#client-side-page-generation)
  - Allows the client to decide how best to render data
  - Increasingly important as mobile devices take over from PCs

FIXME-18: diagram

- Lots and lots (and lots) of JavaScript frameworks for building views
- We have chosen React because it is:
  - Freely available
  - Simpler than many alternatives
  - Widely used
  - Well documented
- Central design principles are:
  - Use functions to describe the desired HTML
  - Let React decide which functions to run when data changes
- Show how to do it the pure-JavaScript way
- Then introduce a tool called JSX that simplifies things

## Hello, World

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Hello React</title>
    <meta charset="utf-8">
    <script src="https://fb.me/react-15.0.1.js"></script>
    <script src="https://fb.me/react-dom-15.0.1.js"></script>
  </head>
  <body>
    <div id="app">
      <!-- this is filled in -->
    </div>
    <script>
      ReactDOM.render(
        React.DOM.h1(null, "Hello, React"),
        document.getElementById("app")
      )
    </script>
  </body>
</html>
```
{: title="src/react/hello-react.html"}

- Head of the page loads two React libraries from the web
  - Use locally-installed libraries later
- Body contains a `div` with an ID to make it findable
  - React will replace this entire `div`
- Script
  - Create an `h1` with the text "Hello, React"
  - Find the element whose ID is "app"
  - Insert the former into the latter
- Notes
  - Alters the representation of the page in memory, not the source of the page on disk
  - Can't put the script in a separate JavaScript file and load it in the head
    because the body might not exist in memory when the script is run

- The first parameter to `React.DOM.h1` can be an object of attributes

```html
  <body>
    <div id="app">
      <!-- this is filled in -->
    </div>
    <script>
      const attributes = {
        'style': {
          'background': 'pink',
          'font-style': 'italic'
        }
      }
      ReactDOM.render(
        React.DOM.h1(attributes, "Hello, world"),
        document.getElementById("app")
      )
    </script>
  </body>
```
{: title="src/react/stylish.html"}

## JSX

- Writing nested functions is a clumsy way to write HTML
- So add a tool called JSX that translates HTML into JavaScript function calls

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Hello World</title>
    <meta charset="utf-8">
    <script src="https://fb.me/react-15.0.1.js"></script>
    <script src="https://fb.me/react-dom-15.0.1.js"></script>
    <script src="https://unpkg.com/babel-standalone@6/babel.js"></script>
  </head>
  <body>
    <div id="app">
      <!-- this is filled in -->
    </div>
    <script type="text/babel">
      ReactDOM.render(
        <h1>Hello, world</h1>,
        document.getElementById("app")
      )
    </script>
  </body>
</html>
```
{: title="src/react/hello-jsx.html"}

- Include Babel to translate mixed content into pure JavaScript
- Add `type="text/babel"` to the `script` tag to tell Babel where to do its work
- Remember: the script is translated into pure JavaScript and then run as before

- Why bother?
- Because we can put JavaScript inside our HTML (inside our JavaScript)
- E.g., use `map` to turn a list of strings into an HTML list

```html
  <body>
    <div id="app">
      <!-- this is filled in -->
    </div>
    <script type="text/babel">
      const allNames = ['McNulty', 'Jennings', 'Snyder', 'Meltzer', 'Bilas', 'Lichterman']
      ReactDOM.render(
        <ul>{allNames.map((name) => { return <li>{name}</li> })}</ul>,
        document.getElementById("app")
      )
    </script>
  </body>
```
{: title="src/react/jsx-list.html"}

- Have to use `map` rather than a loop because the function has to return something
  - Could build up a string through repeated concatenation, but this is cleaner
- *Must* return exactly one root node, because this is one function call

## Creating Components

- If we're defining functions, we can write new ones

```html
  <body>
    <div id="app">
      <!-- this is filled in -->
    </div>
    <script type="text/babel">
      const allNames = ['McNulty', 'Jennings', 'Snyder', 'Meltzer', 'Bilas', 'Lichterman']

      const ListOfNames = () => {
        return (<ul>{allNames.map((name) => { return <li>{name}</li> })}</ul>)
      }

      ReactDOM.render(
        <div>
          <ListOfNames />
        </div>,
        document.getElementById("app")
      )
    </script>
  </body>
```
{: title="src/react/create-components.html"}

- What we really want to do is parameterize
  - After all, the JSX is being turned into a function
- All the attributes are passed to our function in a single `props` object

```html
  <body>
    <div id="app">
      <!-- this is filled in -->
    </div>
    <script type="text/babel">
      const allNames = ['McNulty', 'Jennings', 'Snyder', 'Meltzer', 'Bilas', 'Lichterman']

      const ListElement = (props) => {
        return (<li id="{props.name}"><em>{props.name}</em></li>)
      }

      ReactDOM.render(
        <div>
          <ul>{allNames.map((name) => { return <ListElement name={name} /> })}</ul>
        </div>,
        document.getElementById("app")
      )
    </script>
  </body>
```
{: title="src/react/pass-parameters.html"}

- Gives us exactly one logical place to do calculations, set style, etc.

## Developing with a Server

- Putting all the source in the HTML file, in one block, is bad practice
- Already seen problems with loading source in header
  - Page doesn't exist yet
- And what about `require` statements?
  - Browser tries to load files when it sees those
  - But whose serves them?
- `npm install --save http-server` to get a little HTTP server
- Write a little shell script to change directories and run the server:

```sh
#!/usr/bin/env bash
server_path=${PWD}/node_modules/.bin/http-server
cd $1 && ${server_path}
```
{: title="bin/run-server"}

- Add a line to `package.json` to run this

```js
  "scripts": {
    "demo": "./bin/run-server",
    …
  }
```

- Everything after `--` on the command line is passed to the script
  - So `npm run demo -- src/react/hello-separate` will serve what's in that directory
- Now include the JavaScript like any other script

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Hello Separate</title>
    <meta charset="utf-8">
    <script src="https://fb.me/react-15.0.1.js"></script>
    <script src="https://fb.me/react-dom-15.0.1.js"></script>
    <script src="https://unpkg.com/babel-standalone@6/babel.js"></script>
    <script src="app.js" type="text/babel"></script>
  </head>
  <body>
    <div id="app">
      <!-- this is filled in -->
    </div>
  </body>
</html>
```
{: title="src/react/hello-separate/index.html"}

- And put the JavaScript in the file

```js
ReactDOM.render(
  <h1>Hello, separate</h1>,
  document.getElementById("app")
)
```
{: title="src/react/hello-separate/app.js"}

- Can now load many separate files
  - Warning: do this in the HTML with multiple script tags
  - This is *not* how we will do production applications (which will have a compilation step)
- HTML page:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Hello Separate</title>
    <meta charset="utf-8">
    <script src="https://fb.me/react-15.0.1.js"></script>
    <script src="https://fb.me/react-dom-15.0.1.js"></script>
    <script src="https://unpkg.com/babel-standalone@6/babel.js"></script>
    <script src="ListElement.js" type="text/babel"></script>
    <script src="app.js" type="text/babel"></script>
  </head>
  <body>
    <div id="app">
      <!-- this is filled in -->
    </div>
  </body>
```
{: title="src/react/multiple-files/index.html"}

- React code to format a list element

```js
const ListElement = (props) => {
  return (<li id="{props.name}"><em>{props.name}</em></li>)
}
```
{: title="src/react/multiple-files/ListElement.js"}

- Main application
- Note that this JavaScript *doesn't* have an `import` or `require` statement

```js
const allNames = ['McNulty', 'Jennings', 'Snyder', 'Meltzer', 'Bilas', 'Lichterman']
ReactDOM.render(
  <ul>{allNames.map((name) => { return <ListElement name={name} /> })}</ul>,
  document.getElementById("app")
)
```
{: title="src/react/multiple-files/app.js"}

- But this is probably a bad layout
  - Would make more sense to have a `Name` element that formatted a name
  - And then let the application decide to put those names in a list

<div class="challenges" markdown="1">

## Challenges

### Real Data

1. Create a file called `programmers.js` that defines
   a list of JSON objects called `programmers`
   with `firstName` and `lastName` fields for our programmers.
   (You can search the Internet to find their names.)
2. Load that file in your page like any other JavaScript file.
3. Delete the list `allNames` from the application
   and modify it to use data from the list `programmers` instead.

Loading constant data like this is a common practice during testing.

### Ordering

What happens if you change the order in which the JavaScript files
are loaded in your web page?
For example,
what happens if you load `app.js` *before* you load `ListElement.js`?

### Multiple Targets

What happens if your HTML page contains two `div` elements with `id="app"`?

### Creating a Component for Names

Create a new React component that renders a name,
and modify the example to use it instead of always displaying names in `<li>` elements.

### Striping

Suppose we want to render every second list element in italics.
(This would be a horrible design,
but once we start creating tables,
we might want to highlight alternate rows in different background colors
to make it easier to read.)
Modify the application so that
even-numbered list elements are `<li>{name}</li>`
and odd-numbered list elements are `<li><em>{name}</em></li>`.
(You may want to use the fact that a `map` callback can have two parameters
instead of one.)

</div>

{% include links.md %}
