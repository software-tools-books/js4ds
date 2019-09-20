const fs = require('fs')
const papa = require('papaparse')
const DF = require('data-forge');
const DataManager = require('../dataman/data-manager.js');

class JSONtoDataFrame {

    constructor (filename) {
        const raw = fs.readFileSync(filename, 'utf-8')
        const options = {header: true, dynamicTyping: true}
        this.data = papa.parse(raw, options).data
      }
    
}

const temp = new JSONtoDataFrame('../../data/national_parks.csv')
const nps = new DF.DataFrame(temp.data)

const npsCleaned = nps
         .where(row => row.year !== "Total")
         .where(row => row.visitors !== "NA")
         // now we can turn those columns into integers rather than strings

console.log(npsCleaned.toString())
const typesDf = npsCleaned.detectTypes(); 
//console.log(npsCleaned.detectTypes().toString())

const distinctDf = npsCleaned.dropSeries(['gnis_id', 'geometry', 'metadata', 'number_of_records', 'parkname',
'region', 'state', 'unit_code', 'unit_name', 'unit_type', 'visitors'])
// console.log(distinctDf.toString())

const annualVisitors = npsCleaned
    .groupBy(row => row.year)
    .select(group => ({
        // we will use the unique year values
        // to populate the rows of the Year column
        Year: group.first().year,
        // Now we can sum the annual visitors
        Total: group.select(row => row.visitors).sum(),
    }))
    .inflate()
console.log(annualVisitors.toString())