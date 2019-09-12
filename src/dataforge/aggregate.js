const fs = require('fs')
const DF = require('data-forge')

const text = fs.readFileSync('earthquakes.csv', 'utf-8')
const earthquakes = DF
      .fromCSV(text)
      .parseDates('Time')
      .parseFloats(['Latitude', 'Longitude', 'Depth_Km', 'Magnitude'])

const averageValues = earthquakes.summarize({
  Depth_Km: series => series.average(),
  Magnitude: series => series.average()
})
console.log(averageValues)

const groupedByMagnitude = earthquakes.groupBy(row => row.Magnitude)
console.log(`${groupedByMagnitude.count()} groups`)
console.log(groupedByMagnitude.head(2).toArray())

const averaged = earthquakes
      .groupBy(row => row.Magnitude)
      .select(group => ({
        Magnitude: group.first().Magnitude,
        Depth_Km: group.deflate(row => row.Depth_Km).average()
      }))
      .inflate()
      .orderBy(row => row.Magnitude)
console.log(averaged.toArray())
