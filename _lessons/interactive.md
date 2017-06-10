---
layout: lesson
permalink: "/interactive/"
title: "Making Web Pages Interactive"
questions:
- FIXME
keypoints:
- FIXME
---

- Browsers allow us to define an [event handler]({{'/gloss/#event-handler'|absolute_url}}) to specify what to do in response to a user action
  - A callback function that is (usually) given an [event object]({{'/gloss/#event-object'|absolute_url}}) containing information about what the user did
- Pass the callback function as a specifically-named property of the thing whose behavior we are specifying
- We'll switch back to single-page examples for a moment

<!-- @src/interactive/hello-button.html -->
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

- Global variables and functions are a poor way to structure code
- Better to define the component as a class
  - And then use a method as the event handler

<!-- @src/interactive/display-counter.html -->
```js
      class Counter extends React.Component {

        constructor (props) {
          super(props)
          this.state = {counter: 0}
        }

        increment = (event) => {
          this.setState({counter: this.state.counter+1})
        }

        render() {
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
```

- `ReactDOM.render` call at the end does what it always has
- Class has three parts
  1. Constructor passes the properties up to `React.Component`'s constructor
     and then creates a member variable called `state`
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

## Models and Views

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

<!-- @src/interactive/multi-component/index.html -->
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

<!-- @src/interactive/multi-component/NumberDisplay.js -->
```js
const NumberDisplay = (props) => {
  return (<p>{props.label}: {props.value}</p>)
}
```

<!-- @src/interactive/multi-component/UpAndDown.js -->
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

<!-- @src/interactive/multi-component/app.js -->
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

FIXME: diagram

- This may seem pretty complicated
- Because it is, in this small example
- But this strategy is widely used to manage large applications
  - Data and event handlers are defined near the top
  - Then passed down for other components to use

## Fetching Data

- NASA provides a web API to get information about near-approach asteroids
- Build a small display with:
  - A text box for submitting a starting date (get one week by default)
  - A list of asteroids in that time period

- First version of `App`

<!-- @src/interactive/asteroids/app.js -->
```js
class App extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      // FIXME
    }
  }

  onNewDate = (text) => {
    // FIXME
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

- Start by displaying asteroids using fake data
  - A pure display component

<!-- @src/interactive/asteroids/AsteroidList.js -->
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

- Go back and put fake data in `App` for now

<!-- @src/interactive/asteroids/app.js -->
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

  …
}
```

- Create placeholder for `DateSubmit`

<!-- @src/interactive/asteroids/DateSubmit.js -->
```js
const DateSubmit = (props) => {
  return (<p>DateSubmit</p>)
}
```

- And run

FIXME: screenshot

- Handle date submission
  - Make the component reusable
- Caller will pass in:
  - Text label
  - Variable to update with current value of text box
  - Function to call when text box value changes
  - Function to call when button clicked to submit

<!-- @src/interactive/asteroids/DateSubmit.js -->
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

- Note the use of unpacking in the parameter list
  - FIXME: explain
- Important to understand order of operations
  - `value={value}` puts a value in the box for display
  - Binds `onChange` and `onClick` to functions each time
  - Remember, JSX gets translated into function calls
  - So yes, this is being re-created every time someone types
  - But React and the browser work together to minimize recalculation
- Now go back and re-work application

<!-- @src/interactive/asteroids/app.js -->
```js
class App extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      newDate: '',
      asteroids: […]
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

- Safe to pass `this.state.newDate` because we're re-drawing each time there's a change
  - Passing a value for display, not a reference to be modified
- Note that we are not doing any kind of validation (yet)

- Time to get real data
- Use `fetch` with a URL
- It returns a [promise]({{'/gloss/#promise'|absolute_url}})
  - JavaScript's newly-standardized way of making callbacks easier to work with
  - Although it practice it just seems to move the complexity around

<!-- @src/interactive/asteroids/app.js -->
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

- Steps are:
  1. Build the URL for the data
  2. Start to fetch data from that URL
  3. Give a callback to execute when the data arrives
  4. Give another callback to use when the data has been converted from text to JSON
  5. Transform that data from its raw form into the objects we need
  6. Set state
- Transformation is:

<!-- @src/interactive/asteroids/app.js -->
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

- Look at the structure of the JSON
- Figure out how to index the fields we need
- Unfortunately, top level of `near_earth_objects` is an object with dates as keys
  - So we have to use `let…in…` rather than purely `map` or `forEach`
