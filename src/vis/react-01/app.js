const vegaEmbed = require('vega-embed')

const spec = {
  "$schema": "https://vega.github.io/schema/vega-lite/v2.0.json",
  "description": "A simple bar chart with embedded data.",
  "data": {
    "values": [
      {"a": "A","b": 20}, {"a": "B","b": 34}, {"a": "C","b": 55},
      {"a": "D","b": 19}, {"a": "E","b": 40}, {"a": "F","b": 34},
      {"a": "G","b": 91}, {"a": "H","b": 78}, {"a": "I","b": 25}
    ]
  },
  "mark": "bar",
  "encoding": {
    "x": {"field": "a", "type": "ordinal"},
    "y": {"field": "b", "type": "quantitative"}
  }
}

const options = {
  "actions": {
    "export": false,
    "source": false,
    "editor": false
  }
}

vegaEmbed("#vis", spec, options)
