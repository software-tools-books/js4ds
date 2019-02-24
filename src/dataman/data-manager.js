const fs = require('fs')
const papa = require('papaparse')

const _average = (...values) => {
  let sum = 0
  for (let v of values) {
    sum += v
  }
  return sum / values.length
}

class DataManager {

  constructor (filename) {
    const raw = fs.readFileSync(filename, 'utf-8')
    const options = {header: true, dynamicTyping: true}
    this.data = papa.parse(raw, options).data
  }

  getSurveyStats () {
    return {
      year_low : this._get(this.data, 'year', Math.min),
      year_high : this._get(this.data, 'year', Math.max),
      record_count : this.data.length
    }
  }

  getSurveyRange (minYear, maxYear) {
    return Array(1 + maxYear - minYear)
      .fill(0)
      .map((v, i) => minYear + i)
      .map(year => {
        const subset = this.data.filter(r => r.year === year)
        if (subset.length) {
          return {
            key  : toString(year),
            year : year,
            min_hindfoot_length :this._get(subset,
                                           'hindfoot_length', Math.min),
            ave_hindfoot_length : this._get(subset,
                                            'hindfoot_length', _average),
            max_hindfoot_length : this._get(subset,
                                            'hindfoot_length', Math.max),
            min_weight : this._get(subset, 'weight', Math.min),
            ave_weight : this._get(subset, 'weight', _average),
            max_weight : this._get(subset, 'weight', Math.max)
          }
        }
      })
  }

  _get(values, field, func) {
    return func(...values.map(rec => rec[field]).filter(val => !isNaN(val)))
  }
}

module.exports = DataManager
