---
permalink: "/en/data/"
title: "Data Providers"
questions:
- "FIXME"
keypoints:
- "FIXME"
---

FIXME: intro explaining CSV and JSON formats

## Slicing Data {#s:capstone-slicing}

The data we want to serve is available in a variety of formats from <{{page.datasource}}>.
We will focus for now on `surveys.csv`,
which has over 35,500 records.
That's a lot to process,
so our first step is to create a 10-record slice for testing.
It would be easy to take the first ten,
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
const lines = fs.readFileSync(inputFile, 'utf-8')
    .split('\n')
header = lines[0]
const sample = lines.slice(1)
    .map(line => [Math.random(), line])
    .sort((left, right) => { return left[0] < right[0] ? -1 : 1 })
    .slice(0, parseInt(numLines))
    .map(pair => pair[1])
fs.writeFileSync(outputFile, header + '\n' + sample.join('\n'))
```
{: title="src/capstone/back/select-random.js"}

## Data Manager {#s:capstone-data}

Rather than putting the logic to handle the data in the server,
we will create a separate class that can read in a CSV file
and answer two questions:

1. How many records do we have and what range of years do they cover?
2. What are the minimum, average, and maximum values
   for weight and hindfoot length by year
   for a given range of years?

We will use Papa Parse to parse our CSV,
so we start with this:

```sh
npm install papaparse
```

After loading the library and reading our test data file a couple of times,
we break down and read the documentation,
then come up with this as the skeleton of our "database":

```
const fs = require('fs')
const papa = require('papaparse')

class Database {

  constructor (filename) {
    const raw = fs.readFileSync(filename, 'utf-8')
    const options = {header: true, dynamicTyping: true}
    this.data = papa.parse(raw, options).data
  }

  getSurveyStats () {
    return {
      minYear : this._get('year', Math.min),
      maxYear : this._get('year', Math.max),
      count : this.data.length
    }
  }

  _get(field, func = null) {
    return func(...this.data.map(rec => rec[field]))
  }
}

module.exports = Database
```
{: title="src/capstone/back/database.js"}

What we were missing in our first couple of attempts (before reading the documentation) was:

1. The `options` object controls how the parser behaves.
   We want it to interpret the first row as a header (which sets column names)
   and to convert things that look like numbers to numbers (the `dynamicTyping` option).
2. Functions like `Math.min` and `Math.max` take any number of scalar values as arguments,
   but do not directly process arrays.
   However, the notation `func(...array)` means
   "pass all the values in the array as separate arguments",
   which saves us from writing our own minimum and maximum functions.

Now that we have this,
adding the method to get weight and hindfoot length for a range of years
is pretty straightforward.
First,
we write a function to calculate the average of one or more arguments:

```js
const _average = (...values) => {
  let sum = 0
  for (let v of values) {
    sum += v
  }
  return sum / values.length
}
```
{: title="src/capstone/back/database.js"}

It would be more natural for `average` to take an array,
rather than a variable number of arguments,
but we want to be able to use it in the same way that we use `Math.min` and `Math.max`,
so we have to conform to their signature.

The method to get the values for a range of years is now:

```js
  getSurveyRange (minYear, maxYear) {
    const subset = this.data.filter(r => ((minYear <= r.year) && (r.year <= maxYear)))
    return {
      minYear : minYear,
      maxYear : maxYear,
      minHindfootLength : this._get(subset, 'hindfoot_length', Math.min),
      aveHindfootLength : this._get(subset, 'hindfoot_length', _average),
      maxHindfootLength : this._get(subset, 'hindfoot_length', Math.max),
      minWeight : this._get(subset, 'weight', Math.min),
      aveWeight : this._get(subset, 'weight', _average),
      maxWeight : this._get(subset, 'weight', Math.max),
    }
  }
```
{: title="src/capstone/back/database.js"}

## Exercises {#s:data-exercises}

FIXME

{% include links.md %}
