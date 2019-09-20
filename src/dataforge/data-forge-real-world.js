const DF = require('data-forge');
const DataManager = require('../dataman/data-manager.js');


class JSONtoDataFrame extends DataManager {

    constructor(filename) {
        super(filename)
    }

    dataframe() {
        return new DF.DataFrame(this.data)
    } 

}

const npsCleaned = nps
         .where(row => row.year !== "Total")
         .where(row => row.visitors !== "NA")
         // now we can turn those columns into integers rather than strings

console.log(npsCleaned.toString())
const typesDf = npsCleaned.detectTypes(); 
//console.log(npsCleaned.detectTypes().toString())

// console.log(distinctDf.toString())

const annualVisitors = npsCleaned
    .groupBy(row => row.year)
    .select(group => ({
        // we will use the unique year values
        // to populate the rows of the Year column
        Year: group.first().year,
        // Now we can sum the annual visitors
        Annual_Visitors: group.deflate(row => row.visitors).sum(),
    }))
    .inflate()
    //.where(row => row.Year >= 2009)

console.log(annualVisitors.toString())
