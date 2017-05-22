const pipeline = (initial, operations) => {
  let current = initial
  for (let op of operations) {
    current = op(current)
  }
  return current
}

const result = pipeline(100, [(x) => { return x+1 },
                              (x) => { return x+2 }])
console.log(`adding 1 and 2 to 100 -> ${result}`)
