---
title: "Callbacks"
questions:
- "What happens when a function is defined?"
- "How can I pass a function to another function?"
- "Why would I want to do that?"
- "What are higher-order functions?"
- "What higher-order functions do JavaScript arrays provide?"
- "What is a closure?"
- "When and why are closures useful?"
keypoints:
- "JavaScript stores the instructions making up a function in memory like any other object."
- "Function objects can be assigned to variables, put in lists, passed as arguments to other functions, etc."
- "Functions can be defined in place without ever being given a name."
- "A callback function is one that is passed in to another function for it to execute at a particular moment."
- "Functional programming uses higher-order functions on immutable data."
- "`Array.some` is true if any element in an array passes a test, while `Array.every` is true if they all do."
- "`Array.filter` selects elements of an array that pass a test."
- "`Array.map` creates a new array by transforming values in an existing one."
- "`Array.reduce` reduces an array to a single value."
- "A closure is a set of variables captured during the definition of a function."
---

JavaScript relies heavily on [callback functions](#g:callback-function):
Instead of a function giving us a result immediately,
we give it another function that tells it what to do next.
Many other languages use them as well,
but JavaScript is often the first place that programmers with data science backgrounds encounter them.
In order to understand how they work and how to use them,
we must first understand what actually happens when functions are defined and called.

## The Call Stack {#s:callbacks-callstack}

When JavaScript [parses](#g:parse) the expression `let name = "text"`,
it allocates a block of memory big enough for four characters
and stores a reference to that block of characters in the variable `name`.
We can show this by drawing a [memory diagram](#g:memory-diagram)
like the one in [f:callbacks-name-value](#FIG).

{% include figure.html id="f:callbacks-name-value" src="../../figures/callbacks-name-value.svg" caption="Name and Value" %}

When we write:

```js
oneMore = (x) => {
  return x + 1
}
```
{: title="callbacks/one-more.js"}

JavaScript allocates a block of memory big enough to store several instructions,
translates the text of the function into instructions,
and stores a reference to those instructions in the variable `oneMore`
([f:callbacks-one-more](#FIG)).

{% include figure.html id="f:callbacks-one-more" src="../../figures/callbacks-one-more.svg" caption="Functions in Memory" %}

The only difference between these two cases is what's on the other end of the reference:
four characters or a bunch of instructions that add one to a number.
This means that we can assign the function to another variable,
just as we would assign a number:

```js
const anotherName = oneMore
console.log(anotherName(5))
```
{: title="callbacks/one-more.js"}
```text
6
```

Doing this does *not* call the function:
as [f:callbacks-alias-function](#FIG) shows,
it creates a second name that refers to the same block of instructions.

{% include figure.html id="f:callbacks-alias-function" src="../../figures/callbacks-alias-function.svg" caption="Aliasing a Function" %}

As explained in [s:basics](#REF),
when JavaScript calls a function it assigns the arguments in the call to the function's parameters.
In order for this to be safe,
we need to ensure that there are no [name collisions](#g:name-collision),
i.e.,
that if there is a variable called `something` and one of the function's parameters is also called `something`,
the function will use the right one.
The way every modern language implements this is to use a [call stack](#g:call-stack).
Instead of putting all our variables in one big table,
we have one table for global variables
and one extra table for each function call.
This means that if we assign 100 to `x`,
call `oneMore(2 * x + 1)`,
and look at memory in the middle of that call,
we will see what's in [f:callbacks-call-stack](#FIG).

{% include figure.html id="f:callbacks-call-stack" src="../../figures/callbacks-call-stack.svg" caption="The Call Stack" %}

## Functions of Functions {#s:callbacks-func}

The call stack allows us to write and call functions
without worrying about whether we're accidentally going to refer to the wrong variable.
And since functions are just another kind of data,
we can pass one function into another.
For example,
we can write a function called `doTwice` that calls some other function two times:

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
{: title="callbacks/do-twice.js"}
```text
hello
hello
```

Again,
this is clearer when we look at the state of memory while `doTwice` is running
([f:callbacks-do-twice](#FIG)).

{% include figure.html id="f:callbacks-do-twice" src="../../figures/callbacks-do-twice.svg" caption="Functions of Functions" %}

This becomes more useful when the function or functions passed in have parameters of their own.
For example,
the function `pipeline` passes a value to one function,
then takes that function's result and passes it to a second,
and returns the final result:

```js
const pipeline = (initial, first, second) => {
  const temp = first(initial)
  return second(temp)
}
```
{: title="callbacks/two-functions.js"}

Let's use this to combine
a function that trims blanks off the starts and ends of strings
and another function that replaces spaces with dots:

```js
const trim = (text) => { return text.trim() }
const dot = (text) => { return text.replace(/ /g, '.') }

const original = '  this example uses text  '

const trimThenDot = pipeline(original, trim, dot)
console.log(`trim then dot: |${trimThenDot}|`)
```
{: title="callbacks/two-functions.js"}
```text
trim then dot: |this.example.uses.text|
```

During the call to `temp = first(initial)`,
but before a value has been returned to be assigned to `temp`,
memory looks like [f:callbacks-pipeline](#FIG).

{% include figure.html id="f:callbacks-pipeline" src="../../figures/callbacks-pipeline.svg" caption="Implementing a Pipeline" %}

Reversing the order of the functions changes the result:

```js
const dotThenTrim = pipeline(original, dot, trim)
console.log(`dot then trim: |${dotThenTrim}|`)
```
{: title="callbacks/two-functions.js"}
```text
dot then trim: |..this.example.uses.text..|
```

We can make a more general pipeline by passing an array of functions:

```js
const pipeline = (initial, operations) => {
  let current = initial
  for (let op of operations) {
    current = op(current)
  }
  return current
}
```
{: title="callbacks/general-pipeline.js"}

Let's add a function `double` to our suite of text manglers:

```js
const double = (text) => { return text + text }
```
{: title="callbacks/general-pipeline.js"}

and then try it out:

```js
const original = ' some text '
const final = pipeline(original, [double, trim, dot])
console.log(`|${original}| -> |${final}|`)
```
{: title="callbacks/general-pipeline.js"}
```text
| some text | -> |some.text..some.text|
```

## Anonymous Functions {#s:callbacks-anonymous}

Remember the function `oneMore`?
We can pass it a value that we have calculated on the fly:

```js
oneMore = (x) => {
  return x + 1
}

console.log(oneMore(3 * 2))
```
{: title="callbacks/on-the-fly.js"}
```text
7
```

Behind the scenes,
JavaScript allocates a nameless temporary variable to hold the value of `3 * 2`,
then passes a reference to that temporary variable into `oneMore`.
We can do the same thing with functions,
i.e., create one on the fly without giving it a name as we're passing it into some other function.
For example,
suppose that instead of pushing one value through a pipeline of functions,
we want to call a function once for each value in an array:

```js
const transform = (values, operation) => {
  let result = []
  for (let v of values) {
    result.push(operation(v))
  }
  return result
}

const data = [10, 20, 30]
const result = transform(data, oneMore)
console.log(result)
```
{: title="callbacks/transform.js"}
```text
[ 11, 21, 31 ]
```

Adding one to a number is such a simple thing to do that it's hardly worth giving the function a name,
so let's define it on the fly:

```js
result = transform(data, (x) => {return x + 1})
console.log(result)
```
{: title="callbacks/transform.js"}
```text
[ 11, 21, 31 ]
```

A function that is created this way is sometimes called an [anonymous function](#g:anonymous-function),
since its creator doesn't give it a name.
When JavaScript programmers use the term "callback function",
they usually mean a function defined and used like this.

## Functional Programming {#s:callbacks-functional}

[Functional programming](#g:functional-programming) is a style of programming
that relies heavily on [higher-order functions](#g:higher-order-function) like `pipeline`
that take other functions as parameters.
In addition,
functional programming expects that functions won't modify data in place,
but will instead create new data from old.
For example,
a true believer in functional programming would be saddened by this:

```js
const impure = (values) => {
  for (let i in values) {
    values[i] += 1
  }
}
```
{: title="callbacks/impure.js"}

<!-- == noindent -->
and would politely, even patiently, suggest that it be rewritten like this:

```js
const pure = (values) -> {
  result = []
  for (let v of values) {
    result.push(v + 1)
  }
  return result
}
```
{: title="callbacks/pure.js"}

JavaScript arrays provide several methods to support functional programming.
For example,
`Array.some` returns `true` if *any* element in an array passes a test,
while `Array.every` returns `true` if *all* elements in an array pass a test.

Here's how they work:

```js
const data = ['this', 'is', 'a', 'test']
console.log('some longer than 3:',
            data.some((x) => { return x.length > 3 }))
console.log('all longer than 3:',
            data.every((x) => { return x.length > 3 }))
```
{: title="callbacks/some-every.js"}
```text
some longer than 3: true
all longer than 3: false
```

`Array.filter` creates a new array containing only values that pass a test:

```js
const data = ['this', 'is', 'a', 'test']
console.log('those longer than 3:',
            data.filter((x) => { return x.length > 3 }))
```
{: title="callbacks/filter.js"}
```text
those longer than 3: [ 'this', 'test' ]
```

So do all of the elements with more than 3 characters start with a 't'?

```js
const data = ['this', 'is', 'a', 'test']
const result = data
               .filter((x) => { return x.length > 3 })
               .every((x) => { return x[0] === 't' })
console.log(`all longer than 3 start with t: ${result}`)
```
{: title="callbacks/filter-every.js"}
```text
all longer than 3 start with t: true
```

`Array.map` creates a new array by calling a function for each element of an existing array:

```js
const data = ['this', 'is', 'a', 'test']
console.log('shortened', data.map((x) => { return x.slice(0, 2) }))
```
{: title="callbacks/map.js"}
```text
shortened [ 'th', 'is', 'a', 'te' ]
```

And finally,
`Array.reduce` reduces an array to a single value
using a combining function and a starting value.
The combining function must take two values,
which are the current running total and the next value from the array;
if the array is empty,
`Array.reduce` returns the starting value.

```js
const data = ['this', 'is', 'a', 'test']

const concatFirst = (accumulator, nextValue) => {
  return accumulator + nextValue[0]
}
let acronym = data.reduce(concatFirst, '')
console.log(`acronym of ${data} is ${acronym}`)

// In one step.
acronym = data.reduce((accum, next) => {
  return accum + next[0]
}, '')
console.log('all in one step:', acronym)
```
{: title="callbacks/reduce.js"}
```text
acronym of this,is,a,test is tiat
all in one step: tiat
```

The indentation of the "in one step" call may look a little odd,
but this is the style the JavaScript community has settled on.

## Closures {#s:callbacks-closures}

The last tool we need to introduce is an extremely useful side-effect of the way memory is handled
called a [closure](#g:closure).
The easiest way to explain it is by example.
We have already defined a function called `pipeline` that chains any number of other functions together:

```js
const pipeline = (initial, operations) => {
  let current = initial
  for (let op of operations) {
    current = op(current)
  }
  return current
}
```
{: title="callbacks/general-pipeline.js"}

However,
`pipeline` only works if each function in the array `operations` has a single parameter.
If we want to be able to add 1,
add 2,
and so on,
we have to write separate functions,
which is annoying.

A better option is to write a function that creates the function we want:

```js
const adder = (increment) => {
  const f = (value) => {
    return value + increment
  }
  return f
}

const add_1 = adder(1)
const add_2 = adder(2)
console.log(`add_1(100) is ${add_1(100)}, add_2(100) is ${add_2(100)}`)
```
{: title="callbacks/adder.js"}
```text
add_1(100) is 101, add_2(100) is 102
```

The best way to understand what's going on is to draw a step-by-step memory diagram.
In step 1, we call `adder(1)`
([f:callbacks-adder-1](#FIG)).
`adder` creates a new function that includes a reference to that 1 we just passed in
([f:callbacks-adder-2](#FIG)).
In step 3,
`adder` returns that function, which is assigned to `add_1`
([f:callbacks-adder-3](#FIG)).
Crucially,
the function that `add_1` refers to still has a reference to the value 1,
even though that value isn't referred to any longer by anyone else.

{% include figure.html id="f:callbacks-adder-1" src="../../figures/callbacks-adder-1.svg" caption="Creating an Adder (Step 1)" %}

{% include figure.html id="f:callbacks-adder-2" src="../../figures/callbacks-adder-2.svg" caption="Creating an Adder (Step 2)" %}

{% include figure.html id="f:callbacks-adder-3" src="../../figures/callbacks-adder-3.svg" caption="Creating an Adder (Step 3)" %}

In steps 4-6,
we repeat these three steps to create another function that has a reference to the value 2,
and assign that function to `add_2`
([f:callbacks-adder-4](#FIG)).

{% include figure.html id="f:callbacks-adder-4" src="../../figures/callbacks-adder-4.svg" caption="Creating an Adder (Steps 4-6)" %}

When we now call `add_1` or `add_2`,
they add the value passed in and the value they've kept a reference to.

This trick of capturing a reference to a value inside something else
is called a [closure](#g:closure).
It works because JavaScript holds on to values as long as anything,
anywhere,
still refers to them.
Closures solve our pipeline problem by letting us define little functions
on the fly
and give them extra data to work with:

```js
const result = pipeline(100, [adder(1), adder(2)])
console.log(`adding 1 and 2 to 100 -> ${result}`)
```
{: title="callbacks/closure.js"}
```text
adding 1 and 2 to 100 -> 103
```

Again, `adder(1)` and `adder(2)` do not add anything to anything:
they define new (unnamed) functions that add 1 and 2 respectively when called.

Programmers often go one step further and define little functions like this inline:

```js
const result = pipeline(100, [(x) => x + 1, (x) => x + 2])
console.log(`adding 1 and 2 to 100 -> ${result}`)
```
{: title="callbacks/closure-inline.js"}
```text
adding 1 and 2 to 100 -> 103
```

As this example shows,
if the body of a function is a single expression,
it doesn't have to be enclosed in `{...}` and `return` doesn't need to be used.

## Exercises {#s:callbacks-exercises}

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
})
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

<!-- == noindent -->
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

You will probably want to use `Array.reduce` to generate the sequence numbers.

{% include links.md %}
