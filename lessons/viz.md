---
layout: page
permalink: "/viz/"
scripts:
- "https://cdnjs.cloudflare.com/ajax/libs/d3/4.9.1/d3.min.js"
---

## Introduction

- Tables are great, but visualizations are often more effective
  - At least if they're well designed…
  - …and your audience is sighted
- Instead of teaching a visualization package from the ground up, we will:
  - Go through a short tutorial on basic features of D3 visualization
  - Explore an example, making a list of questions
  - Go and find answers to those questions
  - Because that's often how people learn their way around actual software
- Example will be a cut-down version of one presented in *[Meeks2017](../refs/#meeks2017)*
  - Full code of original can be found in chapter 9 of [that book's GitHub repository](https://github.com/emeeks/d3_in_action_2/)

## SVG

- [Scalable Vector Graphics](../gloss/#svg) (SVG) is:
  - A way to represent stroke-based (vs. pixel-based) graphics
  - That uses the same kinds of tags as HTML
  - And can be rendered directly by modern browsers
- Create a root `svg` element as a drawing area
- Fill it with circles, rectangles, lines, text, etc.

```html
<svg width="400" height="300">
      
  <circle cx="100" cy="100" r="30" 
    fill="pink" stroke="red" stroke-width="2"/>
      
  <rect x="200" y="20" width="100" height="60"
    fill="lightblue"/>
      
  <line x1="300" y1="200" x2="400" y2="300"
    stroke="plum" stroke-width="5"/>
      
  <text x="50" y="200"
    font-family="serif" font-size="16">
    Hello World
  </text>

</svg>
```
{: title="src/viz/svg.html"}

- Don't have to break elements across lines as shown
  - But it makes the source easier to read
- Note that SVG's coordinate system starts in the upper left
  - There is a special corner in Hell reserved for people who do this…

<svg width="400" height="300" style="border: 1px solid black;">
      
  <circle cx="100" cy="100" r="30" 
    fill="pink" stroke="red" stroke-width="2"/>
      
  <rect x="200" y="20" width="100" height="60"
    fill="lightblue"/>
      
  <line x1="300" y1="200" x2="400" y2="300"
    stroke="plum" stroke-width="5"/>
      
  <text x="50" y="200"
    font-family="serif" font-size="16">
    Hello World
  </text>

</svg>

## Introducing D3

- [D3][d3] stands for "data-driven documents"
  - A toolkit for building visualizations, rather than a plotting library per se
- Start with a simple display of three circles

```html
<svg id="d3-svg" width="720" height="100" style="background-color: #00F0F0">
  <circle cx="40" cy="50" r="10"></circle>
  <circle cx="100" cy="50" r="10"></circle>
  <circle cx="160" cy="50" r="10"></circle>
</svg>
```
{: title="src/viz/d3-svg.html"}

<svg id="d3-svg" width="720" height="100" style="background-color: #00F0F0">
  <circle cx="40" cy="50" r="10"></circle>
  <circle cx="100" cy="50" r="10"></circle>
  <circle cx="160" cy="50" r="10"></circle>
</svg>

- Use `d3.select` to select
  - `.select('#d3-svg')` finds the element whose ID is `"d3-svg"`
    - Would normally use a name like `"graph"`
    - But we have several on this page that we need to distinguish
  - `.selectAll("circle")` finds all the elements of type `circle` within i
- Use `.style` and `.attr` to set the style and radius
  - Automatically works on every item of a collection

```html
<svg id="d3-function" width="720" height="100" style="background-color: #40F0F0">
  <circle cx="40" cy="50" r="10"></circle>
  <circle cx="100" cy="50" r="10"></circle>
  <circle cx="160" cy="50" r="10"></circle>
</svg>
<script type="text/javascript">
  circles = d3.select("#d3-function").selectAll("circle")
  circles.attr("cx", (d, i) => { return Math.random() * 720 })
</script>
```
{: title="src/viz/d3-function.html"}

<svg id="d3-function" width="720" height="100" style="background-color: #40F0F0">
  <circle cx="40" cy="50" r="10"></circle>
  <circle cx="100" cy="50" r="10"></circle>
  <circle cx="160" cy="50" r="10"></circle>
</svg>
<script type="text/javascript">
  circles = d3.select("#d3-function").selectAll("circle")
  circles.attr("cx", (d, i) => { return Math.random() * 720 })
</script>

- Methods like `.attr` take a callback of two parameters:
  - The data value associated with the item (which we haven't seen yet)
  - Its index in the collection
- Here, we set the center-x of each circle to a random value
  - Reload the page repeatedly to see them jump around

```html
<svg id="d3-data" width="720" height="100" style="background-color: #60F0F0">
  <circle></circle>
  <circle></circle>
  <circle></circle>
</svg>
<script type="text/javascript">
  circles = d3.select("#d3-data").selectAll("circle")
  circles.data([10, 20, 40])
  circles.attr("r", function(d, i) { return d })
  circles.attr("cx", function(d, i) { return 50 + i * 80 })
  circles.attr("cy", function(d, i) { return 50 })
</script>
```
{: title="src/viz/d3-data.html"}

<svg id="d3-data" width="720" height="100" style="background-color: #60F0F0">
  <circle></circle>
  <circle></circle>
  <circle></circle>
</svg>
<script type="text/javascript">
  circles = d3.select("#d3-data").selectAll("circle")
  circles.data([10, 20, 40])
  circles.attr("r", function(d, i) { return d })
  circles.attr("cx", function(d, i) { return 50 + i * 80 })
  circles.attr("cy", function(d, i) { return 50 })
</script>

- Bind the `circles` collection to a vector of data values
  - Data values and display items are zipped together in order
- Each display item's data value is passed into callbacks as first parameter
- Index comes in as second parameter
- So this code maps data to radius and index to X location

- And now some confusing terminology…
- When we bind data to display elements, D3 creates three sets:
  - The [update selection](../gloss/#update-selection) is the data that matches up with view elements
  - The [entry selection](../gloss/#entry-selection) is the "extra" data that does have view elements
  - The [exit selection](../gloss/#exit-selection) is the (redundant) view elements that don't have data
- We can add new view elements to match data in the entry selection
- And remove view elements in the exit selection

```js
<svg id="d3-entry" width="720" height="100" style="background-color: #80F0F0">
  <circle></circle>
  <circle></circle>
  <circle></circle>
</svg>
<script type="text/javascript">
  circles = d3.select("#d3-entry").selectAll("circle").data([10, 20, 40, 30, 25])
  circles.attr("r", function(d, i) { return d })
  circles.attr("cx", function(d, i) { return 50 + i * 80 })
  circles.attr("cy", function(d, i) { return 50 })

  let newEntries = circles.enter().append("circle")
  newEntries.attr("r", function(d, i) { return d })
  newEntries.attr("cx", function(d, i) { return 50 + (i * 80) })
  newEntries.attr("cy", function(d, i) { return 50 })
</script>
```
{: title="src/viz/d3-entry.html"}

<svg id="d3-entry" width="720" height="100" style="background-color: #80F0F0">
  <circle></circle>
  <circle></circle>
  <circle></circle>
</svg>
<script type="text/javascript">
  circles = d3.select("#d3-entry").selectAll("circle").data([10, 20, 40, 30, 25])
  circles.attr("r", function(d, i) { return d })
  circles.attr("cx", function(d, i) { return 50 + i * 80 })
  circles.attr("cy", function(d, i) { return 50 })

  let newEntries = circles.enter().append("circle")
  newEntries.attr("r", function(d, i) { return d })
  newEntries.attr("cx", function(d, i) { return 50 + (i * 80) })
  newEntries.attr("cy", function(d, i) { return 50 })
</script>

- First line of JavaScript:
  - Find the SVG element
  - Gather its circles
  - Bind data to that set
- Next three lines:
  - Set radius to data value
  - Space along X axis
- Next line:
  - Get the entry selection
  - Create new `circle` SVG elements for each of those values
  - These are appended to the parent of the selection set, because that's what's usually useful
- Then set properties of those circles
  - Exactly the same operations as the previous block of three lines
  - Should be refactored into a utility function of some sort

- Final form

```js
<svg id="d3-final" width="720" height="100" style="background-color: #80F0F0">
</svg>
<script type="text/javascript">
  const r = (d, i) => d
  const cx = (d, i) => 50 + (i * 80)
  const cy = (d, y) => 50
  const circles = d3.select("#d3-final").selectAll("circle").data([10, 20, 40, 30, 25])
  circles.attr("r", r).attr("cx", cx).attr("cy", cy)
  circles.enter().append("circle").attr("r", r).attr("cx", cx).attr("cy", cy)
</script>
```
{: title="src/viz/d3-final.html"}

<svg id="d3-final" width="720" height="100" style="background-color: #80F0F0">
</svg>
<script type="text/javascript">
  const r = (d, i) => d
  const cx = (d, i) => 50 + (i * 80)
  const cy = (d, y) => 50
  const circles = d3.select("#d3-final").selectAll("circle").data([10, 20, 40, 30, 25])
  circles.attr("r", r).attr("cx", cx).attr("cy", cy)
  circles.enter().append("circle").attr("r", r).attr("cx", cx).attr("cy", cy)
</script>

- Don't bother to create any circles to start with
  - But allow for their presence in case we're doing something interactive with changing data

## The Host HTML Page

- Knowing this much, take a look at the application
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
{: title="src/viz/index.html"}

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
{: title="src/viz/biomass.js"}

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
{: title="src/viz/app.js"}

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
{: title="src/viz/BarChart.js"}

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
- This leaves `scaleThreshold` and `legendColor`

{% include links.md %}
