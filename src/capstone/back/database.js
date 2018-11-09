const fs = require('fs')
const papa = require('papaparse')

FIELDS = {
  record_id : 0,
  month : 1,
  day : 2,
  year : 3,
  plot_id : 4, 
  species_id : 5,
  sex : 6,
  hindfoot_length : 7,
  weight : 8
}

class Database {

  constructor (filename) {
    raw = fs.readFileSync(filename)
    this.data = papa.parse(raw)
  }

  getSurveyStats () {
  }

  getSurveyData (startYear, endYear) {
  }
}

module.exports = Database
