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

This will require some new ideas,
but will mostly recapitulate what's come before.

## Slicing Data {#s:capstone-slicing}

The data we want to serve is available in a variety of formats from <{{page.datasource}}>.
We will focus for now on `surveys.csv`,
which has over 35,500 records.
That's a lot to process,
so our first step is to create a 1000-record slice for testing.
It would be easy to take the first 1000,
or the last,
but the odds are good that neither would be representative of the data as a whole.
Instead,
we will write a little script that selects N records at random.
This doesn't need to be efficient,
so we will read the whole dataset,
pair each record with a random number,
sort,
take the first N records,
concatenate them,
and print that out:

```js
const fs = require('fs')

const [inputFile, numLines, outputFile] = process.argv.splice(2)
const sample = fs.readFileSync(inputFile, 'utf-8')
    .split('\n')
    .map(line => [Math.random(), line])
    .sort((left, right) => { return left[0] < right[0] ? -1 : 1 })
    .slice(0, parseInt(numLines))
    .map(pair => pair[1])
fs.writeFileSync(outputFile, sample.join('\n'))
```
{: title="src/capstone/back/select-random.js"}

## Data Manager {#s:capstone-data}

Rather than putting the logic to handle the data in the server,
we will create a separate class that can read in a CSV file
and answer two questions:

1. How many records do we have and what range of years do they cover?
2. What are the minimum, average, and maximum values for weight and hindfoot length by year
   for a given range of years?

We will use Papa Parse to parse our CSV,
so we start with this:

```sh
npm install papaparse
```

## Server {#s:capstone-server}

- Implementation is almost the same as [previous server](../server/)
  - For some version of "almost"...
- Use `bodyParser` because we're always serving JSON
- Use `express-winston` to log all requests

```js
const express = require('express')
const bodyParser = require('body-parser')
const winston = require('winston')
const expressWinston = require('express-winston')

// Main server object and database object.
// db is provided during load.
let db = null
const app = express()
app.use(bodyParser.json())

// Set up logging.
app.use(expressWinston.logger({
  transports: [
    new winston.transports.Console({
      json: false,
      colorize: true
    })
  ],
  meta: false,
  msg: "HTTP {{res.statusCode}} {{req.method}} {{req.url}}"
}))

...handle actual queries...
```
{: title="src/capstone/back/server-0.js"}

- `GET /survey/stats` gets summary statistics as a single JSON record
- `GET /survey/:start/:end` gets aggregate values for a range of years
  - Add error checking on the year range as an exercise
- Anything else returns a 404
- Put this code in `server.js` and a command-line driver in `driver.js` for testability

- Test using sliced data
- First test: are the stats right?
  - Inspect sliced data to figure out correct result
  - In retrospect, choosing 100 records instead of 1000 would have made sense

```js
  it('should return statistics about survey data', (done) => {
    expected = {
      year_low: 1977,
      year_high: 2002,
      record_count: 1000
    }
    const db = new Database('memory', TEST_DATA_PATH)
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

- Second test: shouldn't get anything for years before 1970
  - When better error handling introduced as exercise, this test will need to be updated
  - See the source
- Third test: gets the right data for one year
  - Have to inspect the data and do some calculations
  - Again, a smaller data set would probably have been just as useful
  - See the source

- Fourth test: get as many records as expected

```js
  it('should return one record for each year when given the whole date range', (done) => {
    const db = new Database('memory', TEST_DATA_PATH)
    yearLow = 1977
    yearHigh = 2002
    request(server(db))
      .get(`/survey/${yearLow}/${yearHigh}`)
      .expect(200)
      .expect('Content-Type', 'application/json')
      .end((err, res) => {
        assert.equal(res.body.length, (yearHigh - yearLow) + 1, 'Got expected number of records')
        done()
      })
  })
```
{: title="src/capstone/back/test-server.js"}

- Note the parameterization of `yearLow` and `yearHigh` and the calculation of the expected number of records
- Note also the use of `assert.equal`
  - Could use `assert(res.body.length == expectedValue, ...)`
  - But then error message would just be `false != true`

## The Display {#s:capstone-display}

- Front end is a straightforward recapitulation of what we've done before
- A single HTML page `index.html`

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

- A main application in `app.js`
- Imports components to:
  - Display summary statistics
  - Choose a range of years
  - Display annual data
- Not always such a close coupling between API calls and components...
- ...but not a bad place to start
- Note: using `import` because we're trying to be modern, even though the back end still needs `require`

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

- Constructor defines URL for data source and sets up initial state
  - Summary data
  - Start and end years
  - Data for those years

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

- Fetch summary data when the component has mounted
  - Can't do this in constructor because we have no control over the order in which bits of display are initialized
- `response.json()` works because we know the source is returning JSON data
- This is the only place where the summary is updated

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

- Handle typing in the "start" and "end" boxes
  - HTML controls will capture the characters without our help
  - But we need those values in our state variables

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

- When the button clicked:
  - Send a request for JSON data to the appropriate URL
  - Record the result in the application's state
- React will notice the state change and call `render` for us
  - More precisely, the browser will call the first `then` callback when the response arrives...
  - ...and the second `then` callback when the data has been converted to JSON
- FIXME: convert this code to `async`/`await`

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

- Update the display
  - `SurveyStats`, `ChooseRange`, and `DataDisplay` are all stateless (display) components

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

- Display survey stats as a table
  - With a paragraph fallback when there's no data
  - Again, need parentheses around the HTML fragment so that it will parse properly

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

- Other components similar to those seen before

## The Chart {#s:capstone-chart}

- Use `react-vega-lite` for the chart component
  - `vega-embed` wants to modify an existing DOM element when called
  - `react-vega-lite` constructs an element to be put in place at the right time
- Steps:
  - Paragraph placeholder if there's no data
  - Re-organize the data into the form the chart needs
  - Construct a spec like the ones seen before
  - Create options (also seen before)
  - Return an instance of the `VegaLite` component

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

## Exercises {#s:capstone-exercises}

### Selecting Random Data

FIXME: we might select the header row!

### Reporting Other Data

A user has asked for the number of male and female animals observed for each year.

1. Should you add this to the existing query for yearly data
   or create a new API call?
2. Implement your choice.

### One Record Per Year

Another way to slice the data for testing purposes is to select one record from each year.
This is tricky to do with SQL,
but straightforward to do with a little bit of JavaScript.
Write a small command-line JavaScript program that:

1. Reads all the data from the database.
2. Keeps the first record it finds for each year.
3. Prints these records formatted as SQL `insert` statements.

### Error Checking

HTTP defines many [status codes](#g:http-status-code)
that servers should return to tell clients what went wrong.

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
