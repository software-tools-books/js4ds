// Load data.
const fs = require('fs')
const DF = require('data-forge')

const text = fs.readFileSync('../../data/national_parks.csv', 'utf-8')
const raw = DF.fromCSV(text)
console.log(raw.head(2).toArray())

// Detect types.
const typesDf = raw.detectTypes() 
console.log(typesDf.toString())

// Check for NA.
const cleaned = raw
      .where(row => ((row.year != 'NA') && (row.visitors != 'NA')))
console.log(`${raw.count()} original rows and ${cleaned.count()} cleaned rows`)

// Transform types.
const data = raw
      .where(row => ((row.year != 'NA') && (row.visitors != 'NA')))
      .parseFloats(['year', 'visitors'])
console.log(`${data.count()} rows`)
console.log(data.detectTypes().toString())

// Group and count.
const annual = data
      .groupBy(row => row.year)
      .select(group => ({
        year: group.first().year,
        visitors: group.deflate(row => row.visitors).sum()
      }))
      .inflate()
      .orderBy(row => row.year)
console.log(annual.toString())

// Check for NaN.
const numNan = data
      .where(row => (isNaN(row.year) || isNaN(row.visitors)))
      .count()
console.log(`${numNan} rows have NaN`)
