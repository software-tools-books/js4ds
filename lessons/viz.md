---
layout: page
permalink: "/viz/"
---

## Introduction

- Tables are great, but visualizations are often more effective
  - At least if they're well designed…
  - …and your audience is sighted
- Many ways to do data visualization in the browser
- Unfortunately, none "just work" for this tutorial's audience

## Drawing Options

- Server-side generation of static images
- HTML `canvas` element
  - Element specifies drawing region
  - Use JavaScript commands to draw lines, place text, etc.
- [Scalable Vector Graphics](../gloss/#svg) (SVG)
  - Represent stroke-based graphics using the same kinds of tags as HTML
  - Can be rendered by many applications (not just browsers)

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

## D3 and Why Not

- [D3]({{site.data.links.d3}}) is a toolkit for building visualizations, rather than a plotting library per se
- A powerful but complicated model for reflecting data updates in graphical elements
- Many efforts to build React libraries on top of it
  - [React-d3]({{site.data.links.reactd3}})
  - [Recharts]({{site.data.links.recharts}})
  - [Vx]({{site.data.links.vx}})
- As of July 2017, none of them finished enough for novice use
  - Documentation lacking
  - Missing features
- Hope that will change in time for the next version of this tutorial

## Chart.js

- A more established JavaScript visualization library that is simpler than D3
  - Uses `canvas` instead of SVG
  - Still has gaps and oddities (two of which are discussed below)
- First demo loads Chart.js from the web along with our own visualization, then creates a 600×400 canvas for it to fill in

```html
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Scatter Chart</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.6.0/Chart.bundle.js"></script>
    <script src="./scatter.js"></script>
  </head>
  <body>
    <div>
      <canvas id="canvas" width="600" height="400"></canvas>
    </div>
  </body>
</html>
```
{: title="src/viz/scatter.html"}

- Visualization has three parts
- Data must have a key `datasets` which is a list of data sets
  - For a scatter plot, the data is (x,y) pairs
  - Each data set has a label, some options, and an array of data
  - We must turn off filling and tell Chart.js not to connect our points with a line (which is daft)
- Options all have defaults
  - We override the title and tell the chart *not* to be responsive
  - If it *is* responsive, it resizes to fill all the available space
- Finally, when the page has loaded, we:
  - Find the canvas
  - Create the scatter plot

```js
const data = {
  datasets: [{
    label: 'Random Data',
    fill: false,
    showLine: false,
    borderColor: 'rgba(128, 128, 192, 1)',
    backgroundColor: 'rgba(128, 128, 192, 0.5)',
    data: Array.from(Array(20), () => {return {x: Math.random(), y: Math.random()}})
  }]
}

const options = {
  title: {
    display: true,
    text: 'Example Scatter Chart'
  },
  responsive: false
}

window.onload = function() {
  const canvas = document.getElementById('canvas')
  const scatter = Chart.Scatter(canvas, {
    data: data,
    options: options
  })
}
```
{: title="src/viz/scatter.js"}

## Combining with React

- Use `npm run dev -- --context src/viz` to bundle JavaScript files with WebPack

