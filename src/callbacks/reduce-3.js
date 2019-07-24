const data = ['this', 'is', 'a', 'test']

acronym = data.reduce((accum, next) => {
  return accum + next[0]
}, '')
console.log('all in one step:', acronym)
