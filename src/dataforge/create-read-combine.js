const DF = require('data-forge')

const fromObjects = new DF.DataFrame([
    {ones: 1, tens: 10},
    {ones: 2, tens: 20},
    {ones: 3, tens: 30}
])
console.log('fromObjects:\n', fromObjects)

console.log('fromObjects as array:\n', fromObjects.toArray())

const fromSpec = new DF.DataFrame({
  columnNames: ['ones', 'tens'],
  rows: [
    [4, 40],
    [5, 50],
    [6, 60]
  ]
})
console.log('fromSpec as array:\n', fromSpec.toArray())

const text = `ones,tens
7,70
8,80
9,90`
const fromText = DF.fromCSV(text)
console.log('fromText as array:\n', fromText.toArray())
