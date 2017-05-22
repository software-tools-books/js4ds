---
layout: page
permalink: "/callbacks/"
title: "Programming with Callbacks"
---

- JavaScript relies heavily on _callback functions_
  - Instead of me giving you a result,
    you give me a function that tells me what to do next
- Many other languages use them occasionally,
  but JavaScript is often the first place programmers encounter them

## Functions as Arguments

- When we write `name = "text"`,
  JavaScript allocates a block of memory big enough for four characters,
  copies the characters into that block,
  and stores a reference to it in the variable `name`
- When we write `oneMore = (x) => {return x+1}`,
  JavaScript allocates a block of memory big enough to store several instructions,
  copies the instructions into that block,
  and stores a reference to it in the variable `oneMore`

FIXME: diagram

- When we pass a value to a function,
  what we're really giving it is a reference to its block of memory
- So we can pass a function just as easily as we can pass a string or a number

```js
// src/callbacks/do-twice.js
const doTwice = (action) => {
  action()
  action()
}

const hello = () => {
  console.log('hello')
}

doTwice(hello)
```
```output
hello
hello
```

FIXME: diagram

- More useful when the function passed in takes arguments

```js
// src/callbacks/two-functions.js
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
```
```output
trim then dot: |this.example.uses.text|
dot then trim: |..this.example.uses.text..|
```

- Make a general pipeline by passing an array of functions

```js
// src/callbacks/general-pipeline.js
const pipeline = (initial, operations) => {
  let current = initial
  for (let op of operations) {
    current = op(current)
  }
  return current
}

const trim = (text) => { return text.trim() }
const dot = (text) => { return text.replace(/ /g, '.') }
const double = (text) => { return text + text }

const original = ' some text '
const final = pipeline(original, [double, trim, dot])
console.log(`|${original}| -> |${final}|`)
```
```output
| some text | -> |some.text..some.text|
```

- Define the function in place without bothering to give it a name
  - Just as we might pass `x+1` to a function directly
    rather than assigning that value to a variable
    and then passing in the variable

```js
// src/callbacks/transform.js
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
```
```output
upper: ONE,TWO,THREE
first: o,t,t
```

- When JavaScript programmers use the term "callback function",
  they usually mean a function defined and used this way

## Functional Programming

- _Functional programming_ is a style of programming that:
  - Relies heavily on _higher-order functions_ (i.e., functions that take functions as arguments)
  - Doesn't modify data structures in place, but instead creates new ones from old
- JavaScript arrays provide several methods to support functional programming

- `Array.some` returns `true` if *any* element in an array passes a test
- `Array.every` returns `true` if *all* elements in an array pass a test

```js
// src/callbacks/some-every.js
const data = ['this', 'is', 'a', 'test']
console.log('some longer than 3:', data.some((x) => { return x.length > 3 }))
console.log('all greater than 3:', data.every((x) => { return x.length > 3 }))
```
```output
some longer than 3: true
all greater than 3: false
```

- `Array.filter` creates a new array containing only values that pass a test

```js
// src/callbacks/filter.js
const data = ['this', 'is', 'a', 'test']
console.log('those greater than 3:', data.filter((x) => { return x.length > 3 }))
```
```output
those greater than 3: [ 'this', 'test' ]
```

- So do all of the element with more than 3 characters start with a 't'?

```js
// src/callbacks/filter-every.js
const data = ['this', 'is', 'a', 'test']
console.log('all longer than 3 start with t',
            data
            .filter((x) => { return x.length > 3 })
            .every((x) => { return x[0] == 't' }))
```
```output
all longer than 3 start with t true
```

- `Array.map` creates a new array
  by calling a function for each element of an existing array

```js
// src/callbacks/map.js
const data = ['this', 'is', 'a', 'test']
console.log('shortened', data.map((x) => { return x.slice(0, 2) }))
```
```output
shortened [ 'th', 'is', 'a', 'te' ]
```

- `Array.scan` reduces an array to a single value
  using a given function and a starting value
  - Need the starting value because the combiner function must take two values
    (next in sequence and running total)

```js
// src/callback/reduce.js
const data = ['this', 'is', 'a', 'test']

const concatFirst = (accumulator, nextValue) => {
  return accumulator + nextValue[0]
}
const acronym = data.reduce(concatFirst, '')
console.log(`acronym of ${data} is ${acronym}`)

console.log('in one step', data.reduce((accum, next) => {
  return accum + next[0]
}, ''))
```
```output
acronym of this,is,a,test is tiat
in one step tiat
```

## Closures

FIXME: explain variable capture

## Challenges

FIXME: `forEach`
