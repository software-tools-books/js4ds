Tests = [
  'Jamie: james@geneinfo.org',
  'Zara: zetsure@bio123.edu',
  'Hong and Andrzej: hchui@euphoric.edu and aszego@euphoric.edu'
]

const pattern = /[a-z]+@[a-z]+\.[a-z]+/g

console.log(`pattern is ${pattern}`)
for (let test of Tests) {
  console.log(`\ntested against ${test}`)
  const matches = test.match(pattern)
  if (matches === null) {
    console.log('-no matches-')
  }
  else {
    for (let m of matches) {
      console.log(m)
    }
  }
}
