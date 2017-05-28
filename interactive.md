---
layout: page
permalink: "/react/"
title: "Making Web Pages Interactive"
---

> **Questions**
>
> - FIXME

- Browsers allow us to define an _event handler_ to specify what to do in response to a user action
  - A callback function that is (usually) given an _event object_ containing information about what the user did
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
