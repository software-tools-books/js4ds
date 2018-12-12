---
permalink: "/en/promises/"
title: "Promises"
questions:
- "How does JavaScript implement delayed computation?"
- "Is there an easier way to handle delayed computation?"
- "How can a program wait for many promises to complete, or for one promise in a set to complete?"
- "Is there an even easier way to manage all of this?"
keypoints:
- "JavaScript keeps an execution queue for delayed computations."
- "Use promises to manage delayed computation instead of raw callbacks."
- "Use a callback with two arguments to handle successful completion (resolve) and unsuccessful completion (reject) of a promise."
- "Use `then` to express the next step after successful completion and `catch` to handle errors."
- "Use `Promise.all` to wait for all promises in a list to complete and `Promise.race` to wait for the first promise in a set to complete."
- "Use `await` to wait for the result of a computation."
- "Mark functions that can be waited on with `async`."
---

By now we have got used to providing callback functions as arguments to other
functions.
Callbacks quickly become complicated because of:

- Nesting: a delayed calculation may need the result of a delayed calculation that needs...
- Error handling: who notices and takes care of errors?
  (This is often a problem in real life too.)

For example,
suppose we want to turn a set of CSV files into HTML pages.
The inputs to our function are the name of a directory that contains one or more CSV files
and the name of an output directory;
the desired results are
that the output directory is created if it doesn't already exist,
that one HTML file is created for each CSV file,
that any HTML files in the directory that *don't* correspond to CSV files are removed,
and that an index page is created with links to all the pages.

We can do this with synchronous operations,
but that's not the JavaScript way
(by which we mean that doing it that way won't introduce you to tools we're going to need later).
We can also try doing it with callbacks, but:

- we can't create the output directory until the existing one has been emptied;
- can't generate the HTML pages until the output directory has been re-created; and
- we can't generate the index page until the CSV files have been processed.

Instead of a tangled nest of callbacks,
it's better to use [promises](../gloss/#g:promise),
and then to use `async` and `await` to make things even easier.
JavaScript offers three mechanisms because
its developers have invented better ways to do things as the language has evolved,
but the simple high-level ideas often don't make sense unless you understand how they work.
(This too is often a problem in real life.)

## The Execution Queue {#s:promises-queue}

In order for any of what follows to make sense,
it's vital to understand JavaScript's [event loop](../gloss/#g:event-loop),
a full explanation of which can be found [here][event-loop].
Most functions execute in order:

```js
[1000, 1500, 500].forEach(t => {
  console.log(t)
})
```
{: title="src/promises/not-callbacks-alone.js"}
```text
1000
1500
500
```

However,
a handful of built-in functions delay execution:
instead of running right away,
they add a callback to a list that the JavaScript interpreter uses
to keep track of things that want to be run.
When one task finishes,
the interpreter takes the next one from this queue and runs it.

`setTimeout` is one of the most widely used functions of this kind.
Here it is in operation:

```js
[1000, 1500, 500].forEach(t => {
  console.log(`about to setTimeout for ${t}`)
  setTimeout(() => {console.log(`inside timer handler for ${t}`)}, t)
})
```
{: title="src/promises/callbacks-with-timeouts.js"}
```text
about to setTimeout for 1000
about to setTimeout for 1500
about to setTimeout for 500
inside timer handler for 500
inside timer handler for 1000
inside timer handler for 1500
```

That's not surprising:
if we ask JavaScript to delay execution,
execution is delayed.
What may be surprising is that setting a timeout of zero also defers execution:

```js
const values = [1000, 1500, 500]
console.log('starting...')
values.forEach(t => {
  console.log(`about to setTimeout for ${t}`)
  setTimeout(() => {console.log(`inside timer handler for ${t}`)}, 0)
})
console.log('...finishing')
```
{: title="src/promises/callbacks-with-zero-timeouts.js"}
```text
starting...
about to setTimeout for 1000
about to setTimeout for 1500
about to setTimeout for 500
...finishing
inside timer handler for 1000
inside timer handler for 1500
inside timer handler for 500
```

Here's what the run queue looks like just before the program prints `...finishing`:

<figure id="f:promises-queue.svg">
  <figcaption>Run Queue</figcaption>
  <img src="../../files/promises-queue.svg" />
</figure>

We can use `setTimeout` to build a generic non-blocking function:

```js
const nonBlocking = (callback) => {
  setTimeout(callback, 0)
}

['a', 'b', 'c'].forEach(val => {
  console.log(`about to do nonBlocking for ${val}`)
  nonBlocking(() => console.log(`inside callback for ${val}`))
})
```
{: title="src/promises/non-blocking.js"}
```text
about to do nonBlocking for a
about to do nonBlocking for b
about to do nonBlocking for c
inside callback for a
inside callback for b
inside callback for c
```

Why bother doing this?
Because we may want to give something else a chance to run.
In particular,
file I/O and anything involving a network request are incredibly slow from a computer's point of view.
[If a single CPU cycle was one second long][cpu-second],
then getting data from RAM would take several minutes,
getting it from a solid-state disk would take six to eight days,
and getting it over the network is the equivalent of eight years.
Rather than wasting that time,
JavaScript is designed to let us (or our browser) switch tasks and do something else.

Using a timeout of zero is a clever trick,
but Node provides another function called `setImmediate` to do this for us.
(There is also `process.nextTick`,
which doesn't do quite the same thing.
You should probably not use it.)

```js
['a', 'b', 'c'].forEach(val => {
  console.log(`about to do setImmediate for ${val}`)
  setImmediate(() => console.log(`inside immediate handler for ${val}`))
})
```
{: title="src/promises/set-immediate.js"}
```text
about to do setImmediate for a
about to do setImmediate for b
about to do setImmediate for c
inside immediate handler for a
inside immediate handler for b
inside immediate handler for c
```

## Promises {#s:promises-promises}

Recent versions of JavaScript encourage programmers to use [promises](../gloss/#g:promise)
to manage delayed actions.
For example,
if we want to find the size of a file,
we can write this:

```js
const fs = require('fs-extra')
fs.stat('moby-dick.txt').then((stats) => console.log(stats.size))
```
{: title="src/promises/promise-stats.js"}
```text
1276201
```

`fs-extra.stat` will eventually produce some statistics about the file,
but this will take a while,
so `fs-extra.stat` returns a object of the class `Promise` right away.
`Promise` has a method `then` that takes a callback as an argument and stores it in the promise object.
When the `stat` call completes,
the remembered callback is called,
and passed yet another object with statistics about the file (including its size).

To understand this a little better,
let's create our own promise to fetch a file from the web:

```js
const fetch = require('node-fetch')

const prom = new Promise((resolve, reject) => {
  fetch('https://api.nasa.gov/neo/rest/v1/feed?api_key=DEMO_KEY&start_date=2018-08-20')
  .then((response) => {
    if (response.status === 200) {
      resolve('fetched page successfully')
    }
  })
}).then((message) => console.log(message))
```
{: title="src/promises/nasa-fetch.js"}

This code constructs a new `Promise` object.
The constructor takes one argument;
this must be a callback function of two arguments,
which by convention are called `resolve` and `reject`.
Inside the body of the callback,
we call `resolve` to return a value if and when everything worked as planned.
That value is then passed to the `then` method of the `Promise`.

This may seem a roundabout way of doing things,
but it solves several problems at once.
The first and most important is error handling:
if something goes wrong inside the callback passed to `Promise`'s constructor,
we can call `reject` instead of `resolve`.
Just as `then` handles whatever we pass to `resolve`,
`Promise` defines a method called `catch` to handle whatever is passed to `reject`.
We can therefore build a slightly more robust version of our data fetcher
that will report something sensible if we mis-type a year as `2108`:

```js
const fetch = require('node-fetch')

new Promise((resolve, reject) => {
  fetch('https://api.nasa.gov/neo/rest/v1/feed?api_key=DEMO_KEY&start_date=20-08-2108')
  .then((response) => {
    if (response.status === 200) {
      resolve('fetched page successfully')
    }
    else {
      reject(Error(`got HTTP status code ${response.status}`))
    }
  })
}).then((message) => console.log(message))
.catch((error) => console.log(error.message))
```
{: title="src/promises/nasa-catch.js"}
```text
got HTTP status code 400
```

(Note that we didn't assign our Promise object to a variable in the example above.
We can create promises on the fly if we need them only to define behaviour on
successful completion/exception and won't need to refer to them again later.)
What makes this all work is that a promise is an object.
Here's what's in memory just after this promise has been created:

<figure id="f:promises-object-a">
  <figcaption>Promises as Objects (after creation)</figcaption>
  <img src="../../files/promises-object-a.svg" />
</figure>

There are a lot of arrows in this diagram,
but they all serve a purpose:

-   The promise has three fields:
    the initial action (which is the callback passed to the constructor),
    the action to be taken if everything succeeds,
    and the action to be taken if there's an error.
-   The success and error actions are empty,
    because the initial action hasn't executed yet.

Once the promise is created,
the program calls its `then` and `catch` methods in that order,
giving each a callback.
This happens *before* the callback passed to the constructor
(i.e., the initial action) is executed,
and leaves the promise in this state:

<figure id="f:promises-object-b">
  <figcaption>Promises as Objects (after then and catch)</figcaption>
  <img src="../../files/promises-object-b.svg" />
</figure>

Calling `then` and `catch` assigns callbacks to the success action and error action members of the promise object.
Those methods are then passed into the initial action callback as `resolve` and `reject`,
i.e.,
if `resolve` is called because the page was fetched successfully,
what's actually called is the promise's success action,
which is the callback that was given to `then`.
If `reject` is called,
on the other hand,
it triggers execution of the error action,
which is the callback that was passed to `catch`.

Yes,
this is complicated---so complicated that another layer
(which we will look at [soon](#s:promises-async-await))
has been added to JavaScript to hide these details.
Without this complexity,
though,
it's extremely difficult to handle errors from delayed computations.
If we try this, using JavaScript's `try {...} catch {...}` syntax for handling exceptions:

```js
const fetch = require('node-fetch')

try {
  fetch('https://api.nasa.gov/neo/rest/v1/feed?api_key=DEMO_KEY&start_date=20-08-2108')
}
catch (err) {
  console.log(err)
}
```
{: title="src/promises/try-catch.js"}

then the error message won't appear
because the call to `fetch` doesn't raise an exception right away.

Going back to the `fs-extra.stat` example above,
what if we want to process multiple files,
e.g.,
calculate their total size?
We could write a loop:

```js
const fs = require('fs-extra')

let total_size = 0
const files = ['jane-eyre.txt', 'moby-dick.txt', 'life-of-frederick-douglass.txt']
for (let fileName of files) {
  fs.stat(fileName).then((stats) => {
    total_size += stats.size
  })
}
console.log(total_size)
```
{: title="src/promises/promise-loop.js"}

but this doesn't work:
the `stat` in each iteration is executed asynchronously,
so the loop finishes and the script prints a total size of zero
before any of the promised code has run.

Plan B is to chain the promises together
to ensure that each executes only after the last has resolved:

```js
const fs = require('fs-extra')

let total_size = 0
new Promise((resolve, reject) => {
  fs.stat('jane-eyre.txt').then((jeStats) => {
    fs.stat('moby-dick.txt').then((mdStats) => {
      fs.stat('life-of-frederick-douglass.txt').then((fdStats) => {
        resolve(jeStats.size + mdStats.size + fdStats.size)
      })
    })
  })
}).then((total) => console.log(total))
```
{: title="src/promises/promise-nest.js"}

but this obviously doesn't handle an arbitrary number of files,
since we have to write one level of nesting for each file.
It's also potentially inefficient,
since we could be waiting for one promise to complete
while other promises further down are ready to be processed.

The answer is `Promise.all`,
which returns an array of results from completed promises after all of them have resolved.
The order of results corresponds to the order of the promises in the input array,
which makes processing straightforward:

```js
const fs = require('fs-extra')

let total_size = 0
const files = ['jane-eyre.txt', 'moby-dick.txt', 'life-of-frederick-douglass.txt']
Promise.all(files.map(f => fs.stat(f))).
  then(stats => stats.reduce((total, s) => {return total + s.size}, 0)).
  then(console.log)
```
{: title="src/promises/promise-all.js"}
```text
2594901
```

We can also use `Promise.race`,
which takes an array of promises and returns the result of the first one to complete.

## Using Promises {#s:promises-usage}

Promises don't really make sense until we start to use them,
so let's try counting the number of lines in a set of files
that are larger than a specified threshold.
This is a slightly complex example but we will go through and build it up step-by-step.
Step 1 is to find the input files:

```js
const fs = require('fs-extra')
const glob = require('glob-promise')

const srcDir = process.argv[2]

glob(`${srcDir}/**/*.txt`)
  .then(files => console.log('glob', files))
  .catch(error => console.error(error))
```
{: title="src/promises/step-01.js"}
```text
glob [ './common-sense.txt',
  './jane-eyre.txt',
  './life-of-frederick-douglass.txt',
  './moby-dick.txt',
  './sense-and-sensibility.txt',
  './time-machine.txt' ]
```

Step 2 is to get the status of each file.
This approach doesn't work because `fs.stat` is delayed:

```js
// ...imports and arguments as before...

glob(`${srcDir}/**/*.txt`)
  .then(files => files.map(f => fs.stat(f)))
  .then(files => console.log('glob + files.map/stat', files))
  .catch(error => console.error(error))
```
{: title="src/promises/step-02.js"}
```text
glob + files.map/stat [ Promise { <pending> },
  Promise { <pending> },
  Promise { <pending> },
  Promise { <pending> },
  Promise { <pending> },
  Promise { <pending> } ]
```

Step 3 is to use `Promise.all` to wait for all these promises to resolve:

```js
// ...imports and arguments as before...

glob(`${srcDir}/**/*.txt`)
  .then(files => Promise.all(files.map(f => fs.stat(f))))
  .then(files => console.log('glob + Promise.all(files.map/stat)', files))
  .catch(error => console.error(error))
```
{: title="src/promises/step-03.js"}
```text
glob + Promise.all(files.map/stat) [ Stats {
    dev: 16777220,
    mode: 33188,
    ...more information... },
    ...five more Stats objects...
]
```

In step 4,
we remember that we need to keep track of the names of the files we are looking at,
so we need to write our own function that returns an object with two keys
(one for the filename, and one for the stats).
As described [previously](../pages/),
the notation `{a, b}` produces an object `{"a": a, "b", b}`:

```js
// ...imports and arguments as before...

const statPair = (filename) => {
  return new Promise((resolve, reject) => {
    fs.stat(filename)
      .then(stats => resolve({filename, stats}))
      .catch(error => reject(error))
  })
}

glob(`${srcDir}/**/*.txt`)
  .then(files => Promise.all(files.map(f => statPair(f))))
  .then(files => console.log('glob + Promise.all(files.map/statPair)', files))
  .catch(error => console.error(error))
```
{: title="src/promises/step-04.js"}
```text
glob + Promise.all(files.map/statPair) [ { filename: './common-sense.txt',
    stats:
     Stats {
       dev: 16777220,
       mode: 33188,
       ...more information... }
     },
     ...five more (filename, Stats) pairs...
]
```

Step 5 is to make sure that
we're only working with files more than 100,000 characters long:

```js
// ...imports and arguments as before...

glob(`${srcDir}/**/*.txt`)
  .then(files => Promise.all(files.map(f => statPair(f))))
  .then(files => files.filter(pair => pair.stats.size > 100000))
  .then(files => Promise.all(files.map(f => fs.readFile(f.filename, 'utf8'))))
  .then(contents => console.log('...readFile', contents.map(c => c.length)))
  .catch(error => console.error(error))
```
{: title="src/promises/step-05.js"}
```text
...readFile [ 148134, 1070331, 248369, 1276201, 706124, 204492 ]
```

In step 6,
we split each file's content into lines and count:

```js
// ...imports and arguments as before...

const countLines = (text) => {
  return text.split('\n').length
}

glob(`${srcDir}/**/*.txt`)
  .then(files => Promise.all(files.map(f => statPair(f))))
  .then(files => files.filter(pair => pair.stats > 100000))
  .then(files => Promise.all(files.map(f => fs.readFile(f.filename, 'utf8'))))
  .then(contents => contents.map(c => countLines(c)))
  .then(lengths => console.log('lengths', lengths))
  .catch(error => console.error(error))
```
{: title="src/promises/step-06.js"}
```text
lengths [ 2654, 21063, 4105, 22334, 13028, 3584 ]
```

There's a lot going on in the example above
but the important points are:

- Promises always return another `Promise` object.
- This allows us to chain multiple `then` calls.
- This chain is formed of processes that will each wait to run until their predecessor has completed.
- A single `catch` method works to handle exceptions raised by *any* of the previous steps.

## `async` and `await` {#s:promises-async-await}

Programmers are never content to leave well enough alone,
so the latest version of JavaScript offers yet another tool for managing asynchronous computation.
As we saw above,
the result of `Promise.then` is another promise,
which allows us to create long chains of `.then(...).then(...).then(...)` calls.
It works,
but it isn't the most readable of notations and has been known to create a feeling of being trapped.

We can avoid this using two new keywords, `async` and `await`.
`async` tells JavaScript that a function is asynchronous,
i.e.,
that it might want to wait for something to complete.
Inside an asynchronous function,
`await` tells JavaScript to act as if it had waited for something to finish.
We use the two together like this:

```js
const fs = require('fs-extra')

const statPairAsync = async (filename) => {
  const stats = await fs.stat(filename)
  return {filename, stats}
}

statPairAsync('moby-dick.txt').then((white_whale) => console.log(white_whale.stats))
```
{: title="src/promises/async-await.js"}

An `async` function still returns a `Promise`,
but we can chain those promises together with other `async` functions using `await`,
which collects the result returned by a resolved promise.
As before, we can use `.catch` to handle any errors thrown.

Let's use these to convert the complete example from the previous section:

```js
const fs = require('fs-extra')
const glob = require('glob-promise')

const statPairAsync = async (filename) => {
  const stats = await fs.stat(filename)
  return {filename, stats}
}

const countLines = (text) => {
  return text.split('\n').length
}

const processFiles = async (globpath) => {
  const filenames = await glob(globpath)
  const pairs = await Promise.all(filenames.map(f => statPairAsync(f)))
  const filtered = pairs.filter(pair => pair.stats.size > 100000)
  const contents = await Promise.all(filtered.map(f => fs.readFile(f.filename, 'utf8')))
  const lengths = contents.map(c => countLines(c))
  console.log(lengths)
}

const srcDir = process.argv[2]

processFiles(`${srcDir}/**/*.txt`)
  .catch(e => console.log(e.message))
```
{: title="src/promises/async-await-example.js"}

Using `async` and `await` lets us avoid long `then` chains;
unless and until JavaScript allows us to define operators like R's `%>%` pipe operator,
they are probably the easiest way to write readable code.
Note,
though,
that we can only use `await` inside `async` functions:
JavaScript will report a syntax error if we use them elsewhere.
In particular,
we cannot use them interactively unless we wrap whatever we want to do in a wee function.

## Exercises {#s:promises-exercises}

### What's Going On?

This code runs fine:

```js
[500, 1000].forEach(t => {
  console.log(`about to setTimeout for ${t}`)
  setTimeout(() => {console.log(`inside timer handler for ${t}`)}, 0)
})
```

but this code fails:

```js
console.log('starting...')
[500, 1000].forEach(t => {
  console.log(`about to setTimeout for ${t}`)
  setTimeout(() => {console.log(`inside timer handler for ${t}`)}, 0)
})
```

Why?

### A Stay of Execution

Insert `console.log('This is a sharp Medicine, but it is a Physician for all diseases and miseries.')`
in the appropriate place in the code block below so that the output reads

```
Waiting...
This is a sharp Medicine, but it is a Physician for all diseases and miseries.
Waiting...
Finished.
```

```js
const holdingMessage = () => {
  console.log('Waiting...')
}

const swingAxe = () => {
  setTimeout(() => {
    holdingMessage()
    console.log('Finished.')
  }, 100)
  holdingMessage()
}

swingAxe()
```

### A Synchronous or Asynchronous?

Which of these functions would you expect to be asynchronous?
How can you tell?
Does it matter?
And, if so, what is a good strategy to find out for sure if a function is asynchronous?

1. `findNearestTown(coords)`: given a set of coordinates (`coords`) in Brazil,
   looks up and returns the name of the nearest settlement with an estimated population greater than 5000.
   The function throws an error if `coords` fall outside Brazil.
2. `calculateSphereVolume(r)`: calculates and returns the volume of a sphere with radius `r`.
3. `calculateRoute(A,B)`: returns all possible routes by air between airports `A` and `B`,
   including direct routes and those with no more than 2 transfers.

### Handling Exceptions

What (if any) output would you expect to see in the console
when the code below is executed?

```js
const checkForBlanks = (inputValue) => {
  return new Promise((resolve, reject) => {
    if (inputValue === '') {
      reject(Error("Blank values are not allowed"))
    } else {
      resolve(inputValue)
    }
  })
}

new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(Error('Timed out!'))
  }, 1000)
  resolve('')
}).then(
  output => checkForBlanks(output), error => console.log(error.message)).then(
    checkedOutput => console.log(checkedOutput)).catch(
      error => console.log(error.message))
```

1. `Timed out!`
2. blank output
3. `Blank values are not allowed`
4. a new `Promise` object

### Empty Promises

Fill in the blanks (`___`)in the code block below so that
the function returns `Array[7, 8, 2, 6, 5]`.

```js
const makePromise = (someInteger) => {
  return ___ Promise((resolve, reject) => {
    setTimeout(___(someInteger), someInteger * 1000)
  })
}
Promise.___([makePromise(7), makePromise(___), makePromise(2), makePromise(6), makePromise(5)]).then(
  numbers => ___(numbers))
```

Now adapt the function so that it returns only `2`.
(Hint: you can achieve this by changing only one of the blank fields.)

### `async`, Therefore I Am

Using `async` and `await`,
convert the completed function above into an asynchronous function with the same behaviour and output.
Do you find your solution easier to read and follow than the original version?
Do you think that that is only because you wrote this version?

{% include links.md %}
