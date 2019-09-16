const DF = require('data-forge')

const data = new DF.DataFrame([
    {ones: 1, tens: 10},
    {ones: 2, tens: 20},
    {ones: 3, tens: 30}
])

console.log(data.getColumnNames())

console.log(data.toRows())

for (let row of data) {
  console.log(row)
}

data.forEach(row => {
  console.log(row)
})
