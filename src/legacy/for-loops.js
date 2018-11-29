const things = ['x', 'y', 'z']
things.someProperty = 'someValue'

for (let key in things) {
  console.log(key)
}

for (let i = 0; i < things.length; i += 1) {
  console.log(i)
}

for (let key of things) {
  console.log(key)
}

things.forEach((val, loc, array) => {
    console.log(`element ${loc} of ${array} is ${val}`)
})
