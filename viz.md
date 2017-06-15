---
layout: page
permalink: "/viz/"
---

- Tables are great, but visualizations are often more effective
  - At least if they're well designed…
  - …and your audience is sighted
- Instead of teaching a visualization package from the ground up, we will explore an example from the outside in
  - Because that's often how people learn their way around actual software
- Example is a cut-down version of one presented in *[Meeks2017]('/refs/#meeks2017'|absolute_url)*
  - Full code of original can be found in chapter 9 of [this GitHub repository](https://github.com/emeeks/d3_in_action_2/)

## The Host HTML Page

- `index.html` creates a placeholder `div` to hold the visualization and loads `bundle.js`

<!-- @src/viz/index.html -->
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Biomass Decay</title>
  </head>
  <body>
    <h1>Biomass Decay</h1>
    <div id="root"></div>
    <script src="bundle.js"></script>
  </body>
</html>
```

## The Data

- Load a static data set from a file
- The data is JSON, which is JavaScript, so we will be able to `import` it directly into our application

<!-- @src/viz/biomass.js -->
```js
export default [
  {"day": 0, "biomass": 42.97795129978744},
  {"day": 1, "biomass": 44.93552823647418},
  {"day": 2, "biomass": 44.04674920020487},
  …
  {"day": 29, "biomass": 2.074051671494164},
  {"day": 30, "biomass": 0}
]
```

## The Main Application

- This is where things get complicated
  - Read the whole thing
  - Take note of things that don't make sense
  - Cross them off if something seen later clarifies what's happening

<!-- @src/viz/app.js -->
```js
// Imports
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { range } from 'd3-array'
import { scaleThreshold } from 'd3-scale'
import BarChart from './BarChart'
import biomass from './biomass'

// Color scale
const colorScale = scaleThreshold()
      .domain([5,10,20,30])
      .range(["#75739F", "#5EAFC6", "#41A368", "#93C464"])

class App extends Component {

  // Constructor
  constructor(props){
    super(props)
    this.state = {
      screenWidth: 1000,
      screenHeight: 500
    }
  }

  // Window resize
  onResize = () => {
    this.setState({
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight - 120
    })
  }

  componentDidMount() {
    window.addEventListener('resize', this.onResize, false)
    this.onResize()
  }

  // Rendering
  render() {
    const size = [this.state.screenWidth / 2, this.state.screenHeight / 2]
    return (
      <div className="App">
        <BarChart
          colorScale={colorScale}
          data={biomass}
          size={size} />
      </div>
    )
  }
}

// Connecting the wires
ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```

### Imports

- The first two are our React friends
- The last two are the bar chart and the data set
- The two in the middle are coming from `d3-something`
- Quick web search tells us that D3 is a visualization library
  - Apparently a pretty popular one

### Color Scale

- The name suggests it sets colors for the bar chart
- But nothing else about it makes sense right now
- Do *not* dive in
- Keep doing surface reading and come back later (!)

### Constructor

- A React component class
- Initial state is screen size (presumably in pixels)

### Window Resize

- Name `onResize` suggests that it takes care of re-drawing when the window size changes
- It's an arrow function
  - Because we need `this` to refer to the component
  - See the discussion of [legacy function definitions]({{'/legacy/#prototypes'|absolute_url}})
- The variable `window` seems to appear out of nowhere (!)
  - But presumably refers to the window the application is running in
- That magic number 120 should worry us…

- `componentDidMount` is called after component has been fully initialized and placed in the DOM
- This one adds an event listener
  - `'resize'` specifies the type of event to listen for
  - `this.onResize` tells the browser what to do
  - Don't know what `false` is for (!)
- `componentDidMount` then calls `onResize` explicitly

### Rendering

- Get the window size from the state
- Create a `div` containing a bar chart
- Pass in the color scale, the data, and the window size

### Connecting the Wires

- We've seen this before…
