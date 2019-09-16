---
layout: default
title: Answers
---

---

## Data-Forge

### Revisting Data Manipulation

```{js}
const fs = require('fs')
const papa = require('papaparse')
const DF = require('data-forge')

class DataManager {
  constructor (filename) {
    const raw = fs.readFileSync(filename, 'utf-8') 
    const options = {header: true, dynamicTyping: true} 
    this.data = papa.parse(raw, options).data
  } 
}

const surveys = new DataManager('../../data/surveys.csv')

const aggregate_surveys = new DF.DataFrame(surveys.data)
  .subset(['year', 'hindfoot_length', 'weight'])
  .where(row => row.hindfoot_length != undefined)
  .where(row => row.weight != undefined)
  .summarize({
    year: {
      year_avg: series => series.average(),
      year_min: series => series.min(),
      year_max: series => series.max()
    },
    hindfoot_length: {
      hindfoot_avg: series => series.average(),
      hindfoot_min: series => series.min(),
      hindfoot_max: series => series.max()
    },
    weight: {
      weight_avg: series => series.average(),
      weight_min: series => series.min(),
      weight_max: series => series.max()
    }
})
```
