const fs = require('fs')
const DF = require('data-forge')

const text = fs.readFileSync('colors.csv', 'utf-8')
const colors = DF.fromCSV(text)

const hasRed = colors.where(row => (row.red > 0))
console.log(hasRed.toArray())

const notTheSame = colors.distinct(row => row.red)
console.log(notTheSame.toArray())

const multiColumn = colors
      .distinct(row => [row.red, row.green])
      .orderBy(row => row.red)
      .thenBy(row => row.green)
console.log(multiColumn.toArray())
