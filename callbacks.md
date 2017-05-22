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

FIXME: describe commonly-used JavaScript array methods

## Closures

FIXME: explain variable capture
