const fs = require('fs')
const papa = require('papaparse')

const _average = (...values) => {
  let sum = 0
  for (let v of values) {
    sum += v
  }
  return sum / values.length
}

class Database {

  constructor (filename) {
    const raw = fs.readFileSync(filename, 'utf-8')
    const options = {header: true, dynamicTyping: true}
    this.data = papa.parse(raw, options).data
  }

  getSurveyStats () {
    return {
      minYear : this._get(this.data, 'year', Math.min),
      maxYear : this._get(this.data, 'year', Math.max),
      count : this.data.length
    }
  }

  getSurveyRange (minYear, maxYear) {
    const subset = this.data.filter(r => ((minYear <= r.year) && (r.year <= maxYear)))
    return {
      minYear : minYear,
      maxYear : maxYear,
      minHindfootLength : this._get(subset, 'hindfoot_length', Math.min),
      aveHindfootLength : this._get(subset, 'hindfoot_length', _average),
      maxHindfootLength : this._get(subset, 'hindfoot_length', Math.max),
      minWeight : this._get(subset, 'weight', Math.min),
      aveWeight : this._get(subset, 'weight', _average),
      maxWeight : this._get(subset, 'weight', Math.max),
    }
  }

  _get(values, field, func = null) {
    return func(...values.map(rec => rec[field]))
  }
}

module.exports = Database
