---
layout: page
permalink: "/core/"
title: "Core Features of Modern JavaScript"
---

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
  - All numbers are floating point
  - And yes, that does occasionally cause unexpected behavior
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
- `for...of` loops over the values in an array
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

## Challenges

1. What is the type of `typeof`?

1. Write a function called `isTruthy` that returns `true`
   for everything that JavaScript considers truthy,
   and `false` for everything it considers `falsy`,
   *except* empty arrays:
   `isTruthy` should return `false` for those.

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
