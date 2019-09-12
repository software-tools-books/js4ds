const data = ['this', 'is', 'a', 'test']

let acronym = ''
for (let value of data) {
  acronym = acronym + value[0]
}

console.log(`acronym of ${data} is ${acronym}`)
