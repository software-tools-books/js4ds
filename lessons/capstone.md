---
layout: page
permalink: "/capstone/"
datasource: https://figshare.com/articles/Portal_Project_Teaching_Database/1314459
---

## Introduction

- Bring everything together in an extended example
- A (slightly) interactive visualization of species data from <{{page.datasource}}>
- Plan:
  - Slice data for testing
  - Build database interface class
  - Put data server on top of it
  - Test
  - Build interactive tabular display of data
  - Add visualization
- Will require some new ideas
  - But most work will recapitulate what's come before

## Slicing Data

- Actual data is in a SQL file in <{{page.datasource}}>
- Over 30,000 records
- Create a 1000-record slice for testing
  - Alternative approach: write small program to generate fake data

- Step 1: inspect the source SQL file and find the table(s) we care about
  - In this case, only need `surveys` table

```sql
create table surveys (
  record_id INTEGER, 
  year INTEGER, 
  month INTEGER, 
  day INTEGER, 
  plot_id INTEGER, 
  species_id TEXT, 
  sex TEXT, 
  hindfoot_length INTEGER, 
  weight INTEGER
);
```
{: title="src/capstone/back/create-test-data.sql"}

- Step 2: copy a subset of data into a temporary table
  - Temporary tables aren't saved to disk
  - Use `insert into` to copy from one table to another
- How to select randomly?
  - Shuffle and keep the top cards
  - `order by random()`
  - `limit 1000`
  - Only take records whose `record_id` matches one of those

```sql
create temporary table test_surveys (
  record_id INTEGER, 
  year INTEGER, 
  month INTEGER, 
  day INTEGER, 
  plot_id INTEGER, 
  species_id TEXT, 
  sex TEXT, 
  hindfoot_length INTEGER, 
  weight INTEGER
);

insert into test_surveys
select *
from surveys
where record_id in
(select record_id from surveys order by random() limit 1000);
```
{: title="src/capstone/back/create-test-data.sql"}

- Step 3: save to file
  - `.schema` displays all the table descriptions of the database
  - `.schema TABLE` displays only one
  - Change mode to `insert TABLE` has SQLite display query results as insert statements into a table
    - For exactly this purpose
  - Not something anyone would ever go looking for on their own…
  - …which is another reason novices need tutorials to get started

```sql
.schema surveys
.mode insert surveys
select * from test_surveys;
```
{: title="src/capstone/back/create-test-data.sql"}

- This sends results to standard output
  - Can redirect to file on command line
  - Could also use `.output FILENAME` to save to a particular file

- Result is `test-data.sql`
  - Use this to create a database with a single `surveys` table
  - Could store the test data in a different table
  - But SQL doesn't allow parameterization of table names

## Database Manager

- Support two queries (for now)
  - Add others later as exercises
- Summary statistics: range of years and number of records

```sql
select
  min(year) as year_low,
  max(year) as year_high,
  count(*) as record_count
from
  surveys
```
{: title="src/capstone/back/database.js"}

- Minimum, average, and maximum values for weight and hindfoot length by year for a range of years

```sql
select
  surveys.year as year,
  min(surveys.hindfoot_length) as hindfoot_min,
  avg(surveys.hindfoot_length) as hindfoot_avg,
  max(surveys.hindfoot_length) as hindfoot_max,
  min(surveys.weight) as weight_min,
  avg(surveys.weight) as weight_avg,
  max(surveys.weight) as weight_max
from
  surveys
where
  (surveys.year >= ?) and (surveys.year <= ?)
group by
  year
```
{: title="src/capstone/back/database.js"}

- This introduces some new features of SQL
  - [Aggregation functions](../gloss/#aggregation-function) like `min`, `avg`, and `max` combine all values in a column to produce a single value
  - `group by` partitions data into sub-groups (in this case, one per year)

- Implementation of `Database` class look the same as [previously](../database/)

## Server

- Implementation is almost the same as [previous server](../server/)
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

```js
  it('should return nothing when asked for records before 1977', (done) => {
    expected = []
    const db = new Database('memory', TEST_DATA_PATH)
    request(server(db))
      .get('/survey/0/0')
      .expect(200)
      .expect('Content-Type', 'application/json')
      .end((err, res) => {
        assert.deepEqual(res.body, expected, '')
        done()
      })
  })
```
{: title="src/capstone/back/test-server.js"}

- Third test: gets the right data for one year
  - Have to inspect the data and do some calculations
  - Again, a smaller data set would probably have been just as useful

```js
  it('should return the records for 1977 when asked to slice', (done) => {
    expected = [{
      year: 1977,
      hindfoot_min: 21,
      hindfoot_avg: 30.25,
      hindfoot_max: 36,
      weight_min: 39,
      weight_avg: 41,
      weight_max: 43
    }]
    const db = new Database('memory', TEST_DATA_PATH)
    request(server(db))
      .get('/survey/1977/1977')
      .expect(200)
      .expect('Content-Type', 'application/json')
      .end((err, res) => {
        assert.deepEqual(res.body, expected, '')
        done()
      })
  })
```
{: title="src/capstone/back/test-server.js"}

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
  - Could use `assert(res.body.length == expectedValue, …)`
  - But then error message would just be `false != true`

<div class="challenges" markdown="1">

## Challenges

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

HTTP defines many [status codes](../gloss/#http-status-code)
that servers should return to tell clients what went wrong.

1. Modify the server to return 400 with an error message
   if the range of years requested is invalid
2. Compare your implementation to someone else's.
   Did you define "invalid" in the same way?
   I.e., will your programs always return the same status codes for every query?

</div>

{% include links.md %}
