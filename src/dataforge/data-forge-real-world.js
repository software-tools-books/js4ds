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

const nps = new JSONtoDataFrame('../../data/national_parks.csv').dataframe()
    .where(row => row.year !== "Total")
    .where(row => row.visitors !== "NA")
    // need to convert to integers
    .groupBy(row => row.year)
    .select(group => ({
        Year: group.first().year,
        Annual_Visitors: group.deflate(row => row.visitors).sum(),
    }))
    .inflate()
    .where(row => row.year >= 2009)

console.log(nps.toString())
