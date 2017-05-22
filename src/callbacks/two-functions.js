const pipeline = (initial, first, second) => {
  return second(first(initial))
}

const trim = (text) => { return text.trim() }
const dot = (text) => { return text.replace(/ /g, '.') }

const original = '  this example uses text  '

const trimThenDot = pipeline(original, trim, dot)
console.log(`trim then dot: |${trimThenDot}|`)

const dotThenTrim = pipeline(original, dot, trim)
console.log(`dot then trim: |${dotThenTrim}|`)
