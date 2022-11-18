---
layout: default
title: Answers
---

---

## Callbacks

### Side Effects with **forEach**

```{js}
const doubleInPlace = (array) => {
  array.forEach((value, location, container) => {
    container[location] = value * 2;
  })
}
```

### Annotating Data

```{js}
const reducer = (accumulator, currentValue, index) => {
    if (!accumulator) accumulator = []
    if (currentValue.sex && currentValue.sex === 'F'){
        accumulator.push({
            'seq': index + 1,
            'year': currentValue.date.split('-')[0],
            'sex': currentValue.sex,
            'species': currentValue.species
        })
    }
    return accumulator
}

const annotateData = (array) => array.reduce(reducer, [])

const newData = annotateData(data)
```

## Objects and Classes

### Delays

```{js}
class Delay {
  constructor (initialValue) {
    this.nextValue = initialValue
  }

  call (nextValue) {
    let previousValue = this.nextValue
    this.nextValue = nextValue
    return previousValue
  }
}
```

### Filtering

```{js}
class Filter {
  constructor (...values) {
    this.filterValues = values
  }

  call (inputValue) {
    return this.filterValues.some((value) => value === inputValue) ? null : inputValue
  }
}
```

### Pipelines

```{js}
class Pipeline {
    constructor (...pipes) {
        this.pipes = pipes
    }

    call (inputValue) {
        return this.pipes.reduce(
          (accumulator, currentValue) =>
          accumulator ? currentValue.call(accumulator) : null, inputValue)
    }
}
```

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
