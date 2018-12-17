---
permalink: "/en/basics/"
title: Basic Features
questions:
- "How can I execute short snippets of JavaScript interactively?"
- "How can I run small JavaScript programs from the command line?"
- "How can I print text in JavaScript?"
- "What are JavaScript's basic data types?"
- "How can I find out what type something is?"
- "How do I write loops?"
- "How do I write conditionals?"
- "What counts as true and false?"
- "How do I format text?"
- "How do I format JavaScript code?"
- "How do I store lists of values?"
- "How do I store values by name?"
- "How do I define functions?"
- "How do I divide source code into multiple files?"
keypoints:
- "Use `console.log` to print messages."
- "Use dotted notation `X.Y` to get part `Y` of object `X`."
- "Basic data types are Booleans, numbers, and character strings."
- "Arrays store multiple values in order."
- "The special values `null` and `undefined` mean 'no value' and 'does not exist'."
- "Define constants with `const` and variables with `let`."
- "`typeof` returns the type of a value."
- "`for (let variable of collection) {...}` iterates through the values in an array."
- "`if (condition) {...} else {...}` conditionally executes some code."
- "`false`, 0, the empty string, `null`, and `undefined` are false; everything else is true."
- "Use back quotes and `${...}` to interpolate values into strings."
- "An object is a collection of name/value pairs written in `{...}`."
- "`object[key]` or `object.key` gets a value from an object."
- "Functions are objects that can be assigned to variables, stored in lists, etc."
- "`function (...parameters...) {...body...}` is the old way to define a function."
- "`name = (...parameters...) => {...body...}` is the new way to define a function."
- "Use `return` inside a function body to return a value at any point."
- "Use modules to divide code between multiple files for re-use."
- "Assign to `module.exports` to specify what a module exports."
- "`require(...path...)` imports a module."
- "Paths beginning with '.' or '/' are imported locally, but paths without '.' or '/' look in the library."
---

This lesson introduces the core features of JavaScript,
including how to run programs,
the language's basic data types,
arrays and objects,
loops,
conditionals,
functions,
and modules.
All of these concepts should be familiar if you have programmed before.

## Hello, World {#s:basics-hello-world}

Use your favorite text editor to put the following line in a file called `hello.js`:

```js
console.log('hello, world')
```
{: title="src/basics/hello.js"}

`console` is a built-in [module](../gloss/#g:module) that provides basic printing services
(among other things).
As in many languages,
we use the [dotted notation](../gloss/#g:dotted-notation) `X.Y` to get part `Y` of thing `X`---in this case,
to get `console`'s `log` function.
[Character strings](../gloss/#g:string) like `'hello, world'` can be written with either single quotes or double quotes,
so long as the quotation marks match,
and semi-colons at the ends of statements are now (mostly) optional.

To run a program,
type <code>node <em>program_name.js</em></code> at the command line.
(We will preface shell commands with `$` to make them easier to spot.)

```shell
$ node src/basics/hello.js
```
```text
hello, world
```

## Basic Data Types {#s:basics-data-types}

JavaScript has the usual datatypes,
though unlike C, Python, and many other languages,
there is no separate type for integers:
it stores all numbers as 64-bit floating-point values,
which is accurate up to about 15 decimal digits.
We can check this using `typeof`,
which is an operator, *not* a function,
and which returns a string:

```js
const aNumber = 123.45
console.log('the type of', aNumber, 'is', typeof aNumber)
```
{: title="src/basics/types.js"}
```text
the type of 123.45 is number
```

```js
const anInteger = 123
console.log('the type of', anInteger, 'is', typeof anInteger)
```
{: title="src/basics/types.js"}
```text
the type of 123 is number
```

We have already met strings,
which may contain any [Unicode](../gloss/#g:unicode) character:

```js
const aString = 'some text'
console.log('the type of', aString, 'is', typeof aString)
```
{: title="src/basics/types.js"}
```text
the type of some text is string
```

Functions are also a type of data,
a fact whose implications we will explore in [the next lesson](../callbacks/):

```js
console.log('the type of', console.log, 'is', typeof console.log)
```
{: title="src/basics/types.js"}
```text
the type of function () { [native code] } is function
```

Rather than showing the other basic types one by one,
we will put three values in a list and loop over it:

```js
const otherValues = [true, undefined, null]
for (let value of otherValues) {
  console.log('the type of', value, 'is', typeof value)
}
```
{: title="src/basics/types.js"}
```text
the type of true is boolean
the type of undefined is undefined
the type of null is object
```

As the example above shows,
we use `let` to define a [variable](../gloss/#g:variable)
and `const` to define a [constant](../gloss/#g:constant),
put values separated by commas inside `[]` to create an [array](../gloss/#g:array),
and use `for...of` to loop over the values in that array.
Note that we use `let` rather than the older `var` and `of` and not `in`:
the latter returns the indexes of the collection (e.g., 0, 1, 2),
which has some [traps for the unwary](../legacy/#s:legacy-iteration).
Note also that indexing starts from 0 rather than 1,
and that indentation is optional and for readability purposes only.
This may be different from the language that you're used to.

After all this,
the types themselves are somewhat anticlimactic.
JavaScript's `boolean` type can be either `true` and `false`,
though we will see below that other things can be treated as Booleans.
`undefined` means "hasn't been given a value",
while `null` means "has a value, which is nothing".

## Control Flow {#s:basics-control-flow}

We have already seen `for` loops and flat arrays,
so let's have a look at conditionals and nested arrays:

```js
const values = [[0, 1], ['', 'text'], [undefined, null], [[], [2, 3]]]
for (let pair of values) {
  for (let element of pair) {
    if (element) {
      console.log(element, 'of type', typeof element, 'is truthy')
    } else {
      console.log(element, 'of type', typeof element, 'is falsy')
    }
  }
}
```
{: title="src/basics/control-flow.js"}
```text
0 of type number is falsy
1 of type number is truthy
 of type string is falsy
text of type string is truthy
undefined of type undefined is falsy
null of type object is falsy
 of type object is truthy
2,3 of type object is truthy
```

This example shows that arrays are [heterogeneous](../gloss/#g:heterogeneous),
i.e.,
that they can contain values of many different types
(including other arrays).
It also shows that `if` and `else` work as they do in other languages:
it's the truthiness of things that may be different.
For numbers,
0 is [falsy](../gloss/#g:falsy), all others are [truthy](../gloss/#g:truthy);
Similarly,
the empty string is falsy and all other strings are truthy.
`undefined` and `null` are both falsy,
as most programmers would expect.

But as the last two lines of output show,
an empty array is truthy,
which is different from its treatment in most programming languages.
The argument made by JavaScript's advocates is that an empty array is there,
it just happens to be empty,
but this behavior is still a common cause of bugs.
When testing an array,
check that `Array.length` is zero.
(Note that this is a [property](../gloss/#g:property),
not a [method](../gloss/#g:method),
i.e.,
it should be treated as a variable,
not called like a function.)

> **Safety Tip**
>
> Always use `===` (triple equals) and `!==` when testing for equality and inequality in JavaScript.
> `==` and `!=` do type conversion,
> which can produce some [ugly surprises](../legacy/#s:legacy-equality).

## Formatting Strings {#s:basics-formatting}

Rather than printing multiple strings and expressions,
we can [interpolate](../gloss/#g:string-interpolation) values into a back-quoted string.
(We have to use back quotes because this feature was added to JavaScript
long after the language was first created.)
As the example below shows,
the value to be interpolated is put in `${...}`,
and can be any valid JavaScript expression,
including a function or method call.

```js
for (let color of ['red', 'green', 'blue']) {
  const message = `color is ${color}`
  console.log(message, `and capitalized is ${color.toUpperCase()}`)
}
```
{: title="src/basics/formatting.js"}
```text
color is red and capitalized is RED
color is green and capitalized is GREEN
color is blue and capitalized is BLUE
```

## Objects {#s:basics-objects}

An [object](../gloss/#g:object) in JavaScript is a collection of key-value pairs,
and is equivalent in simple cases to what Python would call a dictionary.
The keys do not have to be strings,
but almost always are;
the values can be anything.
We can create an object by putting key-value pairs in curly brackets
with colons between the keys and values
and commas between the pairs:

```js
const creature = {
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
{: title="src/basics/objects.js"}
```text
creature is [object Object]
creature.genus is Callithrix
creature[order] is Primates
creature[family] is Callitrichidae
creature[genus] is Callithrix
creature[species] is Jacchus
```

The type of an object is always `object`.
We can get the value associated with a key using `object[key]`,
but if the key has a simple name,
we can use `object.key` instead.
Note that the square bracket form can be used with variables for keys,
but the dotted notation cannot:
i.e.,
`creature.genus` is the same as `creature['genus']`,
but the assignment `g = 'genus'` followed by `creature.g` does not work.

Because string keys are so common,
and because programmers use simple names so often,
JavaScript allows us to create objects without quoting the names of the keys:

```js
const creature = {
  order: 'Primates',
  family: 'Callitrichidae',
  genus: 'Callithrix',
  species: 'Jacchus'
}
```

`[object Object]` is not particularly useful output when we want to see what an object contains.
To get a more helpful string representation,
use `JSON.stringify(object)`:

```js
console.log(JSON.stringify(creature))
```
{: title="src/basics/objects.js"}
```text
{"order":"Primates","family":"Callitrichidae","genus":"Callithrix","species":"Jacchus"}
```

Here,
"JSON" stands for "JavaScript Object Notation";
we will learn more about it [later](../dataman/).

## Functions {#s:basics-functions}

Functions make it possible for mere mortals to understand programs
by allowing us to think about them one piece at a time.
Here is a function that finds the lowest and highest values in an array:

```js
function limits (values) {
  if (!values.length) {
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
{: title="src/basics/functions-classic.js"}

Its definition consists of the keyword `function`,
its name,
a parameterized list of [parameters](../gloss/#g:parameter) (which might be empty),
and its body.
We can use `return` to explicitly return a value at any time;
if nothing is returned,
the function's result is `undefined`.

One oddity of JavaScript is that almost anything can be compared to almost anything else.
Here are a few tests that demonstrate this:

```js
const allTests = [
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
{: title="src/basics/functions-classic.js"}
```text
limits of  are ,
limits of 9 are 9,9
limits of 3,30,300 are 3,300
limits of apple,Grapefruit,banana are Grapefruit,banana
limits of 3,apple,sub-array are 3,3
```

Programmers generally don't write functions this way any longer,
since it interacts in odd ways with other features of the language;
the [section on legacy issues](../legacy/#s:legacy-prototypes) explains why and how in more detail.
Instead,
most programmers now write [fat arrow functions](../gloss/#g:fat-arrow)
consisting of a parameter list,
the `=>` symbol,
and a body.
Fat arrow functions don't have names,
so the function must be assigned that to a constant or variable for later use:

```js
const limits = (values) => {
  if (!values.length) {
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
{: title="src/basics/functions-modern.js"}

No matter how functions are defined,
each one is a [scope](../gloss/#g:scope),
which means its parameters and any variables created inside it are [local](../gloss/#g:local-variable) to the function.
We will discuss scope in more detail [later](../callbacks/).

> **Stuck in the Past**
>
> Why did JavaScript introduce another syntax
> rather than fixing the behavior of those defined with `function`?
> The twin answers are that changes would break legacy programs that rely on the old behavior,
> and that the language's developers wanted to make it really easy to define little functions.
> Here and elsewhere,
> we will see how a language's history and the way it is used shape its evolution.

## Modules {#s:basics-modules}

As our programs grow larger,
we will want to put code in multiple files.
The unavoidable bad news is that JavaScript has several module systems:
Node still uses one called CommonJS,
but is converting to the modern standard called ES6,
so what we use on the command line is different from what we use in the browser (for now).

> **Ee Ess**
>
> JavaScript's official name is ECMAScript,
> though only people who use the word "datum" in everyday conversation ever call it that.
> Successive versions of the language are therefore known as ES5, ES6, and so on,
> except when they're referred to as (for example) ES2018.

Since we're going to build command-line programs before doing anything in the browser,
we will introduce Node's module system first.
We start by putting this code in a file called `utilities.js`:

```js
DEFAULT_BOUND = 3

const clip = (values, bound = DEFAULT_BOUND) => {
  let result = []
  for (let v of values) {
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
{: title="src/basics/utilities.js"}

The function definition is straightforward;
as you may have guessed, `bound = DEFAULT_BOUND` sets a default value for that parameter
so that `clip` can be called with just an array.
You may also have guessed that `Array.push` appends a value to the end of an array;
if you didn't,
well,
now you know.

What's more important is assigning an object to `module.exports`.
Only those things named in this object are visible to the outside world,
so `DEFAULT_BOUND` won't be.
Remember,
keys that are simple names don't have to be quoted,
so `clip: clip` means "associate a reference to the function `clip` with the string key `"clip"`.

To use our newly-defined module we must `require` it.
For example,
we can put this in `import.js`:

```js
const utilities = require('./utilities')

const data = [-1, 5, 3, 0, 10]
console.log(`clip(${data}) -> ${utilities.clip(data)}`)
console.log(`clip(${data}, 5) -> ${utilities.clip(data, 5)}`)
```
{: title="src/basics/import.js"}
```text
clip(-1,5,3,0,10) -> 0,1,2,3
clip(-1,5,3,0,10, 5) -> 0,1,2,3,4
```

`require` returns the object that was assigned to `module.exports`,
so if we have assigned its result to a variable called `utilities`,
we must then call our function as `utilities.clip`.
We use a relative path starting with `./` or `../` to import local files;
paths that start with names are taken from installed Node libraries.

## Exercises {#s:basics-exercises}

### Typeof

What kind of thing is `typeof`?
Is it an expression?
A function?
Something else?
(You might notice that `typeof typeof` is syntactically invalid.
In such circumstances,
an internet search engine is your friend,
as is the Mozilla Developer Network (MDN) JavaScript reference
at <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference>.

### Fill in the Blanks

Answer these questions about the program below:

1. What does `Array.push` do?
1. How does a `while` loop work?
1. What does `+=` do?
1. What does `Array.reverse` do, and what does it return?

```js
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
{: title="src/basics/table-of-squares.js"}
```text
square of 4 is 16
square of 3 is 9
square of 2 is 4
square of 1 is 1
square of 0 is 0
```

### What Is Truth?

Write a function called `isTruthy` that returns `true` for everything that JavaScript considers truthy,
and `false` for everything it considers `falsy` *except* empty arrays:
`isTruthy` should return `false` for those.

### Combining Different Types

What output would you expect from the code below?
Try running it and see whether the results match your expectations.
What are the implications of this behavior when working with real-world data?

```js
const first = [3, 7, 8, 9, 1]
console.log(`aggregating ${first}`)
let total = 0
for (let d of first) {
  total += d
}
console.log(total)

const second = [0, 3, -1, NaN, 8]
console.log(`aggregating ${second}`)
total = 0
for (let d of second) {
  total += d
}
console.log(total)
```
{: title="src/basics/aggregating.js"}

### What Does This Do?

Explain what is happening in the assignment statement that creates the constant `creature`.

```js
const genus = 'Callithrix'
const species = 'Jacchus'
const creature = {genus, species}
console.log(creature)
```
{: title="src/basics/implied.js"}
```text
{ genus: 'Callithrix', species: 'Jacchus' }
```

### What Does This Code Do?

Explain what is happening in the assignment statement in this program.
Use this technique to rewrite `src/basics/import.js`
so that `clip` can be called directly as `clip(...)` rather than `utilities.clip(...)`.

```js
const creature = {
  genus: 'Callithrix',
  species: 'Jacchus'
}
const {genus, species} = creature
console.log(`genus is ${genus}`)
console.log(`species is ${species}`)
```
{: title="src/basics/destructuring.js"}

### Return To Me, For My Heart Wants You Only

```js
const verbose_sum = (first, second) => {
  console.log(`Going to add ${first} to ${second}`)
  let total = first + second
  return total
  console.log(`Finished summing`)
}

var result = verbose_sum(3, 6)
console.log(result)
```

What output would you see in the console if you ran the code above?

1. `Going to add ${first} to ${second}` <br/> `9`
2. `Going to add 3 to 6` <br/> `9` <br/> `Finished summing`
3. `Going to add 3 to 6` <br/> `9`
4. `Going to add 3 to 6` <br/> `36`

{% include links.md %}
