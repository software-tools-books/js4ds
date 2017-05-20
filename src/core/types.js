const aNumber = 123.45
console.log('the type of', aNumber, 'is', typeof aNumber)

const anInteger = 123
console.log('the type of', anInteger, 'is', typeof anInteger)

const aString = 'some text'
console.log('the type of', aString, 'is', typeof aString)

const otherValues = [true, undefined, null]
for (let value of otherValues) {
  console.log('the type of', value, 'is', typeof value)
}
