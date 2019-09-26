const fs = require('fs')
const DF = require('data-forge')

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
    this.data = DF.fromCSV(raw)
    .parseInts(['record_id','month','day','year','plot_id'])
    .parseFloats(['hindfoot_length','weight'])
  }

  getSurveyStats () {
    return {
      year_low: this.data.deflate(row => row.year).min(),
      year_high: this.data.deflate(row => row.year).max(),
      record_count: this.data.count()
    }
  }

  getSurveyRange (minYear, maxYear) {
    return Array(1 + maxYear - minYear)
      .fill(0)
      .map((v, i) => minYear + i)
      .map(year => {
	  const subset = this.data.where(row => row.year === year)
      if (subset.count()) {
        return {
          key: toString(year),
          year: year,
          min_hindfoot_length: this._getMin(subset, 'hindfoot_length'),
          ave_hindfoot_length: this._getAve(subset, 'hindfoot_length'),
          max_hindfoot_length: this._getMax(subset, 'hindfoot_length'),
          min_weight: this._getMin(subset, 'weight'),
          ave_weight: this._getAve(subset, 'weight'),
          max_weight: this._getMax(subset, 'weight')
        }
      }
    })
  }

  _getMin (yearData, columnName) {
    const filtered = yearData.where(row => !isNaN(row[columnName]))
    if (filtered.count()) {
      return filtered.deflate(row => row[columnName]).min()
    } else {
      return 'no data'
    }
  }

  _getAve (yearData, columnName) {
    const filtered = yearData.where(row => !isNaN(row[columnName]))
    if (filtered.count()) {
      return filtered.deflate(row => row[columnName]).average()
    } else {
      return 'no data'
    }
  }

  _getMax (yearData, columnName) {
    const filtered = yearData.where(row => !isNaN(row[columnName]))
    if (filtered.count()) {
      return filtered.deflate(row => row[columnName]).max()
    } else {
      return 'no data'
    }
  }

}

module.exports = DataManager
