const data = ['this', 'is', 'a', 'test']

const concatFirst = (accumulator, nextValue) => {
  return accumulator + nextValue[0]
}
const acronym = data.reduce(concatFirst, '')
console.log(`acronym of ${data} is ${acronym}`)

console.log('in one step', data.reduce((accum, next) => {
  return accum + next[0]
}, ''))
