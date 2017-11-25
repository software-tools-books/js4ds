---
layout: page
permalink: "/callbacks/"
---

## Introduction

- JavaScript relies heavily on [callback functions](../gloss/#callback-function)
  - Instead of me giving you a result,
    you give me a function that tells me what to do next
- Many other languages use them occasionally,
  but JavaScript is often the first place programmers encounter them
- In order to understand how they work and how to use them,
  must first understand what happens when functions are defined and called

## Functions as Parameters

- When we write `name = "text"`,
  JavaScript allocates a block of memory big enough for four characters,
  copies the characters into that block,
  and stores a reference to it in the variable `name`
- When we write `oneMore = (x) => {return x+1}`,
  JavaScript allocates a block of memory big enough to store several instructions,
  copies the instructions into that block,
  and stores a reference to it in the variable `oneMore`
- Draw a [memory diagram](../gloss/#memory-diagram) to show this

FIXME-14: diagram

- When we pass a value to a function,
  what we're really giving it is a reference to its block of memory
- So we can pass a function just as easily as we can pass a string or a number

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
{: title="src/callbacks/do-twice.js"}
```text
hello
hello
```

FIXME-14: diagram

- More useful when the function passed in takes parameters

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
{: title="src/callbacks/two-functions.js"}
```text
trim then dot: |this.example.uses.text|
dot then trim: |..this.example.uses.text..|
```

- Make a general pipeline by passing an array of functions

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
{: title="src/callbacks/general-pipeline.js"}
```text
| some text | -> |some.text..some.text|
```

- Define the function in place without bothering to give it a name
  - Just as we might pass `x+1` to a function directly
    rather than assigning that value to a variable
    and then passing in the variable
- Often called an [anonymous function](../gloss/#anonymous-function)

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
{: title="src/callbacks/transform.js"}
```text
upper: ONE,TWO,THREE
first: o,t,t
```

- When JavaScript programmers use the term "callback function",
  they usually mean a function defined and used this way

## Functional Programming

- [Functional programming](../gloss/#functional-programming) is a style of programming that:
  - Relies heavily on [higher-order functions](../gloss/#higher-order-function)
    (i.e., functions that take functions as parameters)
  - Doesn't modify data structures in place, but instead creates new ones from old
- JavaScript arrays provide several methods to support functional programming

- `Array.some` returns `true` if *any* element in an array passes a test
- `Array.every` returns `true` if *all* elements in an array pass a test

```js
const data = ['this', 'is', 'a', 'test']
console.log('some longer than 3:', data.some((x) => { return x.length > 3 }))
console.log('all greater than 3:', data.every((x) => { return x.length > 3 }))
```
{: title="src/callbacks/some-every.js"}
```text
some longer than 3: true
all greater than 3: false
```

- `Array.filter` creates a new array containing only values that pass a test

```js
const data = ['this', 'is', 'a', 'test']
console.log('those greater than 3:', data.filter((x) => { return x.length > 3 }))
```
{: title="src/callbacks/filter.js"}
```text
those greater than 3: [ 'this', 'test' ]
```

- So do all of the element with more than 3 characters start with a 't'?

```js
const data = ['this', 'is', 'a', 'test']
console.log('all longer than 3 start with t',
            data
            .filter((x) => { return x.length > 3 })
            .every((x) => { return x[0] === 't' }))
```
{: title="src/callbacks/filter-every.js"}
```text
all longer than 3 start with t true
```

- `Array.map` creates a new array
  by calling a function for each element of an existing array

```js
const data = ['this', 'is', 'a', 'test']
console.log('shortened', data.map((x) => { return x.slice(0, 2) }))
```
{: title="src/callbacks/map.js"}
```text
shortened [ 'th', 'is', 'a', 'te' ]
```

- `Array.reduce` reduces an array to a single value
  using a given function and a starting value
  - Need the starting value because the combiner function must take two values
    (next in sequence and running total)

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
{: title="src/callback/reduce.js"}
```text
acronym of this,is,a,test is tiat
in one step tiat
```

## Closures

- Last tool we need to introduce is an extremely useful side-effect of the way memory is handled
  - Explain by example
- Have already created a function `pipeline` that combines any set of functions we want

```js
const pipeline = (initial, operations) => {
  let current = initial
  for (let op of operations) {
    current = op(current)
  }
  return current
}
```
{: title="src/callbacks/general-pipeline.js"}

- But this only works if each function in `operations` has a single parameter
- If we want to be able to add 1, add 2, and so on, we have to write separate functions
- Better choice: write a function that creates the function we want

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
{: title="src/callbacks/adder.js"}
```text
add1(100) is 101 and add2(100) is 102
```

- Best way to understand what's going on is to draw a step-by-step memory diagram
- Step 1: call `adder(1)`

FIXME-14: diagram

- Step 2: `adder` creates a new function that includes a reference to that 1

FIXME-14: diagram

- Step 3: `adder` returns that function, which is assigned to `add1`

FIXME-14: diagram

- Step 4: same sequence to create another function with an embedded reference to 2

FIXME-14: diagram

- Step 5: call to `add1` inside `console.log`
  - Call to `add2` works the same way

FIXME-14: diagram

- The combination of a function and some embedded variable bindings is called a [closure](../gloss/#closure)
  - Works because a function "capture" the values of the variables
    that are in scope when it is defined but it doesn't define itself

```js
const pipeline = …as before…

const adder = …as before…

const result = pipeline(100, [adder(1), adder(2)])
console.log(`adding 1 and 2 to 100 -> ${result}`)
```
{: title="src/callbacks/closure.js"}
```text
adding 1 and 2 to 100 -> 103
```

- Again, `adder(1)` and `adder(2)` do not add anything to anything
  - They define new (unnamed) functions that will add 1 and 2 when called
- Often go one step further and define the function inline

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
{: title="src/callbacks/closure-inline.js"}
```text
adding 1 and 2 to 100 -> 103
```

<div class="challenges" markdown="1">

## Challenges

### Side Effects With `forEach`

JavaScript arrays have a method called `forEach`,
which calls a callback function once for each element of the array.
Unlike `map`,
`forEach` does *not* save the values returned by these calls
or return an array of results.
The full syntax is:

```js
someArray.forEach((value, location, container) => {
  // 'value' is the value in 'someArray'
  // 'location' is the index of that value
  // 'container' is the containing array (in this case, 'someArray')
}
```

If you only need the value,
you can provide a callback that only takes one parameter;
if you only need the value and its location,
you can provide a callback that takes two.
Use this to write a function `doubleInPlace`
that doubles all the values in an array in place:

```js
const vals = [1, 2, 3]
doubleInPlace(vals)
console.log(`vals after change: ${vals}`)
```
```text
vals after change: 2,4,6
```

### Annotating Data

Given an array of objects representing observations of wild animals:

```js
data = [
  {'date': '1977-7-16', 'sex': 'M', 'species': 'NL'},
  {'date': '1977-7-16', 'sex': 'M', 'species': 'NL'},
  {'date': '1977-7-16', 'sex': 'F', 'species': 'DM'},
  {'date': '1977-7-16', 'sex': 'M', 'species': 'DM'},
  {'date': '1977-7-16', 'sex': 'M', 'species': 'DM'},
  {'date': '1977-7-16', 'sex': 'M', 'species': 'PF'},
  {'date': '1977-7-16', 'sex': 'F', 'species': 'PE'},
  {'date': '1977-7-16', 'sex': 'M', 'species': 'DM'}
]
```

write a function that returns a new array of objects like this:

```js
newData = [
  {'seq': 3, 'year': '1977', 'sex': 'F', 'species': 'DM'},
  {'seq': 7, 'year': '1977', 'sex': 'F', 'species': 'PE'}
]
```

*without* using any loops.
The changes are:

- The `date` field is replaced with just the `year.
- Only observations of female animals are retained.
- The retained records are given sequence numbers to relate them back to the original data.
  (These sequence numbers are 1-based rather than 0-based.)

You may want to use `Array.reduce`
to generate the sequence numbers.
Use the web to find a description of it,
and work with a partner to ensure that you understand how it works.

</div>
