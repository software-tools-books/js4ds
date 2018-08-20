---
permalink: "/en/viz/"
title: "Visualizing Data"
questions:
- "How can I visualize data on the web?"
keypoints:
- "D3 is a toolkit for building data visualizations."
- "Vega-Lite is a much simpler way to build common visualizations."
---

- Tables are great, but visualizations are often more effective
  - At least if they're well designed...
  - ...and your audience is sighted
- Many ways to visualize data in the browser
- This tutorial focuses on [Vega-Lite][vega-lite]
  - Declarative: specify data and settings, let the code take care of itself
  - Doesn't do everything, but does common things well and easily

## Drawing Options {#s:viz-options}

- Server-side generation of static images
- HTML `canvas` element
  - Element specifies drawing region
  - Use JavaScript commands to draw lines, place text, etc.
- [Scalable Vector Graphics](#g:svg) (SVG)
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
  - There is a special corner in Hell reserved for people who do this...

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

## Vega-Lite {#s:viz-vega-lite}

- Start by creating a skeleton web page to hold our visualization
- For now, load Vega, Vega-Lite and Vega-Embed from the web
  - Worry about local installation later
- Create a `div` to be filled in by the visualization
  - Don't have to give it the ID `vis`, but it's common to do so
- Leave a space for the script

```
<!DOCTYPE html>
<html>
<head>
  <title>Embedding Vega-Lite</title>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/vega/3.0.7/vega.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/vega-lite/2.0.1/vega-lite.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/vega-embed/3.0.0-rc7/vega-embed.js"></script>
</head>
<body>

  <div id="vis"></div>

  <script type="text/javascript">
  </script>
</body>
</html>
```
{: title="src/viz/vega-skeleton.html" }

- Fill in the script with the beginning of a visualization spec
  - `"$schema"` identifies the version of the spec being used
  - `"description"` is self-explanatory
  - `"data"` is the data
    - In this case, represent a two-dimensional data table as objects with explicit indices `"a"` and `"b"`
    - Because JSON doesn't have a native representation of two-dimensional arrays with row and column headers
    - Because programmers
- Then call `vegaEmbed` with:
  - The ID of the element that will hold the visualization
  - The spec
  - Some options (for now, we'll leave them empty)

```
    let spec = {
      "$schema": "https://vega.github.io/schema/vega-lite/v2.0.json",
      "description": "Create data array but do not display anything.",
      "data": {
        "values": [
          {"a": "A", "b": 28},
          {"a": "B", "b": 55},
          {"a": "C", "b": 43},
          {"a": "D", "b": 91},
          {"a": "E", "b": 81},
          {"a": "F", "b": 53},
          {"a": "G", "b": 19},
          {"a": "H", "b": 87},
          {"a": "I", "b": 52}
        ]
      }
    }
    vegaEmbed("#vis", spec, {})
```
{: title="src/viz/vega-values-only.html"}

- Open the page
  - Nothing appears
  - Because we haven't told Vega-Lite how to display the data
- Need:
  - `"mark"`: the visual element used to show the data
  - `"encoding"`: how values map to marks

```
    let spec = {
      "$schema": "https://vega.github.io/schema/vega-lite/v2.0.json",
      "description": "Add mark and encoding for data.",
      "data": {
        "values": [
          {"a": "A", "b": 28},
          {"a": "B", "b": 55},
          ...as before...
        ]
      },
      "mark": "bar",
      "encoding": {
        "x": {"field": "a", "type": "ordinal"},
        "y": {"field": "b", "type": "quantitative"}
      }
    }
    vegaEmbed("#vis", spec, {})
```
{: title="src/viz/vega-mark-encoding.html"}

- Open the page
  - There's the bar chart!
  - And poorly-styled links for various editing controls

<figure>
  <figcaption>Mark and Encoding</figcaption>
  <img id="f:viz-vega-mark-encoding" src="../../files/vega-mark-encoding.png" alt="Mark and Encoding" />
</figure>

- Use options to turn off those features

```
    let spec = {
      "$schema": "https://vega.github.io/schema/vega-lite/v2.0.json",
      "description": "Disable control links.",
      "data": {
        ...as before...
      }
    }
    let options = {
      "actions": {
        "export": false,
        "source": false,
        "editor": false
      }
    }
    vegaEmbed("#vis", spec, options)
```
{: title="src/viz/vega-disable-controls.html"}

<figure>
  <figcaption>Without Controls</figcaption>
  <img id="f:viz-vega-disable-controls" src="../../files/vega-disable-controls.png" alt="Without Controls" />
</figure>

- Vega-Lite has a *lot* of options
- For example, use points and average Y values
  - Change the X data so that values aren't distinct, because otherwise averaging doesn't do much
- `"x"` is now `"nominal"` instead of `"ordinal"`
- `"y"` has an extra property `"aggregate"` set to `"average"`

```
    let spec = {
      "$schema": "https://vega.github.io/schema/vega-lite/v2.0.json",
      "description": "Disable control links.",
      "data": {
        "values": [
          {"a": "P", "b": 19},
          {"a": "P", "b": 28},
          {"a": "P", "b": 91},
          {"a": "Q", "b": 55},
          {"a": "Q", "b": 81},
          {"a": "Q", "b": 87},
          {"a": "R", "b": 43},
          {"a": "R", "b": 52},
          {"a": "R", "b": 53}
        ]
      },
      "mark": "point",
      "encoding": {
        "x": {"field": "a", "type": "nominal"},
        "y": {"field": "b", "type": "quantitative", "aggregate": "average"}
      }
    }
    let options = {
      ...disable controls as before...
    }
    vegaEmbed("#vis", spec, options)
```
{: title="src/viz/vega-aggregate-points.html"}

<figure>
  <figcaption>Aggregating and Using Points</figcaption>
  <img id="f:viz-vega-aggregate-points" src="../../files/vega-aggregate-points.png" alt="Aggregating and Using Points" />
</figure>

## Local Installation {#s:viz-vega-local}

FIXME: explain how to install and use Vega-Lite locally

## Integration {#s:viz-vega-react}

FIXME: integrate Vega-Lite with React

## Exercises {#s:viz-exercises}

FIXME: visualization exercises

{% include links.md %}
