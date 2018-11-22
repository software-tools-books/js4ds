---
permalink: "/en/capstone/"
title: Capstone Project
questions:
- "How can I set up test data to use during development?"
- "What tests are most cost-effective when testing this kind of application?"
- "How should I present data to users?"
keypoints:
- "Use slices of actual data to test applications."
- "Test summaries and small cases so that results can be checked by hand."
- "Store state in a class, use pure functions to display it."
datasource: "https://figshare.com/articles/Portal_Project_Teaching_Database/1314459"
---

It's time to bring everything together in an extended example:
a (slightly) interactive visualization of species data from <{{page.datasource}}>.
Our plan is to:

- slice data for testing,
- write a data server to serve that data,
- test the server,
- build an interactive tabular display of our data, and
- add visualization.

This will require a few new ideas,
but will mostly recapitulate what's come before.

## Data Manager {#s:capstone-data}

The data manager is exactly [the one we built earlier](../data/).

## Server {#s:capstone-server}

The server is almost the same as [previous one](../server/):

```js
const express = require('express')
const bodyParser = require('body-parser')

// Main server object and database object.
// db is provided during load.
let db = null
const app = express()
app.use(bodyParser.json())

...handle actual queries...

module.exports = (databaseHandler) => {
  db = databaseHandler
  return app
}
```
{: title="src/capstone/back/server-0.js"}

The next step is to decide what our URLs will look like.
`GET /survey/stats` will get summary statistics as a single JSON record,
and `GET /survey/:start/:end` gets aggregate values for a range of years.
(We will add error checking on the year range as an exercise.)
Anything else will return a 404 error code and a snippet of HTML telling us we're bad people.
We will put this code in `server.js` and a command-line driver in `driver.js` for testability.
The server functions are:

```js
// Get survey statistics.
app.get('/survey/stats', (req, res, next) => {
  const data = db.getSurveyStats()
  res.status(200).json(data)
})

// Get a slice of the survey data.
app.get('/survey/:start/:end', (req, res, next) => {
  const start = parseInt(req.params.start)
  const end = parseInt(req.params.end)
  const data = db.getSurveyRange(start, end)
  res.status(200).json(data)
})

// Nothing else worked.
app.use((req, res, next) => {
  page = `<html><body><p>error: "${req.url}" not found</p></body></html>`
  res.status(404).send(page)
})
```
{: title="src/capstone/back/server-0.js"}

Now let's write our first test:

```js
  it('should return statistics about survey data', (done) => {
    expected = {
      minYear: 1979,
      maxYear: 2000,
      count: 10
    }
    const db = new DataManager('test-data.csv')
    request(server(db))
      .get('/survey/stats')
      .expect(200)
      .expect('Content-Type', 'application/json')
      .end((err, res) => {
        assert.deepEqual(res.body, expected, '')
        done()
      })
  })
```
{: title="src/capstone/back/test-server.js"}

Note that the range of years is 1979-2000,
which is *not* the range in the full dataset.

## The Display {#s:capstone-display}

The front end is a straightforward recapitulation of what we've done before.
There is a single HTML page called `index.html`:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Creatures</title>
    <meta charset="utf-8">
    <script src="app.js" async></script>
  </head>
  <body>
    <div id="app"></div>
  </body>
</html>
```
{: title="src/capstone/front/index.html"}

The main application in `app.js` imports components to display summary statistics,
choose a range of years,
and display annual data.
There is not usually such a close coupling between API calls and components,
but it's not a bad place to start.
Note that we are using `import` because we're trying to be modern,
even though the back end still needs `require`.

```
import React from 'react'
import ReactDOM from 'react-dom'
import SurveyStats from './SurveyStats'
import ChooseRange from './ChooseRange'
import DataDisplay from './DataDisplay'

class App extends React.Component {

  constructor (props) {
    // ...constructor...
  }

  componentDidMount = () => {
    // ...initialize...
  }

  onStart = (start) => {
    // ...update start year...
  }

  onEnd = (end) => {
    // ...update end year...
  }

  onNewRange = () => {
    // ...handle submission of year range...
  }

  render = () => {
    // ...render current application state...
  }
}

ReactDOM.render(
  <App />,
  document.getElementById("app")
)
```
{: title="src/capstone/back/app.js"}

The constructor defines URL for the data source and sets up the initial state,
which has summary data,
start and end years,
and data for those years:

```js
  constructor (props) {
    super(props)
    this.baseUrl = 'http://localhost:3418'
    this.state = {
      summary: null,
      start: '',
      end: '',
      data: null
    }
  }
```
{: title="src/capstone/back/app.js"}

We have to wait until our component has been mounted before we can fetch our summary data:
we can't do this in constructor because
we have no control over the order in which bits of display are initialized.
ON the upside,
we can use `response.json()` directly because we know the source is returning JSON data.
This method is the only place where the summary is updated,
since the data isn't changing underneath us:

```js
  componentDidMount = () => {
    const url = `${this.baseUrl}/survey/stats`
    fetch(url).then((response) => {
      return response.json()
    }).then((summary) => {
      this.setState({
        summary: summary
      })
    })
  }
```
{: title="src/capstone/back/app.js"}

Next up we need to handle typing in the "start" and "end" boxes.
The HTML controls in the web page will capture the characters without our help,
but we need those values in our state variables:

```js
  onStart = (start) => {
    this.setState({
      start: start
    })
  }

  onEnd = (end) => {
    this.setState({
      end: end
    })
  }
```
{: title="src/capstone/back/app.js"}

When the button is clicked,
we send a request for JSON data to the appropriate URL
and record the result in the application's state.
React will notice the state change and call `render` for us.
More precisely,
the browser will call the first `then` callback when the response arrives,
and the second `then` callback when the data has been converted to JSON.

```js
  onNewRange = () => {
    const params = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
    const url = `${this.baseUrl}/survey/${this.state.start}/${this.state.end}`
    fetch(url, params).then((response) => {
      return response.json()
    }).then((data) => {
      this.setState({
        data: data
      })
    })
  }
```
{: title="src/capstone/back/app.js"}

Now let's update the display with `SurveyStats`, `ChooseRange`, and `DataDisplay`,
which are all stateless components
(i.e., they display things but don't change anything):

```js
  render = () => {
    return (
      <div>
        <h1>Creatures</h1>
        <SurveyStats data={this.state.summary} />
        <ChooseRange
          start={this.state.start} onStart={this.onStart}
          end={this.state.end} onEnd={this.onEnd}
          onNewRange={this.onNewRange} />
        <DataDisplay data={this.state.data} />
      </div>
    )
  }
```
{: title="src/capstone/back/app.js"}

We will display survey stats as a table,
with a paragraph fallback when there's no data.
(Again, we need parentheses around the HTML fragment so that it will parse properly.)

```js
import React from 'react'

const SurveyStats = ({data}) => {
  if (data === null) {
    return (<p>no data</p>)
  }
  return (
    <table>
      <tbody>
        <tr><th>record count</th><td>{data.record_count}</td></tr>
        <tr><th>year low</th><td>{data.year_low}</td></tr>
        <tr><th>year high</th><td>{data.year_high}</td></tr>
      </tbody>
    </table>
  )
}

export default SurveyStats
```
{: title="src/capstone/front/SurveyStats.js"}

The other components are similar to those we have seen before.

## The Chart {#s:capstone-chart}

We initially tried using Vega-Lite directly for the chart,
but after a few failures and some googling,
we switched to `react-vega-lite`:
Vega-Lite's `vega-embed` wants to modify an existing DOM element when called,
while `react-vega-lite` constructs an element to be put in place at the right time,
which proved easier to use.
The steps are:

1. Create a paragraph placeholder if there's no data.
2. Re-organize the data into the form the chart needs.
3. Construct a spec like the ones we have seen before.
4. Create options to turn off the annoying links (also seen before).
5. Return an instance of the `VegaLite` component.

```js
import React from 'react'
import VegaLite from 'react-vega-lite'

const DataChart = ({data}) => {
  if (! data) {
    return (<p>no data</p>)
  }

  const values = data.map((rec) => ({x: rec.hindfoot_avg, y: rec.weight_avg}))
  let spec = {
    '$schema': 'https://vega.github.io/schema/vega-lite/v2.0.json',
    'description': 'Mean Weight vs Mean Hindfoot Length',
    'mark': 'point',
    'encoding': {
      'x': {'field': 'x', 'type': 'quantitative'},
      'y': {'field': 'y', 'type': 'quantitative'}
    }
  }
  let options = {
    'actions': {
      'export': false,
      'source': false,
      'editor': false
    }
  }
  let scatterData = {
    'values': values
  }
  return (<VegaLite spec={spec} data={scatterData} options={options}/>)
}

export default DataChart
```
{: title="src/capstone/front/DataChart.js"}

## Running It {#s:capstone-run}

FIXME: describe the parceling and how to run.

## Exercises {#s:capstone-exercises}

### Reporting Other Data

A user has asked for the number of male and female animals observed for each year.

1. Should you add this to the existing query for yearly data or create a new API call?
2. Implement your choice.

### Error Checking

1. Modify the server to return 400 with an error message
   if the range of years requested is invalid
2. Compare your implementation to someone else's.
   Did you define "invalid" in the same way?
   I.e., will your programs always return the same status codes for every query?

### Use All the Data

Create a database using all of the survey data and test the display.
What bugs or shortcomings do you notice compared to displaying test data?

### Merging Displays

The `SurveyStats` and `DataDisplay` components in the front end both display tables.

1. Write a new component `TableDisplay` that will display an arbitrary table
   given a list of column names
   and a list of objects which all have (at least) those fields.
2. Replace `SurveyStats` and `DataDisplay` with your new component.
3. Modify your component so that it generates a unique ID for each value in the table.
   (Hint: you may need to pass in a third parameter to each call
   to serve as the root or stem of those unique IDs.)

### Formatting

Modify `DataDisplay` to format fractional numbers with a single decimal place,
but leave the integers as they are.
Ask yourself why,
seven decades after the invention of digital computers,
this isn't easier.

### Data, Data Everywhere

Modify `DataChart` so that the word `data` isn't used in so many different ways.
Does doing this make you feel better about yourself as a person?
Modify it again so that the height and width of the chart are passed in as well.
Did that help?

{% include links.md %}
