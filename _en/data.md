---
permalink: "/en/data/"
title: "Providing Data"
questions:
- "FIXME"
keypoints:
- "FIXME"
---

There's not much point creating interactive web pages
if they don't have something to interact with.
To provide that,
we need two things:
something to store data,
and something to serve it.
We could build one program to do both,
but experience teaches that it's better to create two,
as each will then be easier to understand, test, and maintain.
After tossing a coin,
we decide to start with the data store;
the [next lesson](../server/) will look at how to build a server.

## Data Formats {#s:data-formats}

The most widely used text format for tabular data is undoubtedly
[comma-separated values](#g:csv) or CSV.
Each row of the table is a line in the file;
the values within each row---i.e., the columns---are separated by commas.
Numbers appear as themselves;
strings may or may not be wrapped in quotation marks,
unless they contain commas themselves,
in which case they definitely are:

```text
"maroon",128,0,0
"olive",128,128,0
"aqua",0,255,255
"fuchsia",255,0,255
```

The first row of a CSV file is often a [header](#g:header)
that defines the names of the columns.
For example,
the small table shown above would better be represented as:

```text
"name","red","green","blue"
"maroon",128,0,0
"olive",128,128,0
"aqua",0,255,255
"fuchsia",255,0,255
```

Tragically,
CSV files usually *don't* contain units or data types.
We can guess that the values in the table above are integers,
but it's all too common to have a CSV file whose columns are labelled "height" and "weight"
without any indication of whether the heights are in feet or meters,
and the weights in pounds or kilograms.

CSV is good for tabular data,
but a lot of data doesn't neatly fit into rows and columns.
An alternative format for irregular data that is popular with programmers is [JSON](#g:json),
which stands for JavaScript Object Notation.
It allows us to use a subset of the syntax used for values, arrays, and objects in JavaScript,
so that (for example)
we can store configuration values for a program like this:

```js
{
  "name" : "DataExplorer",
  "version" : "1.2.1",
  "preferences" : {
    "colorscheme" : "dark",
    "autofill" : true
  },
  "last_opened" : [
    "raw/biotic.dat",
    "raw/genomic.dat",
    "cooked/inferred.dat"
  ]
}
```

JSON is often used for tabular data as well:
the whole table is an array,
and each record is an object with name-value pairs:

```js
[
  {"name": "maroon", "red": 128, "green": 0, "blue": 0},
  {"name": "olive", "red": 128, "green": 128, "blue": 0},
  {"name": "aqua", "red": 0, "green": 255, "blue": 255},
  {"name": "fuchsia", "red": 255, "green": 0, "blue": 255}
]
```

Redundantly repeating the names redundantly like this seems wasteful
compared to listing them once at the top of a table,
but it does mean that the fields within rows can be accessed directly
using expressions like `colors[1].red`.

## Slicing Data {#s:data-slicing}

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
{: title="src/data/select-random.js"}

## Data Manager {#s:data-manager}

Rather arbitrarily,
we decide that our data manager will initially be able to answer two questions:

1. How many records do we have and what range of years do they cover?
2. What are the minimum, average, and maximum values
   for weight and hindfoot length by year
   for a given range of years?

We will use PapaParse to parse our CSV,
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
}

module.exports = Database
```
{: title="src/data/database.js"}

What we were missing in our first couple of attempts (before reading the documentation) was that
the `options` object controls how the parser behaves.
We want it to interpret the first row as a header (which sets column names)
and to convert things that look like numbers to numbers (the `dynamicTyping` option).

Our data is now stored row-wise as JSON.
Let's write a method to get some overall statistics:

```js
  getSurveyStats () {
    return {
      minYear : this._get('year', Math.min),
      maxYear : this._get('year', Math.max),
      count : this.data.length
    }
  }

  _get(field, func) {
    return func(...this.data.map(rec => rec[field]))
  }
```
{: title="src/data/database.js"}

Functions like `Math.min` and `Math.max` take any number of scalar values as arguments,
but do not directly process arrays.
However, the notation `func(...array)` means
"pass all the values in the array as separate arguments",
which saves us from writing our own minimum and maximum functions.
Thus,
`func(...this.data.map(rec => rec[field]))` means
"select the specified field from each record in `this.data` to create an array of fields,
then pass all of those values as arguments to `func`.

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
{: title="src/data/database.js"}

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
{: title="src/data/database.js"}

## Exercises {#s:data-exercises}

FIXME

{% include links.md %}
