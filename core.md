---
layout: page
permalink: "/core/"
title: "Core Features of Modern JavaScript"
---

- Introduce enough of JavaScript's core features to get started
- Experiment with these interactively in the Node REPL

## Hello, World

```js
// src/core/hello.js
console.log('hello, world')
```
```output
hello, world
```

- `console` is a built-in _module_ that provides basic printing services
- Use `X.Y` to get part `Y` of thing `X`
- A _string_ can be single-quoted or double-quoted
- Semi-colons at the ends of statements are now (mostly) optional
- Run this program from the command line with:

```sh
node src/core/hello.js
```

## Basic Data Types

```js
// src/core/types.js
const aNumber = 123.45
console.log('the type of', aNumber, 'is', typeof aNumber)

const anInteger = 123
console.log('the type of', anInteger, 'is', typeof anInteger)

const aString = 'some text'
console.log('the type of', aString, 'is', typeof aString)

const otherValues = [true, undefined, null]
for (let value of otherValues) {
  console.log('the type of', value, 'is', typeof value)
}

console.log('the type of', console.log, 'is', typeof console.log)
```
```output
the type of 123.45 is number
the type of 123 is number
the type of some text is string
the type of true is boolean
the type of undefined is undefined
the type of null is object
the type of function () { [native code] } is function
```

- Use `const` to define a _constant_
- `number`
  - JavaScript doesn't have separate types for integers and floating-point
  - All numbers are 64-bit floating point
  - Accurate up to 15 digits
- `string` for text
  - Which is always _Unicode_
- `boolean` for `true` and `false`
  - We'll see below that other things can be truthy or falsy
- `undefined` means "hasn't been given a value"
- `null` means "has a value, which is nothing"
- Functions like `console.log` are things too
  - We'll look at the implications of that [in detail](./callbacks/)
- `typeof` returns a string

## Control Flow

```js
// src/core/control-flow.js
const values = [false, true, 0, 1, '', 'text', undefined, null, [], [2, 3]]
for (let v of values) {
  if (v) {
    console.log(`${v} of type ${typeof v} is truthy`)
  }
  else {
    console.log(`${v} of type ${typeof v} is falsy`)
  }
}
```
```output
false of type boolean is falsy
true of type boolean is truthy
0 of type number is falsy
1 of type number is truthy
 of type string is falsy
text of type string is truthy
undefined of type undefined is falsy
null of type object is falsy
 of type object is truthy
2,3 of type object is truthy
```

- An _array_ is a comma-separated list of values inside square brackets
  - Arrays are _heterogeneous_, i.e., can contain values of many different types
  - Including other arrays
- Use `let` to define a _variable_ (as opposed to `const`)
- `for…of` loops over the values in an array
  - See other kinds of loops later
- `if` and `else` work as they do in other languages
  - It's the _truthiness_ that's different
- `true` and `false`: as expected
- Numbers: 0 is _falsy_, all others are _truthy_
- Strings: empty string is falsy, all others are truthy
- `undefined` and `null` are both falsy
- But an empty array is truthy
  - Argument is that there's something there, it just happens to be empty
  - Test `Array.length` instead
  - This is a _property_, not a _method_

## Objects

```js
// src/core/objects.js
creature = {
  'order': 'Primates',
  'family': 'Callitrichidae',
  'genus': 'Callithrix',
  'species': 'Jacchus'
}

console.log(`creature is ${creature}`)
console.log(`creature.genus is ${creature.genus}`)
for (let key in creature) {
  console.log(`creature[${key}] is ${creature[key]}`)
}
```
```output
creature is [object Object]
creature.genus is Callithrix
creature[order] is Primates
creature[family] is Callitrichidae
creature[genus] is Callithrix
creature[species] is Jacchus
```

- An _object_ is a collection of key/value pairs
  - Keys do not have to be strings, but almost always are
  - Values can be anything
- Create an object by putting key/value pairs in curly brackets
- Type of object is always `object`
- Can always get a value using `object[key]`
- If the key has a simple name, can use `object.key` instead
  - The square bracket form can be used with variables for keys
  - The _dotted_ notation cannot
- Use _string interpolation_ to format output
  - Back-quotes around string
  - `${expression}` to insert the value of an expression in the string

## Functions

```js
// src/core/functions-classic.js
function limits(values) {
  if (! values.length) {
    return [undefined, undefined]
  }
  let low = values[0]
  let high = values[0]
  for (let v of values) {
    if (v < low) low = v
    if (v > high) high = v
  }
  return [low, high]
}
```

- Definition is:
  - Keyword `function`
  - Function name
  - Possibly-empty list of _parameters_ in parentheses
  - Body
- Use `return` to explicitly return a value at any time
  - If nothing returned, result is `undefined`
- Every function is a _scope_
  - Parameters and variables created inside function are _local_

```js
// src/core/functions-classic.js
allTests = [
  [],
  [9],
  [3, 30, 300],
  ['apple', 'Grapefruit', 'banana'],
  [3, 'apple', ['sub-array']]
]
for (let test of allTests) {
  console.log(`limits of ${test} are ${limits(test)}`)
}
```
```output
limits of  are ,
limits of 9 are 9,9
limits of 3,30,300 are 3,300
limits of apple,Grapefruit,banana are Grapefruit,banana
limits of 3,apple,sub-array are 3,3
```

- Generally don't write functions this way any longer
  - Interacts in odd ways with other features of the language
  - [Section on legacy issues](./legacy/) explains why in more detail
- Instead, use _fat arrow_ functions
  - Parameter list, `=>`, and body creates a function without a name
  - Assign that to a constant or variable

```js
// src/core/functions-modern.js
const limits = (values) => {
  if (! values.length) {
    return [undefined, undefined]
  }
  let low = values[0]
  let high = values[0]
  for (let v of values) {
    if (v < low) low = v
    if (v > high) high = v
  }
  return [low, high]
}
```

- Same output as previous example

> - Why not stick to `function` and fix behavior?
> - Would break legacy programs that rely on old behavior
> - Want to make it really easy to define little functions
> - The way a language is used shapes the evolution of its syntax

## Modules

- Want to put code in multiple files
- Unavoidable bad news is that JavaScript has several module systems
  - Node still uses CommonJS
  - But is converting to modern ES6
  - So what we use on the command line is different from what we use in the browser

```js
// src/core/utilities.js
const bound = 3

const clip = (values) => {
  let result = []
  for (let v in values) {
    if (v <= bound) {
      result.push(v)
    }
  }
  return result
}

module.exports = {
  clip: clip
}
```

- Notes
  - Don't have to quote the keys of objects when they are simple names
  - `bound` isn't exported

```
// src/core/import.js
const utilities = require('./utilities')

data = [-1, 5, 3, 0, 10]
result = utilities.clip(data)
console.log(`clip(${data}) -> ${result}`)
```
```output
clip(-1,5,3,0,10) -> 0,1,2,3
```

- `require` returns an object
  - Keys are the names of the things the module exports
  - Values are the things (usually functions)
- Usually assign result of `require` to a variable with the same name as the module
  - Then refer to contents as `module.thing`
- Use a relative path starting with `./` or `../` to import local files
  - Paths that start with names are taken from installed Node libraries
- FIXME: explain how to install libraries using NPM

## Regular Expressions

FIXME: explain regexp

## Challenges

1. What is the type of `typeof`?

1. Fill in the blanks in the program below
   so that it produces the output shown.
   1. What does `Array.push` do?
   1. How does a `while` loop work?
   1. What does `+=` do?
   1. What does `Array.reverse` do, and what does it return?

```js
// ex/core/table-of-squares.js
let current = 0
let table = []
while (current < 5) {
  const entry = `square of ${current} is ${current * current}`
  table.push(entry)
  current += 1
}
table.reverse()
for (let line of table) {
  console.log(line)
}
```
```output
square of 4 is 16
square of 3 is 9
square of 2 is 4
square of 1 is 1
square of 0 is 0
```

1. Write a function called `isTruthy` that returns `true`
   for everything that JavaScript considers truthy,
   and `false` for everything it considers `falsy`,
   *except* empty arrays:
   `isTruthy` should return `false` for those.

1. Explain what is happening in the assignment statement that creates the constant `creature`.

```js
// ex/core/implied.js
const genus = 'Callithrix'
const species = 'Jacchus'
const creature = {genus, species}
console.log(creature)
```
```output
{ genus: 'Callithrix', species: 'Jacchus' }
```

1. Explain what is happening in the assignment statement in this program.
   Use this technique to rewrite `src/core/import.js`
   so that `clip` can be called directly as `clip(…)` rather than `utilities.clip(…)`.

```js
// ex/core/destructuring.js
const creature = {
  genus: 'Callithrix',
  species: 'Jacchus'
}
const {genus, species} = creature
console.log(`genus is ${genus}`)
console.log(`species is ${species}`)
```
