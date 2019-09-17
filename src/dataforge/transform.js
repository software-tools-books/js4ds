const DF = require('data-forge')

const data = new DF.DataFrame([
    {ones: 1, tens: 10},
    {ones: 2, tens: 20},
    {ones: 3, tens: 30}
])

const double_oh = new DF.Series([100, 200, 300])

const withHundreds = data.withSeries({hundreds: double_oh})
console.log(withHundreds.toArray())

const sumsAndProducts = data.generateSeries({
  sum: row => row.ones + row.tens,
  product: row => row.ones * row.tens
})
console.log(sumsAndProducts.toArray())
