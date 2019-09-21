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
    .where(row => row.visitors !== "NA")
    //.where(row => row.year !== "Total") //this should work but returns an empty data frame?
    //.parseInts('year') //this should work but doesn't because of the filter, I presume
    .groupBy(row => row.year)
    .select(group => ({
       Year: group.first().year,
       Annual_Visitors: group.deflate(row => row.visitors).sum(),
    }))
    .inflate()
console.log(nps.toString())
