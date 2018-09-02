---
permalink: "/en/interactive/"
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

- Browsers allow us to define [event handlers](#g:event-handler) to specify what to do in response to a user action
  - A callback function that is (usually) given an [event object](#g:event-object) containing information about what the user did
- Pass the callback function as a specifically-named property of the thing whose behavior we are specifying
- We'll switch back to single-page examples for a moment

```js
  <body>
    <div id="app">
      <!-- this is filled in -->
    </div>
    <script type="text/babel">
      let counter = 0;
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
{: title="src/interactive/hello-button.html"}

- Global variables and functions are a poor way to structure code
- Better to define the component as a class
  - And then use a method as the event handler

```js
<!DOCTYPE html>
<html>
  <head>
    <title>All-in-One Counter</title>
    <meta charset="utf-8">
    <script src="https://fb.me/react-15.0.1.js"></script>
    <script src="https://fb.me/react-dom-15.0.1.js"></script>
    <script src="https://unpkg.com/babel-standalone@6/babel.js"></script>
  </head>
  <body>
    <div id="app">
      <!-- this is filled in -->
    </div>
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
{: title="src/interactive/display-counter.html"}

- `ReactDOM.render` call at the end does what it always has
- Class has three parts
  1. Constructor passes the properties up to `React.Component`'s constructor
     and then creates a property called `state`
     that holds this component's state.
  2. The `increment` method uses `setState` (inherited from `React.Component`)
     to change the value of the counter.
     We *must* do this rather than creating and modifying `this.counter`
     so that React will notice the change in state
     and re-draw what it needs to.
  3. The `render` method takes the place of the functions we have been using so far.
     It can do anything it wants, but must return some HTML (using JSX).
     Here, it:
     - creates a button with an event handler
     - displays the current value of the counter
- React calls components' `render` methods after `setState` is used to update their state
  - It does some thinking behind the scenes to minimize how much redrawing takes place

## But It Doesn't Work {#s:interactive-babel}

- Try running from the command line with Parcel
  - `npm run dev -- src/interactive/display-counter.html`
  - Everything is happy
- But now try taking code out of web page and putting it in its own file

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Counter</title>
    <meta charset="utf-8">
    <script src="app.js" async></script>
  </head>
  <body>
    <div id="app"></div>
  </body>
</html>
```
{: title="src/interactive/counter/index.html"}

```js
import React from 'react'
import ReactDOM from 'react-dom'

class Counter extends React.Component {

  constructor (props) {
    ...as before...
  }

  increment = (event) => {
    this.setState({counter: this.state.counter+1})
  }

  render = () => {
    ...as before...
  }
}

ReactDOM.render(
  <Counter />,
  document.getElementById('app')
)
```
{: title="src/interactive/counter/app.js"}

- Run with `npm run dev -- src/interactive/counter/index.html`

```
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

- It seems that Parcel doesn't like fat arrow methods
  - React is still using ES6 JavaScript by default
  - And fat arrow methods weren't included in JavaScript at that point
- OK, so let's try using "normal" function-style method definitions in our script

```js
...imports as before...

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

...render as before...
```
{: title="src/interactive/counter-functions/app.js"}

- Parcel happily compiles this
- But clicking on the button doesn't change the display
  - Despair is once again our friend --- our *only* friend --- but we persevere
- Open the debugging console in the browser
  - `TypeError: this is undefined`
  - Because of some ill-considered choices early in JavaScript's development about scoping rules
- So: we can compile but not run, or not bundle files together
- But wait:
  - When we used an in-page script, we specified the type as `text/babel`
  - And loaded `https://unpkg.com/babel-standalone@6/babel.js` in the page header along with React
  - Can Babel save us?
- Yes, though it takes a fair bit of searching on the web to find this out
  - Particularly if you don't know what you're looking for
- Create a file in the project's root directory called `.babelrc` and add the following lines

```
{
  "presets": [
    "react"
  ],
  "plugins": [
    "transform-class-properties"
  ]
}
```

- Use NPM to install `babel-preset-react` and `babel-plugin-transform-class-properties`
- Switch back to fat arrow methods
- Run, and everything works
  - When Babel translates our JavaScript into old-fashioned JavaScript compatible with all browsers,
    it reads `.babelrc` and obeys that configuration
  - The settings above tell it to do everything React needs, and to transform things inside classes
  - In particular, accept fat arrow method definitions and bind `this` correctly
- This is madness
  - Something outside our program determines how that program is interpreted
  - The commands go in yet another configuration file
  - As fragile as the apparent constancy of cause and effect that we so naively call "reality"

## Models and Views {#s:interactive-models-views}

- Common practice to separate models (which store data) from views (which display it)
  - Models are typically classes
  - Views are typically pure functions
- Re-implement the counter using
  - `App`: stores the state and provides methods for altering it
  - `NumberDisplay`: does nothing except display a number
  - `UpAndDown`: provides buttons to go up and down
- Crucial design features: `NumberDisplay` and `UpAndDown` don't know:
  - What they're displaying
  - What actions are being taken on their behalf
  - So they're easier to re-use
- Again, we're cheating on the component loading

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Hello World</title>
    <meta charset="utf-8">
    <script src="https://fb.me/react-15.0.1.js"></script>
    <script src="https://fb.me/react-dom-15.0.1.js"></script>
    <script src="https://unpkg.com/babel-standalone@6/babel.js"></script>
    <script src="NumberDisplay.js" type="text/babel"></script>
    <script src="UpAndDown.js" type="text/babel"></script>
    <script src="app.js" type="text/babel"></script>
  </head>
  <body>
    <div id="app">
      <!-- this is filled in -->
    </div>
    <script type="text/babel">
      ReactDOM.render(
        <App />,
        document.getElementById("app")
      )
    </script>
  </body>
</html>
```
{: title="src/interactive/multi-component/index.html"}

```js
const NumberDisplay = (props) => {
  return (<p>{props.label}: {props.value}</p>)
}
```
{: title="src/interactive/multi-component/NumberDisplay.js"}

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
{: title="src/interactive/multi-component/UpAndDown.js"}

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
{: title="src/interactive/multi-component/app.js"}

FIXME-22: diagram

- This may seem pretty complicated
- Because it is, in this small example
- But this strategy is widely used to manage large applications
  - Data and event handlers are defined near the top
  - Then passed down for display components to use

## Fetching Data {#s:interactive-fetching}

- NASA provides a web API to get information about near-approach asteroids
- Build a small display with:
  - A text box for submitting a starting date (get one week by default)
  - A list of asteroids in that time period

- First version of `App`

```js
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
```
{: title="src/interactive/asteroids/app.js"}

- Start by displaying asteroids using fake data
  - A pure display component

```js
const AsteroidList = (props) => {
  return (
    <table>
      <tr><th>Name</th><th>Date</th><th>Diameter (m)</th><th>Approach (km)</th></tr>
      {props.asteroids.map((a) => {
        return (
          <tr>
            <td>{a.name}</td>
            <td>{a.date}</td>
            <td>{a.diameter}</td>
            <td>{a.distance}</td>
          </tr>
        )
      })}
    </table>
  )
}
```
{: title="src/interactive/asteroids/AsteroidList.js"}

- Go back and put fake data in `App` for now

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

  ...
}
```
{: title="src/interactive/asteroids/app.js"}

- Create placeholder for `DateSubmit`

```js
const DateSubmit = (props) => {
  return (<p>DateSubmit</p>)
}
```
{: title="src/interactive/asteroids/DateSubmit.js"}

- And run

FIXME-23: screenshot

- Handle date submission
  - Make the component reusable
- Caller will pass in:
  - Text label
  - Variable to update with current value of text box
  - Function to call when text box value changes
  - Function to call when button clicked to submit

```js
const DateSubmit = ({label, value, onChange, onCommit}) => {
  return (
    <p>
      {label}:
      <input type="text" value={value} onChange={(event) => onChange(event.target.value)} />
      <button onClick={(event) => onCommit(value)}>new</button>
    </p>
  )
}
```
{: title="src/interactive/asteroids/DateSubmit.js"}

- Note the use of [destructuring](#g:destructuring) in the parameter list
  - Suppose an object `directions` has the value `{left: 1, right: 2}`
  - The expression `{left, right} = directions` will create new variables `left` and `right` and assign them 1 and 2 respectively
    - The names of the new variables must match the names of the fields in the object
- Can use this when passing an object full of parameters to a function
  - Any "extra" names in the passed-in object are ignored
  - Any missing names are assigned `undefined`

- Important to understand order of operations
  - `value={value}` puts a value in the box for display
  - Binds `onChange` and `onClick` to functions each time
  - Remember, JSX gets translated into function calls
  - So yes, this is being re-created every time someone types
  - But React and the browser work together to minimize recalculation
- Now go back and re-work application

```js
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
```
{: title="src/interactive/asteroids/app.js"}

- Safe to pass `this.state.newDate` because we're re-drawing each time there's a change
  - Passing a value for display, not a reference to be modified
- Note that we are not doing any kind of validation (yet)

- Time to get real data
- Use `fetch` with a URL
- It returns a [promise](#g:promise)
  - JavaScript's newly-standardized way of making callbacks easier to work with
  - Although it practice it just seems to move the complexity around

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
{: title="src/interactive/asteroids/app.js"}

- Steps are:
  1. Build the URL for the data
  2. Start to fetch data from that URL
  3. Give a callback to execute when the data arrives
  4. Give another callback to use when the data has been converted from text to [JSON](#g:json)
  5. Transform that data from its raw form into the objects we need
  6. Set state
- Transformation is:

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
{: title="src/interactive/asteroids/app.js"}

- Look at the structure of the JSON
- Figure out how to index the fields we need
- Unfortunately, top level of `near_earth_objects` is an object with dates as keys
  - So we have to use `let...in...` rather than purely `map` or `forEach`

## Exercises {#s:interactive-exercises}

### Reset

Add a "reset" button to the counter application that always sets the counter's value to zero.
Does using it to wipe out every change you've made to the counter
feel like a metaphor for programming in general?

### Transform

Modify all of the examples *after* the introduction of Babel
to use external scripts rather than in-pace scripts.

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
