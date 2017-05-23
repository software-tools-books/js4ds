const utilities = require('./utilities')

const data = [-1, 5, 3, 0, 10]
const result = utilities.clip(data)
console.log(`clip(${data}) -> ${result}`)
