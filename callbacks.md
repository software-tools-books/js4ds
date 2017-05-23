---
layout: page
permalink: "/callbacks/"
title: "Programming with Callbacks"
---

> **Questions**
>
> - What happens when a function is defined?
> - How can I pass a function to another function?
> - Why would I want to do that?
> - What are higher-order functions?
> - What higher-order functions do JavaScript arrays provide?
> - What is a closure?
> - When and why are closures useful?

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
- Draw a _memory diagram_ to show this

FIXME: diagram

- When we pass a value to a function,
  what we're really giving it is a reference to its block of memory
- So we can pass a function just as easily as we can pass a string or a number

<!-- @src/callbacks/do-twice.js -->
```js
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

<!-- @src/callbacks/two-functions.js -->
```js
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

<!-- @src/callbacks/general-pipeline.js -->
```js
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

<!-- @src/callbacks/transform.js -->
```js
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
  - Relies heavily on _higher-order functions_
    (i.e., functions that take functions as arguments)
  - Doesn't modify data structures in place, but instead creates new ones from old
- JavaScript arrays provide several methods to support functional programming

- `Array.some` returns `true` if *any* element in an array passes a test
- `Array.every` returns `true` if *all* elements in an array pass a test

<!-- @src/callbacks/some-every.js -->
```js
const data = ['this', 'is', 'a', 'test']
console.log('some longer than 3:', data.some((x) => { return x.length > 3 }))
console.log('all greater than 3:', data.every((x) => { return x.length > 3 }))
```
```output
some longer than 3: true
all greater than 3: false
```

- `Array.filter` creates a new array containing only values that pass a test

<!-- @src/callbacks/filter.js -->
```js
const data = ['this', 'is', 'a', 'test']
console.log('those greater than 3:', data.filter((x) => { return x.length > 3 }))
```
```output
those greater than 3: [ 'this', 'test' ]
```

- So do all of the element with more than 3 characters start with a 't'?

<!-- @src/callbacks/filter-every.js -->
```js
const data = ['this', 'is', 'a', 'test']
console.log('all longer than 3 start with t',
            data
            .filter((x) => { return x.length > 3 })
            .every((x) => { return x[0] === 't' }))
```
```output
all longer than 3 start with t true
```

- `Array.map` creates a new array
  by calling a function for each element of an existing array

<!-- @src/callbacks/map.js -->
```js
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

<!-- @src/callback/reduce.js -->
```js
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

- Last tool we need to introduce is an extremely useful side-effect of the way memory is handled
  - Explain by example
- Have already created a function `pipeline` that combines any set of functions we want

<!-- @src/callbacks/general-pipeline.js -->
```js
const pipeline = (initial, operations) => {
  let current = initial
  for (let op of operations) {
    current = op(current)
  }
  return current
}
```

- But this only works if each function in `operations` has a single parameter
- If we want to be able to add 1, add 2, and so on, we have to write separate functions
- Better choice: write a function that creates the function we want

<!-- @src/callbacks/adder.js -->
```js
const adder = (increment) => {
  const f = (value) => {
    return value + increment
  }
  return f
}

const add1 = adder(1)
const add2 = adder(2)
console.log(`add1(100) is ${add1(100)} and add2(100) is ${add2(100)}`)
```
```output
add1(100) is 101 and add2(100) is 102
```

- Best way to understand what's going on is to draw a step-by-step memory diagram
- Step 1: call `adder(1)`

FIXME: diagram

- Step 2: `adder` creates a new function that includes a reference to that 1

FIXME: diagram

- Step 3: `adder` returns that function, which is assigned to `add1`

FIXME: diagram

- Step 4: same sequence to create another function with an embedded reference to 2

FIXME: diagram

- Step 5: call to `add1` inside `console.log`
  - Call to `add2` works the same way

FIXME: diagram

- The combination of a function and some embedded variable bindings is called a _closure_
  - Works because a function "capture" the values of the variables
    that are in scope when it is defined but it doesn't define itself

<!-- @src/callbacks/closure.js -->
```js
const pipeline = …as before…

const adder = …as before…

const result = pipeline(100, [adder(1), adder(2)])
console.log(`adding 1 and 2 to 100 -> ${result}`)
```
```output
adding 1 and 2 to 100 -> 103
```

- Again, `adder(1)` and `adder(2)` do not add anything to anything
  - They define new (unnamed) functions that will add 1 and 2 when called
- Often go one step further and define the function inline

<!-- @src/callbacks/closure-inline.js -->
```js
const pipeline = (initial, operations) => {
  let current = initial
  for (let op of operations) {
    current = op(current)
  }
  return current
}

const result = pipeline(100, [(x) => x + 1, (x) => x + 2])
console.log(`adding 1 and 2 to 100 -> ${result}`)
```
```output
adding 1 and 2 to 100 -> 103
```

## Summary

FIXME: summarize chapter

> **Key Points**
>
> - FIXME: key points

## Challenges

FIXME: `forEach`
