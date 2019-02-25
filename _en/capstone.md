---
title: "Capstone Project"
questions:
- "How can I set up test data to use during development?"
- "What tests are most cost-effective when testing this kind of application?"
- "How should I present data to users?"
keypoints:
- "Use slices of actual data to test applications."
- "Test summaries and small cases so that results can be checked by hand."
- "Store state in a class, use pure functions to display it."
---

It's time to bring everything together in an extended example:
a (slightly) interactive visualization of species data from <{{site.datasource}}>.
Our plan is to:

- slice data for testing,
- write a data server to serve that data,
- test the server,
- build an interactive tabular display of our data, and
- add visualization.

This will require a few new ideas,
but will mostly recapitulate what's come before.

## Data Manager {#s:capstone-data}

The data manager is exactly the same as the one we built in [s:dataman](#REF).
As a reminder,
the key class is:

```js
class DataManager {

  constructor (filename) {
    ...read and store data from CSV file...
  }

  getSurveyStats () {...return summary statistics...}

  getSurveyRange (minYear, maxYear) {...return slice of data...}
}
```
{: title="capstone/back/data-manager.js"}

## Server {#s:capstone-server}

The server is going to be almost the same as the one in [s:server](#REF).
However, we need to connect it to the data manager class.
We'll do this by having the driver create a data manager,
and then pass that data manager to the server as the latter is being created:

```js
const DataManager = require('./data-manager')
const server = require('./server-0')

const PORT = 3418

const filename = process.argv[2]
const db = new DataManager(filename)
const app = server(db)
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}...`)
})
```
{: title="capstone/back/driver-0.js"}

As you can probably guess from the fact that we've called it `driver-0`,
we're going to be making some changes down the road...

Here's the start of the server it works with:

```js
const express = require('express')

// 'dataManager' is a global variable that refers to our database.
// It must be set when the server is created.
let dataManager = null

// Main server object.
const app = express()

...handle requests...

module.exports = (dbm) => {
  dataManager = dbm
  return app
}
```
{: title="capstone/back/server-0.js"}

We'll look at handling requests for data in the next section.
The most important thing for now is the way we manage the connection to the data manager.
Down at the bottom of `server-0.js`,
we export a function that assigns its single argument to a variable called `dataManager`.
Inside the methods that handle requests,
we'll be able to send database queries to `dataManager`.

This variable is global within this file,
but since it's not exported,
it's invisible outside.
Variables like this are called [module variables](#g:module-variable),
and give us a way to share information among the functions in a module
without giving anything outside the module a way to cause (direct) harm to that information.

## API {#s:capstone-api}

The next step is to decide what our server's API will be,
i.e.,
what URLs it will understand and what data they will fetch.
`GET /survey/stats` will get summary statistics as a single JSON record,
and `GET /survey/:start/:end` gets aggregate values for a range of years.
(We will add error checking on the year range as an exercise.)
Anything else will return a 404 error code and a snippet of HTML telling us we're bad people.
We will put this code in `server.js` and a command-line driver in `driver.js` for testability.
The server functions are:

```js
// Get survey statistics.
app.get('/survey/stats', (req, res, next) => {
  const data = dataManager.getSurveyStats()
  res.setHeader('Content-Type', 'application/json')
  res.status(200).send(data)
})

// Get a slice of the survey data.
app.get('/survey/:start/:end', (req, res, next) => {
  const start = parseInt(req.params.start)
  const end = parseInt(req.params.end)
  const data = dataManager.getSurveyRange(start, end)
  res.setHeader('Content-Type', 'application/json')
  res.status(200).send(data)
})
```
{: title="capstone/back/server-0.js"}

We also write an error handling function:

```js
// Nothing else worked.
app.use((req, res, next) => {
  page = `<html><body><p>error: "${req.url}" not found</p></body></html>`
  res.status(404)
     .send(page)
})
```
{: title="capstone/back/server-0.js"}

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
{: title="capstone/back/test-server.js"}

Note that the range of years is 1979-2000,
which is *not* the range in the full dataset.
We run this with:

```shell
$ npm test -- src/capstone/back/test-server.js
```

<!-- == noindent -->
and it passes.

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
{: title="capstone/front/index.html"}

The main application in `app.js` imports components to display summary statistics,
choose a range of years,
and display annual data.
There is not usually such a close coupling between API calls and components,
but it's not a bad place to start.
Note that we are using `import` because we're trying to be modern,
even though the back end still needs `require`.

```js
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
{: title="capstone/front/app.js"}

The constructor defines the URL for the data source and sets up the initial state,
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
{: title="capstone/front/app.js"}

The method `componentDidMount` is new:
it fetches data for the very first time
so that the user sees something useful on the page when they first load it.

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
{: title="capstone/front/app.js"}

We don't call this method ourselves;
instead,
React automatically calls it once our application and its children have been loaded and initialized.
We can't fetch the initial data in the application's constructor because
we have no control over the order in which bits of display are initialized.
On the upside,
we can use `response.json()` directly because we know the source is returning JSON data.
This method is the only place where the summary is updated,
since the data isn't changing underneath us:

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
{: title="capstone/front/app.js"}

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
{: title="capstone/front/app.js"}

Now let's update the display with `SurveyStats`, `ChooseRange`, `DataChart`, and `DataDisplay`,
which are all stateless components
(i.e., they display things but don't change anything):

```js
  render = () => {
    const tableStyle = {overflow: 'scroll', height: '200px'}
    return (
      <div>
        <h1>Creatures</h1>
        <SurveyStats data={this.state.summary} />
        <ChooseRange
          start={this.state.start} onStart={this.onStart}
          end={this.state.end} onEnd={this.onEnd}
          onNewRange={this.onNewRange} />
        <DataChart data={this.state.data} />
        <div style={tableStyle}>
          <DataDisplay data={this.state.data} />
        </div>
      </div>
    )
  }
```
{: title="capstone/front/app.js"}

## The Tables {#s:capstone-tables}

We will display survey stats as tables,
with a paragraph fallback when there's no data.

First, we display summary statistics for the whole data set
(as returned by the `GET /survey/stats` query we wrote a handler for earlier)
as a table at the top of the page.
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
{: title="capstone/front/SurveyStats.js"}

Next, we display aggregated statistics for a given range of years
(the `GET /survey/:start/:end` query)
in another table.

```js
import React from 'react'

const DataDisplay = ({data}) => {

  if (! data) {
    return (<p>no data</p>)
  }

  const columns = [
    'year',
    'min_hindfoot_length',
    'ave_hindfoot_length',
    'max_hindfoot_length',
    'min_weight',
    'ave_weight',
    'max_weight'
  ]

  return (
    <table>
      <tbody>
        <tr>{columns.map((c) => (<th>{c}</th>))}</tr>
        {data.filter(r => r).map((record) => {
          return (<tr>{columns.map((c) => (<td>{record[c]}</td>))}</tr>)
        })}
      </tbody>
    </table>
  )
}

export default DataDisplay
```
{: title="capstone/front/DataDisplay.js"}

Like `SurveyStats`, `DataDisplay` returns a table listing the results returned from the server.
Unlike `SurveyStats`,
this component needs to check whether each record exists before it builds the table row.
Remember that,
when we defined how the year range query is handled in `DataManager` earlier,
we told it to only return record objects for those years that have data.
Here, we add `.filter(r => r)` before mapping the data to the callback
to ensure that `DataDisplay` will only try to make `tr` elements from non-`null` records.
We do the same when plotting the data.

## The Chart {#s:capstone-chart}

We initially tried using Vega-Lite directly for the chart,
but after a few failures and some googling,
we switched to `react-vega-lite`:
Vega-Lite's `vega-embed` wants to modify an existing DOM element when called,
while `react-vega-lite` constructs an element to be put in place at the right time,
which proved easier to use.
The steps are:

1. Create a paragraph placeholder if there's no data.
2. Re-organize non-`null` data into the form the chart needs.
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

  const values = data
        .filter(r => r)
        .map(r => ({x: r.ave_hindfoot_length, y: r.ave_weight}))
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
{: title="capstone/front/DataChart.js"}

The other components are similar to those we have seen before.

## Running It {#s:capstone-run}

In order to test our application,
we need to run a data server,
and then launch our application with Parcel.
The easiest way to do that is to open two windows on our computer
and make each half the width (or height) of our screen
so that we can see messages from both halves of what we're doing.

In one window,
we run:

```shell
$ node src/capstone/back/driver-0.js src/capstone/back/test-data.csv
```

Note that we *don't* use `npm run dev` to trigger Parcel:
this is running on the server,
so no bundling is necessary.
In our other window,
we run:

```shell
$ npm run dev src/capstone/front/index.html
```

<!-- == noindent -->
which displays:

```text
> js-vs-ds@0.1.0 dev /Users/stj/js-vs-ds
> parcel serve -p 4000 "src/capstone/front/index.html"

Server running at http://localhost:4000
+  Built in 20.15s.
```

{% include figure.html id="f:capstone-first-attempt" src="../../figures/capstone-first-attempt.png" caption="First Attempt at Viewing Capstone Project" %}

We then open `http://localhost:4000` in our browser and see [f:capstone-first-attempt](#FIG).
That's unexpected: we should see the initial data displayed.
If we open the console in the browser and reload the page,
we see this error message:

```text
Cross-Origin Request Blocked:
The Same Origin Policy disallows reading the remote resource \
  at http://localhost:3418/survey/stats.
(Reason: CORS header 'Access-Control-Allow-Origin' missing).
```

The "Learn More" link given with the error message takes us to [this page][cors-docs],
which uses many science words we don't know.
A web search turns up [this article on Wikipedia][cors-wikipedia],
which tells us that [Cross-origin resource sharing](#g:cors) (CORS)
is a security mechanism.
If a page loads some JavaScript,
and that JavaScript is allowed to send requests to servers other than the one that the page came from,
then villains would be able to do things like send passwords saved in the browser to themselves.
The details are too complex for this tutorial;
the good news is that they've been wrapped up in a Node library called `cors`,
which we can add to our server with just a couple of lines of code:

```js
const express = require('express')
const cors = require('cors')          // added

let dataManager = null

const app = express()
app.use(cors())                       // added

app.get('/survey/stats', (req, res, next) => {...as before...})

app.get('/survey/:start/:end', (req, res, next) => {...as before...})

app.use((req, res, next) => {...as before...})

module.exports = (dbm) => {...as before...}
```
{: title="capstone/back/server-1.js"}

Since this code is saved in `server-1.js`,
we need to create a copy of the driver called `driver-1.js` that invokes it.
Let's run that:

```shell
$ node src/capstone/back/driver-1.js src/capstone/back/test-data.csv
```

and then re-launch our application to get [f:capstone-second-attempt](#FIG).

{% include figure.html id="f:capstone-second-attempt" src="../../figures/capstone-second-attempt.png" caption="Second Attempt at Viewing Capstone Project" %}

Much better!
Now we can type some dates into the "start" and "end" boxes and,
after we press "update",
we get a chart and table of the aggregated statistics for the year range given
([f:capstone-complete](#FIG)).

{% include figure.html id="f:capstone-complete" src="../../figures/capstone-complete.png" caption="Completed Capstone Project" %}

We've built an interface,
used it to submit queries that are then handled by a server,
which returns data that can be converted to content by our React components,
and our capstone project is complete.

## Exercises {#s:capstone-exercises}

<section markdown="1">
### Reporting Other Data

A user has asked for the number of male and female animals observed for each year.

1. Should you add this to the existing query for yearly data or create a new API call?
2. Implement your choice.
</section>

<section markdown="1">
### Error Checking

1. Modify the server to return 400 with an error message
   if the range of years requested is invalid
2. Compare your implementation to someone else's.
   Did you define "invalid" in the same way?
   I.e., will your programs always return the same status codes for every query?
</section>

<section markdown="1">
### Use All the Data

Create a database using all of the survey data and test the display.
What bugs or shortcomings do you notice compared to displaying test data?
</section>

<section markdown="1">
### Merging Displays

The `SurveyStats` and `DataDisplay` components in the front end both display tables.

1. Write a new component `TableDisplay` that will display an arbitrary table
   given a list of column names
   and a list of objects which all have (at least) those fields.
2. Replace `SurveyStats` and `DataDisplay` with your new component.
3. Modify your component so that it generates a unique ID for each value in the table.
   (Hint: you may need to pass in a third parameter to each call
   to serve as the root or stem of those unique IDs.)
</section>

<section markdown="1">
### Formatting

Modify `DataDisplay` to format fractional numbers with a single decimal place,
but leave the integers as they are.
Ask yourself why,
seven decades after the invention of digital computers,
this isn't easier.
</section>

<section markdown="1">
### Data, Data Everywhere

Modify `DataChart` so that the word `data` isn't used in so many different ways.
Does doing this make you feel better about yourself as a person?
Modify it again so that the height and width of the chart are passed in as well.
Did that help?
</section>

{% include links.md %}
