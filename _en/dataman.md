---
permalink: "/en/dataman/"
title: "Managing Data"
questions:
- "What formats are commonly used for small scientific datasets?"
- "What are some of the strengths and weaknesses of those formats?"
- "How can I parse CSV data?"
- "How should I select a subset of data for testing purposes?"
keypoints:
- "Small tabular datasets are commonly stored as Comma-Separated Values (CSV)."
- "CSV can only represent regular data, and CSV files usually don't include units."
- "Nested data is commonly stored using JavaScript Object Notation (JSON)."
- "JSON representations of tabular data often include redundant (and therefore possibly inconsistent) specifications of column names."
- "PapaParse is a robust CSV parsing library that produces JSON output."
---

There's not much point creating interactive web pages
if they don't have something to interact with.
To provide that,
we need something to store data and something to serve it.
We could build one program to do both,
but experience teaches that it's better to create one for each
so that they are easier to understand, test, and maintain.
After tossing a coin,
we decide to start with the data store;
the [next lesson](../server/) will look at how to build a server.

## Data Formats {#s:data-formats}

The most widely used text format for tabular data is undoubtedly
[comma-separated values](../gloss/#g:csv) or CSV.
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

The first row of a CSV file is often a [header](../gloss/#g:header)
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
CSV doesn't require the first row to be a header,
and CSV files usually don't specify units or data types.
We can guess that the values in the table above are integers,
but it's all too common to have a CSV file whose columns are labelled "height" and "weight"
without any indication of whether the heights are in feet or meters
or the weights in pounds or kilograms.

CSV is good for tabular data,
but a lot of data doesn't neatly fit into rows and columns.
A format for hierarhical data that is popular with many programmers is [JSON](../gloss/#g:json),
which stands for JavaScript Object Notation.
It supports a subset of the syntax for values, arrays, and objects in JavaScript,
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

JSON can be used for tabular data as well.
The whole table is an array,
and each record is an object with name-value pairs:

```js
[
  {"name": "maroon", "red": 128, "green": 0, "blue": 0},
  {"name": "olive", "red": 128, "green": 128, "blue": 0},
  {"name": "aqua", "red": 0, "green": 255, "blue": 255},
  {"name": "fuchsia", "red": 255, "green": 0, "blue": 255}
]
```

Repeating field names like this is wasteful compared to listing them once at the top of a table,
but it does mean that the fields within rows can be accessed directly
using expressions like `colors[1].red`.

## Slicing Data {#s:data-slicing}

The data we will use as an example is available in a variety of formats from <{{site.datasource}}>.
We will focus on `surveys.csv`,
which has over 35,500 records.
That's a lot to look at,
so we will create a 10-record slice for testing.

Although it would be easy to take the first ten,
or the last,
there's a good chance that neither would be representative of the data as a whole.
Instead,
we will write a little script that selects N records at random.
Since it doesn't need to be efficient,
we will do something simple:

```js
const fs = require('fs')

const [inputFile, numLines, outputFile] = process.argv.splice(2)
const lines = fs.readFileSync(inputFile, 'utf-8')
    .split('\n')
header = lines[0]
const sample = lines.slice(1)
    .map(line => [Math.random(), line])
    .sort((left, right) => { return left[0] - right[0] })
    .slice(0, parseInt(numLines))
    .map(pair => pair[1])
fs.writeFileSync(outputFile, header + '\n' + sample.join('\n'))
```
{: title="src/dataman/select-random.js"}

We run this on the command line:

```sh
node select-random.js ../surveys.csv 10 slice.csv
```

and get this:

```sh
record_id,month,day,year,plot_id,species_id,sex,hindfoot_length,weight
18501,3,14,1991,13,OT,M,21,28
2283,1,15,1980,11,OL,M,21,23
19941,5,2,1992,1,PP,M,22,13
27413,12,29,1997,5,,,,
16002,5,9,1989,19,SC,,,
28813,11,21,1998,12,DO,M,35,56
9338,7,4,1984,11,DO,F,35,57
28336,8,22,1998,7,PB,M,26,23
25323,3,16,1997,9,DM,F,33,26
6785,10,23,1982,5,DM,F,37,45
```

Running it again will probably generate a different data slice,
since we're not specifying a random number generation seed.
We are bad people, and will fix this in the exercises.

## Data Manager {#s:data-manager}

Rather arbitrarily,
we decide that our data manager will be able to answer two questions:

1. How many records do we have and what range of years do they cover?
   This is the kind of opening question that many client programs will ask.
2. What are the minimum, average, and maximum values
   for weight and hindfoot length by year
   for a given range of years?
   This would be very specific to a particular kind of client program;
   a good service would either provide many such specialized queries
   or (more usefully) provide a way to ask for particular aggregations of particular columns.

We will use [PapaParse][papaparse] to parse our CSV,
so our first step is to install it:

```sh
npm install papaparse
```

After loading the library and reading our test data file a couple of times,
we break down and read the documentation,
then come up with this as the first version of our data manager:

```
const fs = require('fs')
const papa = require('papaparse')

class DataManager {

  constructor (filename) {
    const raw = fs.readFileSync(filename, 'utf-8')
    const options = {header: true, dynamicTyping: true}
    this.data = papa.parse(raw, options).data
  }
}

module.exports = DataManager
```
{: title="src/dataman/data-manager.js"}

What our hubris made us miss in our first couple of attempts was that
the `options` object controls how the parser behaves.
Here,
we tell it to interpret the first row as a header (which sets column names)
and to convert things that look like numbers to numbers (the `dynamicTyping` option).
The output of `papa.parse` looks like this:

```js
{ data:
   [ { record_id: 18501,
       month: 3,
       day: 14,
       year: 1991,
       plot_id: 13,
       species_id: 'OT',
       sex: 'M',
       hindfoot_length: 21,
       weight: 28 },

     ...eight more records...

     { record_id: 6785,
       month: 10,
       day: 23,
       year: 1982,
       plot_id: 5,
       species_id: 'DM',
       sex: 'F',
       hindfoot_length: 37,
       weight: 45 } ],
  errors: [],
  meta:
   { delimiter: ',',
     linebreak: '\n',
     aborted: false,
     truncated: false,
     cursor: 350,
     fields:
      [ 'record_id',
        'month',
        'day',
        'year',
        'plot_id',
        'species_id',
        'sex',
        'hindfoot_length',
        'weight' ] } }
```

so using `papa.parse(raw, options).data` gets the data we want as JSON.
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
{: title="src/dataman/data-manager.js"}

Functions like `Math.min` and `Math.max` take any number of scalar values as arguments,
but do not directly process arrays.
However, the notation `func(...array)` means
"pass all the values in the array as separate arguments",
which saves us from writing our own minimum and maximum functions.
Thus,
`func(...this.data.map(rec => rec[field]))` means
"select the specified field from each record in `this.data` to create an array of fields,
then pass all of those values as arguments to `func`.
We include an underscore to the start of the name of `_get` to indicate that we
intend it to be used only inside `getSurveyStats` and not to be called elsewhere.

Adding the method to get weight and hindfoot length for a range of years
is comparatively straightforward.
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
{: title="src/dataman/data-manager.js"}

It would be more natural for `_average` to take an array rather than a variable number of arguments,
but we want to be able to use it in the same way that we use `Math.min` and `Math.max`,
so we have to conform to their signature.

The method to get the values for a range of years is now:

```js
  getSurveyRange (minYear, maxYear) {
    const subset = this.data.filter(r => ((minYear <= r.year) && (r.year <= maxYear)))
    return {
      min_year : minYear,
      max_year : maxYear,
      min_hindfoot_length : this._get(subset, 'hindfoot_length', Math.min),
      ave_hindfoot_length : this._get(subset, 'hindfoot_length', _average),
      max_hindfoot_length : this._get(subset, 'hindfoot_length', Math.max),
      min_weight : this._get(subset, 'weight', Math.min),
      ave_weight : this._get(subset, 'weight', _average),
      max_weight : this._get(subset, 'weight', Math.max)
    }
  }
```
{: title="src/dataman/data-manager.js"}

## Exercises {#s:data-exercises}

### Tracing Data

Trace the execution of the utility program that creates a small sample of the original data,
explaining what is passed into each of the chained methods calls.

### Unrandom

Programs that rely on random numbers are impossible to test
because there's (deliberately) no way to predict their output.
Luckily, computer programs don't actually use random numbers:
they use [pseudo-random numbers](../gloss/#g:pseudo-random-number)
that are generated in a repeatable but unpredictable way.
Given the same initial [seed](../gloss/#g:seed),
a pseudo-random number generator will always produce the same sequence of values.

There is no way to set a seed for `Math.random` out of the box,
but the [seedrandom][seedrandom] package provides an add-on function for this purpose.
Install the package and modify the slice selection utility
so that it takes a word or phrase as a command-line argument
and uses it to seed the random number generator.

### One Record Per Year

Another way to slice the data for testing purposes is to select one record from each year.
Write a small command-line JavaScript program that:

1. Reads all the data from the CSV.
2. Keeps the first record it finds for each year.
3. Prints these records formatted as SQL `insert` statements.

### Error Handling

Modify `DataManager`'s constructor so that it checks for errors.

### Generalization

Modify `getSurveyRange` so that it can be called like this:

```js
getSurveyRange(minYear, maxYear, 'hindfoot_length', 'weight')
```

i.e., so that the names of the fields whose minimum, average, and maximum values are wanted
can be passed as strings,
and the method will automatically create the right names and values in its result.

{% include links.md %}
