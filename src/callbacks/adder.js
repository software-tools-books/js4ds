const adder = (increment) => {
  const f = (value) => {
    return value + increment
  }
  return f
}

const add1 = adder(1)
const add2 = adder(2)
console.log(`add1(100) is ${add1(100)} and add2(100) is ${add2(100)}`)
