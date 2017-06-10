---
layout: lesson
permalink: "/display/"
title: "Building Static Web Pages with React"
questions:
- "What JavaScript libraries should I use to create a web pages?"
- "How can I use them to create basic HTML elements?"
- "How can I style those pages?"
- "How can I mix my JavaScript with HTML?"
- "How can I create reusable components for building web pages?"
- "How can separate my code into multiple files to make it more manageable?"
keypoints:
- "Older dynamic web sites generated pages on the server."
- "Newer dynamic web sites generate pages in the client."
- "React is a JavaScript library for client-side page generation that represents HTML elements as function calls."
- "React replaces page elements with dynamically-generated content in memory (not on disk)."
- "React functions can be customized with elements."
- "JSX translates HTML into React function calls so that HTML and JavaScript can be mixed freely."
- "Use Babel to translate JSX into JavaScript in the browser."
- "Define new React components with a pseudo-HTML element and a corresponding function."
- "Attributes to pseudo-HTML are passed to the JavaScript function as a `props` object."
- "Use Node's `http-server` to load scripts from files during development."
---

- In the beginning, people created HTML pages by typing them in
- Quickly realized that a lot of pages shared a lot of content
  - Headers, footers, etc.
- Create a [template](./gloss/#template) with some embedded commands to:
  - Include other bits of HTML (like headers)
  - Loop over data structures to create lists and tables
- [Server-side page generation](./gloss/#server-side-page-generation) because:
  - That's where the data was
  - That was the only place code could be run

FIXME-18: diagram

- Balance shifted as browsers and JavaScript became more powerful
- Current standard model is:
  - JavaScript running in the browser fetches data from one or more servers
  - Uses that data to generate HTML in the browser for display
- [Client-side page generation](./gloss/client-side-page-generation)
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

<!-- @src/react/hello-react.html -->
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

<!-- @src/react/stylish.html -->
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

## JSX

- Writing nested functions is a clumsy way to write HTML
- So add a tool called JSX that translates HTML into JavaScript function calls

<!-- @src/react/hello-jsx.html -->
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

- Include Babel to translate mixed content into pure JavaScript
- Add `type="text/babel"` to the `script` tag to tell Babel where to do its work
- Remember: the script is translated into pure JavaScript and then run as before

- Why bother?
- Because we can put JavaScript inside our HTML (inside our JavaScript)
- E.g., use `map` to turn a list of strings into an HTML list

<!-- @src/react/jsx-list.html -->
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

- Have to use `map` rather than a loop because the function has to return something
  - Could build up a string through repeated concatenation, but this is cleaner
- *Must* return exactly one root node, because this is one function call

## Creating Components

- If we're defining functions, we can write new ones

<!-- @src/react/create-components.html -->
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

- What we really want to do is parameterize
  - After all, the JSX is being turned into a function
- All the attributes are passed to our function in a single `props` object

<!-- @src/react/pass-parameters.html -->
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

<!-- @bin/run-server -->
```sh
#!/usr/bin/env bash
server_path=${PWD}/node_modules/.bin/http-server
cd $1 && ${server_path}
```

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

<!-- @src/react/hello-separate/index.html -->
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

- And put the JavaScript in the file

<!-- @src/react/hello-separate/app.js -->
```js
ReactDOM.render(
  <h1>Hello, separate</h1>,
  document.getElementById("app")
)
```

- Can now load many separate files
  - Warning: do this in the HTML with multiple script tags
  - This is *not* how we will do production applications (which will have a compilation step)
- HTML page:

<!-- @src/react/multiple-files/index.html -->
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

- React code to format a list element

<!-- @src/react/multiple-files/ListElement.js -->
```js
const ListElement = (props) => {
  return (<li id="{props.name}"><em>{props.name}</em></li>)
}
```

- Main application
- Note that this JavaScript *doesn't* have an `import` or `require` statement

<!-- @src/react/multiple-files/app.js -->
```js
const allNames = ['McNulty', 'Jennings', 'Snyder', 'Meltzer', 'Bilas', 'Lichterman']
ReactDOM.render(
  <ul>{allNames.map((name) => { return <ListElement name={name} /> })}</ul>,
  document.getElementById("app")
)
```

- But this is probably a bad layout
  - Would make more sense to have a `Name` element that formatted a name
  - And then let the application decide to put those names in a list
  - Exercise for the reader

## Challenges

FIXME-19: write challenges
