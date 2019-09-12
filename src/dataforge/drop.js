const DF = require('data-forge')

const data = new DF.DataFrame([
    {ones: 1, tens: 10},
    {ones: 2, tens: 20},
    {ones: 3, tens: 30}
])

const sumsAndProducts = data.generateSeries({
  sum: row => row.ones + row.tens,
  product: row => row.ones * row.tens
})

const justResults = sumsAndProducts.dropSeries(["ones", "tens"])
console.log(justResults.toArray())
