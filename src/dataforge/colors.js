const fs = require('fs')
const DF = require('data-forge')

const text = fs.readFileSync('colors.csv', 'utf-8')
const colors = DF.fromCSV(text)
console.log(colors.toArray())

const sorted = colors.orderBy(row => row.name)
console.log(sorted.toArray())

const doubleSorted = colors
      .orderBy(row => row.green)
      .thenBy(row => row.blue)
      .dropSeries(['name', 'red'])
console.log(doubleSorted.toArray())
