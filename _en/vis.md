---
permalink: "/en/vis/"
title: "Visualizing Data"
questions:
- "How can I visualize data on the web?"
- "How does loading libraries in the browser differ from loading them on the server?"
keypoints:
- "Vega-Lite is a simple way to build common visualizations."
- "Vega-Lite is declarative: the user creates a data structure describing what they want, and the library creates the visualization."
- "A Vega-List specification contains a schema identifier, a description, data, marks, and encodings."
- "The overall layout of a Vega-Lite visualization can be controlled by setting options."
- "Some applications will use `require` for server-side code and `import` for client-side code."
---

Tables are great, but visualizations are often more effective---if
they're well designed and your audience is sighted, that is.
There are even more ways to visualize data in the browser
than there are front-end toolkits for JavaScript.
We have chosen to use [Vega-Lite][vega-lite],
which is a [declarative](../gloss/#g:declarative-programming) framework:
as a user,
you specify the data and settings,
and let the library take care of everything else.
It doesn't do everything,
but it does common things well and easily,
and it interacts nicely with React.

## Vega-Lite {#s:vis-vega-lite}

Let's start by creating a skeleton web page to hold our visualization.
For now, we will load Vega, Vega-Lite, and Vega-Embed from the web;
we'll worry about local installation later.
We will create a `div` to be filled in by the visualization---we
don't have to give it the ID `vis`, but it's common to do so---ad
we will leave space for the script.
Our skeleton looks like this:

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

We can now start filling in the script with the beginning of a visualization specification.
This is a blob of [JSON](../gloss/#g:json) with certain required fields:

- `$schema` identifies the version of the spec being used (as a URL).
- `description` is a comment to remind us what we thought we were doing when we created this.
- `data` is the actual data.

In this case,
we represent a two-dimensional data table as objects with explicit indices `"a"` and `"b"`.
We have to do this because JSON (like JavaScript) doesn't have a native representation
of two-dimensional arrays with row and column headers,
because programmers.

Once we have created our spec,
we can call `vegaEmbed` with the ID of the element that will hold the visualization,
the spec,
and some options (which for now we will leave empty):

```
    let spec = {
      "$schema": "https://vega.github.io/schema/vega-lite/v2.0.json",
      "description": "Create data array but do not display anything.",
      "data": {
        "values": [
          ...as above...
        ]
      }
    }
    vegaEmbed("#vis", spec, {})
```
{: title="src/viz/vega-values-only.html"}

When we open the page, though, nothing appears,
because we haven't told Vega-Lite *how* to display the data.
To do that,
we need to add two more fields to the spec:

- `mark` specifies the visual element used to show the data
- `encoding` tells Vega how to map values to marks

Here's our updated spec:

```
    let spec = {
      "$schema": "https://vega.github.io/schema/vega-lite/v2.0.json",
      "description": "Add mark and encoding for data.",
      "data": {
        "values": [
          ...as above...
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

When we open the page now,
we see a bar chart,
and feel very proud of ourselves.

<figure id="f:vis-mark-encoding">
  <figcaption>Mark and Encoding</figcaption>
  <img src="../../files/vis-mark-encoding.png" />
</figure>

There are also some poorly-styled links for various controls that we're not going to use.
We can fill in the options argument to `vegaEmbed` to turn those off:

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

We now have the visualization we wanted:

<figure id="f:vis-disable-controls">
  <figcaption>Without Controls</figcaption>
<<<<<<< HEAD
  <img src="../../files/vis-disable-controls.png" />
=======
  <img id="f:vis-disable-controls" src="../../files/vis-disable-controls.png" alt="Without Controls" />
>>>>>>> master
</figure>

Vega-Lite has a *lot* of options:
for example,
we can use points and average the Y values.
(We will change the X data so that values aren't distinct in order to show this off,
because otherwise averaging doesn't do much.)
In our revised spec,
`x` is now `"nominal"` instead of `"ordinal"`
and `y` has an extra property `"aggregate"`,
which is set to `"average"`:

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

<figure id="f:vis-aggregate-points">
  <figcaption>Aggregating and Using Points</figcaption>
<<<<<<< HEAD
  <img src="../../files/vis-aggregate-points.png" />
=======
  <img id="f:vis-aggregate-points" src="../../files/vis-aggregate-points.png" alt="Aggregating and Using Points" />
>>>>>>> master
</figure>

## Local Installation {#s:vis-vega-local}

Loading Vega from a [Content Delivery Network](../gloss/#g:cdn) (CDN) reduces the load on our server,
but prevents offline development.
Since we want to be able to work when we're disconnected,
let's load from local files.

Step 1 is to slim down our HTML file so that it only loads our application:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Load Vega from a File</title>
    <meta charset="utf-8">
    <script src="app.js" async></script>
  </head>
  <body>
    <div id="vis"></div>
  </body>
</html>
```
{: title="src/vis/react-01/index.html"}

In step 2,
we `npm install vega vega-lite vega-embed` and `require('vega-embed')` in `app.js`:

```js
const vegaEmbed = require('vega-embed')

const spec = {
  ...as before...
}

const options = {
  ...as before...
}

vegaEmbed("#vis", spec, options)
```
{: title="src/vis/react-01/app.js"}

We launch this with Parcel via our saved `npm run` command:

```sh
npm run dev -- src/vis/react-01/index.html
```

But nothing appears when we open `http://localhost:4000` in our browser.
Looking in the browser console,
we see a message telling us that `vegaEmbed` is not a function.

What we have tripped over is something that's still painful in 2018.
The old method of getting libraries is `require`,
and that's still what Node supports as of Version 10.9.0.
The new standard is `import`,
which allows a module to define a default value so that `import 'something'` gets a function, a class, or whatever.
This is really handy, but `require` doesn't work that way.

Using Node on the command line, we can either add the `--experimental-modules` flag
or rename our files with a `.mjs` extension,
both of which are annoying.
Alternatively,
we can get the thing we want by accessing `.default` during import,
or by referring to `vegaEmbed.default` when we call it.
These choices are also annoying,
but after a bit of fiddling and cursing,
we decide to make the fix as the library is loaded:

```
const vegaEmbed = require('vega-embed').default

...everything else as before...
```
{: title="src/vis/react-02/app.js"}

The third option is to use `import` where we can
and fix the `require` statements in the server-side code when Node is upgraded.
We can call the thing we import anything we want,
but we will stick to `vegaEmbed` for consistency with previous examples:

```js
import vegaEmbed from 'vega-embed'

...everything else as before...
```
{: title="src/vis/react-02/app.js"}

If we do this,
the bundled file is 74.5K lines of JavaScript,
but at least it's all in one place for distribution.

## Exercises {#s:vis-exercises}

### Binned Scatterplots

Vega-Lite can create
[binned scatterplots](https://vega.github.io/vega-lite/examples/circle_binned.html)
in which the sizes of markers indicate how many values were put in each bin.
Modify the aggregating scatterplot shown above
so that values are binned in this way.

### Grouped Bar Charts

Vega-Lite can display
[grouped bar charts](https://vega.github.io/vega-lite/examples/bar_grouped.html)
as well as simple ones.
Find or create a simple data set and construct a grouped bar chart.
How impressed will your supervisor, your committee, or a future employee be
by your chosen color scheme?

### Limits of Declarative Programming

Look at Vega-Lite's
[example gallery](https://vega.github.io/vega-lite/examples/)
and identify one kind of plot or transformation you've used or seen
that *isn't* included there.
Do you think this is because they just haven't gotten around to it yet,
or is there something about that plot or transformation
that doesn't lend itself to Vega-Lite's declarative model?

### Working With Arrays

Vega-Lite is built on top of a visualization toolkit called [D3][d3],
which includes [a library for manipulating arrays][d3-array].
Write a small application that generates 1000 random values using `Math.random`
and reports the mean, standard deviation, and quartiles.
(You may also want to create a histogram showing the distribution of values.)

{% include links.md %}
