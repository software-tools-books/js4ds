const fs = require('fs')
const DF = require('data-forge')

const text = fs.readFileSync('earthquakes.csv', 'utf-8')
const earthquakes = DF
      .fromCSV(text)
      .parseDates('Time')
      .parseFloats(['Latitude', 'Longitude', 'Depth_Km', 'Magnitude'])
console.log('Data has', earthquakes.count(), 'rows')

console.log(earthquakes.head(3).toArray())

console.log(earthquakes.tail(3).toArray())

console.log(earthquakes.skip(10).take(3).toArray())

const large = earthquakes.where(row => (row.Magnitude >= 5.0))
console.log(large.toArray())
