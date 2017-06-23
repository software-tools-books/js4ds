---
layout: page
permalink: "/viz/"
---

## Introduction

- Tables are great, but visualizations are often more effective
  - At least if they're well designed…
  - …and your audience is sighted
- Instead of teaching a visualization package from the ground up, we will explore an example from the outside in
  - Because that's often how people learn their way around actual software
- Example is a cut-down version of one presented in *[Meeks2017](../refs/#meeks2017)*
  - Full code of original can be found in chapter 9 of [this GitHub repository](https://github.com/emeeks/d3_in_action_2/)

## The Host HTML Page

- `index.html` creates a placeholder `div` to hold the visualization and loads `bundle.js`

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
{: data-toggle="tooltip" title="src/viz/index.html"}

## The Data

- Load a static data set from a file
- The data is JSON, which is JavaScript, so we will be able to `import` it directly into our application

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
{: data-toggle="tooltip" title="src/viz/biomass.js"}

## The Main Application

- This is where things get complicated
  - Read the whole thing
  - Take note of things that don't make sense
  - Cross them off if something seen later clarifies what's happening

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
{: data-toggle="tooltip" title="src/viz/app.js"}

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
  - See the discussion of [legacy function definitions](../legacy/#prototypes)
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

## Bar Chart

- Again, read end-to-end and take notes, then come back and answer questions

```js
// Imports
import React, { Component } from 'react'
import { scaleLinear } from 'd3-scale'
import { max, sum } from 'd3-array'
import { select } from 'd3-selection'
import { legendColor } from 'd3-svg-legend'
import { transition } from 'd3-transition'

class BarChart extends Component {

  // Constructor and lifecycle methods
  constructor(props){
    super(props)
  }

  componentDidMount = () => {
    this.createBarChart()
  }

  componentDidUpdate = () => {
    this.createBarChart()
  }

  createBarChart = () => {

    // Useful variables
    const dataMax = max(this.props.data.map(d => d.biomass))
    const [xSize, ySize] = this.props.size
    const barWidth = xSize / this.props.data.length

    const legend = legendColor()
      .scale(this.props.colorScale)
      .labels(["Moult 1", "Moult 2", "Moult 3", "Moult 4"])

    // Legend
    select(this.node)
      .selectAll("g.legend")
      .data([0])
      .enter()
      .append("g")
      .attr("class", "legend")
      .call(legend)

    select(this.node)
      .select("g.legend")
      .attr("transform", "translate(" + (xSize - 100) + ", 20)")

    // Y-axis scale
    const yScale = scaleLinear()
      .domain([0, dataMax])
      .range([0, ySize])

    // Data entry
    select(this.node)
      .selectAll("rect.bar")
      .data(this.props.data)
      .enter()
      .append("rect")
      .attr("class", "bar")

    // Data exit
    select(this.node)
      .selectAll("rect.bar")
      .data(this.props.data)
      .exit()
      .remove()

    // Creating the chart
    select(this.node)
      .selectAll("rect.bar")
      .data(this.props.data)
      .attr("x", (d, i) => i * barWidth)
      .attr("y", d => ySize - yScale(d.biomass))
      .attr("height", d => yScale(d.biomass))
      .attr("width", barWidth)
      .style("fill", (d, i) => this.props.colorScale(d.day))
      .style("stroke", "black")
      .style("stroke-opacity", 0.25)
  }

  // Rendering
  render() {
    const [xSize, ySize] = this.props.size
    return <svg ref={(node) => {this.node = node}} width={xSize} height={ySize}></svg>
  }
}

export default BarChart
```
{: data-toggle="tooltip" title="src/viz/BarChart.js"}

### Imports

- Some React and then a bunch of D3 stuff

### Constructor and Lifecycle Methods

- Constructor doesn't do anything special
- Re-draw the bar chart when the component is mounted and every time it's updated
- Why are these fat arrow functions? (!)

### Useful Variables

- `createBarChart` is clearly where most of the work is done
- Finds the largest value that's going to be plotted
- Creates temporary local variables for the rendering area size
- Calculates the width of the bars

### Legend

- Then creates a legend
  - `legendColor` comes from D3
  - Uses the color scale defined in `App.js`
  - And sets the labels
  - So take a look at `legendColor` when we look at `scaleThreshold` (!)
- Setting the labels here makes it single-purpose
  - Should pass in the labels from the outside as a property
- What does `select(this.node)` do?
  - And where did `this.node` come from? (!)
  - Not created in constructor
- What are `.data([0])` and `.enter()` and `.append("g")`? (!)
- Definitely need to read up on this

### Y-axis Scale

- Seems much simpler
- Create a linear scale…
- …then set its domain and range based on the data
- Domain is the spread of data values, while range is the screen size
- Search down, see it's used in displaying the data

### Data Entry

- This is confusing
- Again, `select(this.node)`
- What is `"rect.bar"` and why are we selecting all of it (or them)?
- We seem to provide or connect to data with `.data(this.props.data)`
- But `.enter()` and the rest don't make a lot of sense
- On the other hand, `.append("rect") and `.attr("class", "bar")` might explain `"rect.bar"`

### Creating the Chart

- This is the least confusing section, since it does the things we thought we needed to do
- Set the X and Y attributes using functions that map entries to values
- Note that the functions for the X attribute and the fill style have two parameters `d` (the data) and `i`
  - Presumably `i` is the index
  - Because the callback taken by `map` passes in the index as well as the value

### Rendering

- Creates an SVG element
  - FIXME: explain SVG
- The `ref` property is a React-ism
  - Is given the actual DOM node
  - It sets `this.node`, so that's one mystery cleared up

## Mysteries

- The variable `window` is automatically provided by JavaScript
  - That was easy
- The extra `false` parameter to the event listener specifies whether the event should be handled in the capture or bubbling phase
  - "Capturing" means "on the way down the DOM tree"
  - "Bubbling" means "on the way up"
  - According to [this tutorial](https://javascript.info/bubbling-and-capturing), almost all events are handled during bubbling
- Why the lifecycle methods are fat arrow functions
  - Switch them and run it
  - Works just fine
  - So leave them as old-style functions
- This leaves:
  - `scaleThreshold` and `legendColor`
  - The chart-drawing stuff: `.data([0])`, `.enter()`, and so on

{% include links.md %}
