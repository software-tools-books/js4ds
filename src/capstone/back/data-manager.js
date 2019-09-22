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
      year_low : this.data.deflate(row => row.year).min(),
      year_high : this.data.deflate(row => row.year).max(),
      record_count : this.data.count()
    }
  }

  getSurveyRange (minYear, maxYear) {
    return Array(1 + maxYear - minYear)
      .fill(0)
      .map((v, i) => minYear + i)
      .map(year => {
	  const subset = this.data.where(row => row.year === year)
      if (subset.count()) {
        const subset_has_hf = subset.where(row => !isNaN(row.hindfoot_length))
        let hf_min = 'no data'
        let hf_ave = 'no data'
        let hf_max = 'no data'
        if (subset_has_hf.count()) {
          hf_min = subset_has_hf.deflate(row => row.hindfoot_length).min()
          hf_ave = subset_has_hf.deflate(row => row.hindfoot_length).average()
          hf_max = subset_has_hf.deflate(row => row.hindfoot_length).max()
        }
        const subset_has_weight = subset.where(row => !isNaN(row.weight))
        let w_min = 'no data'
        let w_ave = 'no data'
        let w_max = 'no data'
        if (subset_has_weight.count()) {
          w_min = subset_has_weight.deflate(row => row.weight).min()
          w_ave = subset_has_weight.deflate(row => row.weight).average()
          w_max = subset_has_weight.deflate(row => row.weight).max()
        }
        return {
          key  : toString(year),
          year : year,
          min_hindfoot_length : hf_min,
          ave_hindfoot_length : hf_ave,
          max_hindfoot_length : hf_max,
          min_weight : w_min,
          ave_weight : w_ave,
          max_weight : w_max
        }
      }
    })
  }

}

module.exports = DataManager
