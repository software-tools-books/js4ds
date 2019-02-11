---
title: "Interactive Sites"
questions:
- "How do I tell the browser what to do when someone clicks a button?"
- "How should I structure my code to make interactions manageable?"
- "How can a web application get data from a server?"
- "How does modern JavaScript handle asynchronous operations?"
keypoints:
- "Define event handlers to specify what actions the browser should take when the user interacts with an application."
- "The browser passes event objects containing details of events to event handlers."
- "Use classes to keep state and event handlers together."
- "React calls a class's `render` to display it."
- "Separate models (which store data) from views (which display it)."
- "Use `fetch` to get data from servers."
- "Use destructuring to get individual members from an object in a single step."
- "Modern JavaScript uses promises to manage asynchronous activities."
---

Browsers allow us to define [event handlers](#g:event-handler)
to specify what to do in response to an externally-triggered action,
such as a page loading or a user pressing a button.
These event handlers are just callback functions
that are (usually) given an [event object](#g:event-object) containing information about what happened,
and while we can write them in pure JavaScript,
they're even easier to build in React.

Let's switch back to single-page examples for a moment
to show how we pass a callback function as
a specifically-named property of the thing whose behavior we are specifying.
(Don't forget to load the required libraries in the HTML header, like we did
[earlier](../dynamic/).)

```js
  <body>
    <div id="app"></div>
    <script type="text/babel">
      let counter = 0
      const sayHello = (event) => {
        counter += 1
        console.log(`Hello, button: ${counter}`)
      }

      ReactDOM.render(
        <button onClick={sayHello}>click this</button>,
        document.getElementById("app")
      )
    </script>
  </body>
```
{: title="interactive/hello-button.html"}

As its name suggests,
a button's `onClick` handler is called whenever the button is clicked.
Here,
we are telling React to call `sayHello`,
which adds one to the variable `counter`
and then prints its value along with a greeting message.

Global variables and functions are a poor way to structure code.
It's far better to define the component as a class
and then use a method as the event handler:

```js
  <body>
    <div id="app"></div>
    <script type="text/babel">
      class Counter extends React.Component {

        constructor (props) {
          super(props)
          this.state = {counter: 0}
        }

        increment = (event) => {
          this.setState({counter: this.state.counter+1})
        }

        render = () => {
          return (
            <p>
              <button onClick={this.increment}>increment</button>
              <br/>
              current: {this.state.counter}
            </p>
          )
        }
      }

      ReactDOM.render(
        <Counter />,
        document.getElementById("app")
      )
    </script>
  </body>
</html>
```
{: title="interactive/display-counter.html"}

Working from bottom to top,
the `ReactDOM.render` call inserts whatever HTML is produced by `<Counter />`
into the element whose ID is `"app"`.
In this case,
though,
the counter is not a function,
but a class with three parts:

1. Its constructor passes the properties provided by the user up to `React.Component`'s constructor.
   (There aren't any properties in this case,
   but there will be in future examples,
   so it's a good habit to get into.)
   The constructor then creates a property called `state`
   that holds this component's state.
   This property *must* have this name so that React knows to watch it for changes.

2. The `increment` method uses `setState` (inherited from `React.Component`)
   to change the value of the counter.
   We *must* do this rather than creating and modifying `this.counter`
   so that React will notice the change in state
   and re-draw what it needs to.

3. The `render` method takes the place of the functions we have been using so far.
   It can do anything it wants, but must return some HTML (using JSX).
   Here, it creates a button with an event handler and displays the current value of the counter.

React calls each component's `render` method each time `setState` is used to update the component's state;
this is an example of a protocol,
which was described [earlier](../oop/#s:oop-protocols).
Behind the scenes,
React does some thinking to minimize how much redrawing takes place:
while it may look as though the paragraph, button, and current count are all being redrawn each time,
React will only actually redraw as little as it can.

## But It Doesn't Work {#s:interactive-babel}

If we try running this little application from the command line with Parcel:

```shell
$ npm run dev -- src/interactive/display-counter.html
```

<!-- == \noindent -->
everything works as planned.
But now try taking the code out of the web page and putting it in its own file:

```html
<html>
  <head>
    <meta charset="utf-8">
    <title>Counter</title>
    <script src="app.js" async></script>
  </head>
  <body>
    <div id="app"></div>
  </body>
</html>
```
{: title="interactive/counter/index.html"}

```js
import React from 'react'
import ReactDOM from 'react-dom'

class Counter extends React.Component {

  constructor (props) {
    // ...as before...
  }

  increment = (event) => {
    this.setState({counter: this.state.counter+1})
  }

  render = () => {
    // ...as before...
  }
}

ReactDOM.render(
  <Counter />,
  document.getElementById('app')
)
```
{: title="interactive/counter/app.js"}

Let's try running this:

```shell
$ npm run dev -- src/interactive/counter/index.html
```

```text
> js-vs-ds@0.1.0 dev /Users/stj/js-vs-ds
> parcel serve -p 4000 "src/interactive/counter/index.html"

Server running at http://localhost:4000
!!  /Users/stj/js-vs-ds/src/interactive/counter/app.js:11:12: Unexpected token (11:12)
   9 |   }
  10 |
> 11 |   increment = (event) => {
     |             ^
  12 |     this.setState({counter: this.state.counter+1})
  13 |   }
  14 |
```

It seems that Parcel doesn't like fat arrow methods.
This happens because React is still using ES6 JavaScript by default,
and fat arrow methods weren't included in JavaScript at that point.
All right, let's try using "normal" function-style method definitions instead:

```js
// ...imports as before...

class Counter extends React.Component {

  constructor (props) {
    super(props)
    this.state = {counter: 0}
  }

  increment (event) {
    this.setState({counter: this.state.counter+1})
  }

  render () {
    return (
      <p>
        <button onClick={this.increment}>increment</button>
        <br/>
        current: {this.state.counter}
      </p>
    )
  }
}

// ...render as before...
```
{: title="interactive/counter-functions/app.js"}

Parcel runs this without complaint,
but clicking on the button doesn't change the display.
Despair is once again our friend---our *only* friend---but we persevere.
When we open the debugging console in the browser,
we see the message `TypeError: this is undefined`.
The appendix [explains in detail](../legacy/#s:legacy-prototypes) why this happens;
for now, suffice to say that some poor choices were made early in JavaScript's development about variable scoping.

At this point it appears that we can compile but not run, or not bundle files together.
But wait:
when we used an in-page script, we specified the type as `text/babel`
and loaded `https://unpkg.com/babel-standalone@6/babel.js` in the page header along with React.
Can Babel save us?

The answer is "yes",
though it takes a fair bit of searching on the web to find this out
(particularly if you don't know what you're looking for).
The magic is to create a file in the project's root directory called `.babelrc`
and add the following lines:

```js
{
  "presets": [
    "react"
  ],
  "plugins": [
    "transform-class-properties"
  ]
}
```

Once we've done this,
we can use NPM to install `babel-preset-react` and `babel-plugin-transform-class-properties`
and then switch back to fat arrow methods.
Voila: everything works.

What's happening here is that
when Babel translates our sparkly modern JavaScript into old-fashioned JavaScript compatible with all browsers,
it reads `.babelrc` and obeys that configuration.
The settings above tell it to do everything React needs using the `transform-class-properties` plugin;
in particular,
to accept fat arrow method definitions and bind `this` correctly.
This works,
but is a form of madness:
something outside our program determines how that program is interpreted,
and the commands controlling it go in yet another configuration file.
Still,
it is a useful form of madness,
so we will press on.

## Models and Views {#s:interactive-models-views}

Well-designed applications separate models (which store data)
from views (which display it)
so that each can be tested and modified independently.
When we use React,
the models are typically classes,
and the views are typically pure functions.

To introduce this architecture,
let's re-implement the counter using:

- `App` to store the state and provide methods for altering it,
- `NumberDisplay` to display a number, and
- `UpAndDown` to provide buttons that increment and decrement that number.

The crucial design feature is that
`NumberDisplay` and `UpAndDown` don't know what they're displaying
or what actions are being taken on their behalf,
which makes them easier to re-use.
Of course,
no good deed goes unpunished.
The price that we pay
for organizing our application into separate components
is that now we must import the dependencies of each component
and export the component itself within each script.

After we've done this,
our dependencies will be bundled by parcel.
So we must remove the script loading from the HTML header.
The whole page is:

```html
<html>
  <head>
    <meta charset="utf-8">
    <title>Up and Down</title>
  </head>
  <body>
    <div id="app"></div>
    <script src="app.js"></script>
  </body>
</html>
```
{: title="interactive/multi-component/index.html"}

The `NumberDisplay` class takes a label and a value and puts them in a paragraph
(remember, the label and value will appear in our function as properties of the `props` parameter):

```js
const NumberDisplay = (props) => {
  return (<p>{props.label}: {props.value}</p>)
}
```
{: title="interactive/multi-component/NumberDisplay.js"}

Similarly,
`UpAndDown` expects two functions as its `up` and `down` properties,
and makes each the event handler for an appropriately-labelled button:

```js
const UpAndDown = (props) => {
  return (
    <p>
      <button onClick={props.up}> [+] </button>
      <button onClick={props.down}> [-] </button>
    </p>
  )
}
```
{: title="interactive/multi-component/UpAndDown.js"}

Both of these components will use React and ReactDOM when they are rendered
so we must import these.
We do this by adding import statements to the beginning of both components:

```js
import React from "react"
import ReactDOM from "react-dom"
```
{: title="interactive/multi-component/NumberDisplay.js"}

Similarly, our application will need to import the
`UpAndDown` and `NumberDisplay` components,
so we need to export them after they've been defined.
This is done by adding `export {<object_name>}` to the end of the
component script.
(We will explore why the curly braces are necessary in the exercises.)
After we've done this for `UpAndDown`,
the complete component script looks like this:

```js
import React from "react"
import ReactDOM from "react-dom"

const UpAndDown = (props) => {
  return (
    <p>
      <button onClick={props.up}> [+] </button>
      <button onClick={props.down}> [-] </button>
    </p>
  )
}

export {UpAndDown}
```

We are now ready to build the overall application.
It creates a `state` containing a counter
and defines methods to increment or decrement the counter's value.
Its `render` method then lays out the buttons and the current state
using those elements:

```js
class App extends React.Component {

  constructor (props) {
    super(props)
    this.state = {counter: 0}
  }

  increment = (event) => {
    this.setState({counter: this.state.counter + 1})
  }

  decrement = (event) => {
    this.setState({counter: this.state.counter - 1})
  }

  render = () => {
    return (
      <div>
        <UpAndDown up={this.increment} down={this.decrement} />
        <NumberDisplay label='counter' value={this.state.counter} />
      </div>
    )
  }
}
```
{: title="interactive/multi-component/app.js"}

<figure id="f:interactive-objects-dom"> <img src="../../files/interactive-objects-dom.svg" /> <figcaption>React Objects and the DOM</figcaption> </figure>

We must import the dependencies as we did with the other components.
As well as `React` and `ReactDOM`,
we need to include the components that we've written.
Dependencies stored locally can be imported by providing the path to
the file in which they are defined,
with the `.js` removed from the file name:

```js
import React from "react"
import ReactDOM from "react-dom"
import {UpAndDown} from "./UpAndDown"
import {NumberDisplay} from "./NumberDisplay"

// ...script body...
```

Finally,
we can render the application with `ReactDOM` as before:

```js
// ...script body...

const mount = document.getElementById("app")
ReactDOM.render(<App/>, mount)
```

This may seem pretty complicated,
and it is,
because this example would be much simpler to write without all this indirection.
However,
this strategy is widely used to manage large applications:
data and event handlers are defined in one class,
then passed into display components to be displayed and interacted with.

## Fetching Data {#s:interactive-fetching}

Let's use what we've learned to look at how the world might end.
NASA provides a web API to get information about near-approach asteroids.
We will use it to build a small display with:

- a text box for submitting a starting date (get one week by default), and
- a list of asteroids in that time period.

Here's the first version of our `App` class:

```js
import React from "react"
import ReactDOM from "react-dom"
import {AsteroidList} from "./AsteroidList"
import {DateSubmit} from "./DateSubmit"

class App extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      // ...fill in...
    }
  }

  onNewDate = (text) => {
    // ...fill in...
  }

  render = () => {
    return (
      <div>
        <DateSubmit newValue={this.onNewDate} />
        <AsteroidList asteroids={this.state.asteroids} />
      </div>
    )
  }
}

const mount = document.getElementById("app")
ReactDOM.render(<App/>, mount)
```
{: title="interactive/asteroids/app.js"}

We'll test it by displaying asteroids using fake data;
as in our first example,
the display component `AsteroidList` doesn't modify data,
but just displays it in a table:

```js
import React from "react"
import ReactDOM from "react-dom"

const AsteroidList = (props) => {
  return (
    <table>
      <tbody>
      <tr><th>Name</th><th>Date</th><th>Diameter (m)</th><th>Approach (km)</th></tr>
      {props.asteroids.map((a) => {
        return (
          <tr key={a.name}>
            <td>{a.name}</td>
            <td>{a.date}</td>
            <td>{a.diameter}</td>
            <td>{a.distance}</td>
          </tr>
        )
      })}
      </tbody>
    </table>
  )
}

export {AsteroidList}
```
{: title="interactive/asteroids/AsteroidList.js"}

`React` will complain if we don't provide a unique key
to distinguish elements that we create,
since having these keys helps it keep track of the component-to-DOM relationship,
which in turn [makes updates much more efficient][react-keys].
Since each asteroid's name is supposed to be unique,
we use that name as the key for each table row.

`AsteroidList` expects data to arrive in `props.asteroids`,
so let's put some made-up values in `App` for now
that we can then pass in:

```js
class App extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      asteroids: [
        {name: 'a30x1000', date: '2017-03-03', diameter: 30, distance: 1000},
        {name: 'a5x500', date: '2017-05-05', diameter: 5, distance: 500},
        {name: 'a2000x200', date: '2017-02-02', diameter: 2000, distance: 200}
      ]
    }
  }

  // ...other code...
}
```
{: title="interactive/asteroids/app.js"}

Let's also create a placeholder for `DateSubmit`:

```js
import React from "react"
import ReactDOM from "react-dom"

const DateSubmit = (props) => {
  return (<p>DateSubmit</p>)
}

export {DateSubmit}
```
{: title="interactive/asteroids/DateSubmit.js"}

<!-- == \noindent -->
and run it:

<figure id="f:interactive-asteroids-screenshot"> <img src="../../files/interactive-asteroids-screenshot.png" /> <figcaption>Asteroids Application</figcaption> </figure>

The next step is to handle date submission.
Since we're trying to instill good practices,
we will make a reusable component whose caller will pass in:

- a text label;
- a variable to update with the current value of a text box;
- a function to call when text box's value changes, and
- another function to call when a button is clicked to submit.

```js
// ...imports as before...

const DateSubmit = ({label, value, onChange, onCommit}) => {
  return (
    <p>
      {label}:
      <input type="text" value={value} onChange={(event) => onChange(event.target.value)} />
      <button onClick={(event) => onCommit(value)}>new</button>
    </p>
  )
}

// ...export as before...
```
{: title="interactive/asteroids/DateSubmit.js"}

Note the use of destructuring in `DateSubmit`'s parameter list;
this was introduced [earlier](../pages/#s:pages-citations)
and is an easy way to pull values out of the `props` parameter.

It's important to understand the order of operations in the example above.
`value={value}` puts a value in the input box to display each time `DateSubmit` is called.
We re-bind `onChange` and `onClick` to functions on each call as well
(remember, JSX gets translated into function calls).
So yes,
this whole paragraph is being re-created every time someone types,
but React and the browser work together to minimize recalculation.

Now let's go back and re-work our application:

```js
// ...imports as before...

class App extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      newDate: '',
      asteroids: [...]
    }
  }

  onEditNewDate = (text) => {
    this.setState({newDate: text})
  }

  onSubmitNewDate = (text) => {
    console.log(`new date ${text}`)
    this.setState({newDate: ''})
  }

  render = () => {
    return (
      <div>
        <h1>Asteroids</h1>
        <DateSubmit
          label='Date'
          value={this.state.newDate}
          onChange={this.onEditNewDate}
          onCommit={this.onSubmitNewDate} />
        <AsteroidList asteroids={this.state.asteroids} />
      </div>
    )
  }
}

// ...mount as before...
```
{: title="interactive/asteroids/app.js"}

It's safe to pass `this.state.newDate` to `value`
because we're re-drawing each time there's a change;
remember, we're passing a value for display,
not a reference to be modified.
And note that we are not doing any kind of validation:
the user could type `abc123` as a date
and we would blithely try to process it.

It's now time to get real data,
which we will do using `fetch` with a URL.
This returns a [promise](../promises/),
so we'll handle the result of the fetch in the promise's `then` method,
and then chain another `then` method to transform the data into what we need:

```js
  onSubmitNewDate = (text) => {
    const url = `https://api.nasa.gov/neo/rest/v1/feed?api_key=DEMO_KEY&start_date=${text}`
    fetch(url).then((response) => {
      return response.json()
    }).then((raw) => {
      const asteroids = this.transform(raw)
      this.setState({
        newDate: '',
        asteroids: asteroids
      })
    })
  }
```
{: title="interactive/asteroids/app.js"}

Line by line,
the steps are:

1. Build the URL for the data
2. Start to fetch data from that URL
3. Give a callback to execute when the data arrives
4. Give another callback to use when the data has been converted from text to JSON
   (which we will look at in more detail [soon](../dataman/)).
5. Transform that data from its raw form into the objects we need
6. Set state

Finally,
the method to transform the data NASA gives us is:

```js
  transform = (raw) => {
    let result = []
    for (let key in raw.near_earth_objects) {
      raw.near_earth_objects[key].forEach((asteroid) => {
        result.push({
          name: asteroid.name,
          date: asteroid.close_approach_data[0].close_approach_date,
          diameter: asteroid.estimated_diameter.meters.estimated_diameter_max,
          distance: asteroid.close_approach_data[0].miss_distance.kilometers
        })
      })
    }
    return result
  }
```
{: title="interactive/asteroids/app.js"}

We built this by looking at the structure of the JSON that NASA returned
and figuring out how to index the fields we need.
(Unfortunately,
the top level of `near_earth_objects` is an object with dates as keys rather than an array,
so we have to use `let...in...` rather than purely `map` or `forEach`.)

## Exercises {#s:interactive-exercises}

### Reset

Add a "reset" button to the counter application that always sets the counter's value to zero.
Does using it to wipe out every change you've made to the counter
feel like a metaphor for programming in general?

### Transform

Modify all of the examples *after* the introduction of Babel
to use external scripts rather than in-pace scripts.

### Exports

Are the curly braces necessary when exporting from a component file?
What happens if you remove them?
Read this [blogpost][es6-modules] and then consider whether it might
have been more appropriate to use default exports and imports
in the examples above.

### Validation

Modify the application so that if the starting date isn't valid when the button is clicked,
the application displays a warning message instead of fetching data.

1. Add a field called `validDate` to the state and initialize it to `true`.
2. Add an `ErrorMessage` component that displays a paragraph containing either "date OK" or "date invalid"
   depending on the value of `validDate`.
3. Modify `onSubmitNewDate` so that it *either* fetches new data *or* modifies `validDate`.

Once you are done,
search the Internet for React validation and error messages
and explore other tools you could use to do this.

{% include links.md %}
