const utilities = require('./utilities')

data = [-1, 5, 3, 0, 10]
result = utilities.clip(data)
console.log(`clip(${data}) -> ${result}`)
