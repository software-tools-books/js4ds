const transform = (values, operation) => {
  let result = []
  for (let v of values) {
    result.push(operation(v))
  }
  return result
}

const data = ['one', 'two', 'three']
const upper = transform(data, (x) => { return x.toUpperCase() })
console.log(`upper: ${upper}`)

const first = transform(data, (x) => { return x[0] })
console.log(`first: ${first}`)
