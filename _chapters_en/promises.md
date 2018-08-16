---
permalink: "/en/promises/"
title: "Programming with Promises"
questions:
- "Does it have to hurt this much?"
keypoints:
- "Yes."
---

-   Callbacks quickly become complicated because of:
    -   Nesting: a delayed calculation that needs the result of a delayed calculation that needs...
    -   Error handling: who notices and takes care of errors?
    -   This is often a problem in real life too
-   Example: turn a bunch of CSV files into HTML pages
    -   Inputs: the name of a directory that contains one or more CSV files and the name of an output directory
    -   Result: output directory is replaced by one that has one HTML page per CSV file *and* an index page
-   Can do this with synchronous operations, but that's not the JavaScript Way [tm]
    -   By which we mean, doing it that way doesn't introduce you to tools we're going to need later
-   Try doing it with callbacks
    -   Can't create the output directory until the existing one has been emptied
    -   Can't generate the HTML pages until the output directory has been re-created
    -   Can't generate the index page until the CSV files have been processed
-   Instead of callbacks, use [promises](#g:promise)
-   And then use `async` and `await` to make things even easier
-   Three mechanisms because people learn as they go along, but the simple high-level ideas often don't make sense unless you understand how they work
    -   This is also often a problem in real life

## The Execution Queue {#s:promises-queue}

-   FIXME: explain execution queue <https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/>
-   Most functions execute in order

```js
[1000, 1500, 500].forEach(t => {
  console.log(t)
})
```
{: title=promises/not-callbacks-alone.js}
```output
1000
1500
500
```

-   A handful of built-in functions delay execution
    -   `setTimeout` is probably the most widely used

```js
[1000, 1500, 500].forEach(t => {
  console.log(`about to setTimeout for ${t}`)
  setTimeout(() => {console.log(`inside timer handler for ${t}`)}, t)
})
```
{: title=promises/callbacks-with-timeouts.js}
```output
about to setTimeout for 1000
about to setTimeout for 1500
about to setTimeout for 500
inside timer handler for 500
inside timer handler for 1000
inside timer handler for 1500
```

-   Setting a timeout of zero has the effect of deferring execution without delay

```js
[1000, 1500, 500].forEach(t => {
  console.log(`about to setTimeout for ${t}`)
  setTimeout(() => {console.log(`inside timer handler for ${t}`)}, 0)
})
```
{: title=promises/callbacks-with-zero-timeouts.js}
```output
about to setTimeout for 1000
about to setTimeout for 1500
about to setTimeout for 500
inside timer handler for 1000
inside timer handler for 1500
inside timer handler for 500
```

-   We can use this to build a generic non-blocking function

```js
const nonBlocking = (callback) => {
  setTimeout(callback, 0)
}

[1000, 1500, 500].forEach(t => {
  console.log(`about to do nonBlocking for ${t}`)
  nonBlocking(() => console.log(`inside callback for ${t}`))
})
```
{: title=promises/non-blocking.js}
```output
about to do nonBlocking for 1000
about to do nonBlocking for 1500
about to do nonBlocking for 500
inside callback for 1000
inside callback for 1500
inside callback for 500
```

-   Why bother?
    -   Because we may want to give something else a chance to run
-   Node provides `setImmediate` to do this for us
    -   And also `process.nextTick`, which doesn't do quite the same thing

```js
[1000, 1500, 500].forEach(t => {
  console.log(`about to do setImmediate for ${t}`)
  setImmediate(() => console.log(`inside immediate handler for ${t}`))
})
```
{: title=promises/set-immediate.js}
```output
about to do setImmediate for 1000
about to do setImmediate for 1500
about to do setImmediate for 500
inside immediate handler for 1000
inside immediate handler for 1500
inside immediate handler for 500
```

## Promises

-   Explain how promises work by building a very simple version
    -   Inspired by <https://levelup.gitconnected.com/understand-javascript-promises-by-building-a-promise-from-scratch-84c0fd855720>
-   FIXME: explain `promises/pledge.js` in detail

```js
class Pledge {
  constructor (action) {
    this.actionCallbacks = []
    this.errorCallback = () => {}
    action(this.onResolve.bind(this), this.onReject.bind(this))
  }

  then (thenHandler) {
    this.actionCallbacks.push(thenHandler)
    return this
  }

  catch (errorHandler) {
    this.errorCallback = errorHandler
    return this
  }

  onResolve (value) {
    let storedValue = value
    try {
      this.actionCallbacks.forEach((action) => {
        storedValue = action(storedValue)
      })
    } catch (error) {
      this.actionCallbacks = []
      this.onReject(error)
    }
  }

  onReject (error) {
    this.errorCallback(error)
  }
}
```
{: title=promises/pledge.js}

-   FIXME: Need to explain purpose of `this.method.bind(this)`: can this be motivated earlier?
-   Successful usage

```js
new Pledge((resolve, reject) => {
  console.log('1. top of action callback with double then and a catch')
  setTimeout(() => {
    console.log('1. about to call resolve callback')
    resolve('1. initial result')
    console.log('1. after resolve callback')
  }, 0)
  console.log('1. end of action callback')
}).then((value) => {
  console.log(`1. first then with "${value}"`)
  return '1. first then value'
}).then((value) => {
  console.log(`1. second then with "${value}" about to throw`)
  throw new Error(`1. exception from second then with "${value}"`)
}).catch((error) => {
  console.log(`1. in catch block with "${error}`)
})
```
{: title=promises/pledge.js}

-   An error case

```js
new Pledge((resolve, reject) => {
  console.log('2. top of action callback with deliberate error')
  setTimeout(() => {
    console.log('2. about to reject on purpose')
    reject('2. error on purpose')
  }, 0)
}).then((value) => {
  console.log(`2. should not be here with "${value}"`)
}).catch((error) => {
  console.log(`2. in error handler with "${error}"`)
})
```
{: title=promises/pledge.js}

-   Trace the output

```output
1. top of action callback with double then and a catch
1. end of action callback
2. top of action callback with deliberate error
1. about to call resolve callback
1. first then with "1. initial result"
1. second then with "1. first then value" about to throw
1. in catch block with "Error: 1. exception from second then with "1. first then value"
1. after resolve callback
2. about to reject on purpose
2. in error handler with "2. error on purpose"
```

## Using Promises

-   Count the number of lines in a set of files

-   Step 1: find input files

```js
const fs = require('fs-extra')
const glob = require('glob-promise')

const srcDir = process.argv[2]

glob(`${srcDir}/**/*.txt`)
  .then(files => console.log('glob', files))
  .catch(error => console.error(error))
```
{: title=promises/step-01.js}
```
$ node step-01.js .
glob [ './common-sense.txt',
  './jane-eyre.txt',
  './life-of-frederick-douglass.txt',
  './moby-dick.txt',
  './sense-and-sensibility.txt',
  './time-machine.txt' ]
```

-   Step 2: get the status of each file
-   This doesn't work because `fs.stat` is delayed

```js
...imports and arguments as before...

glob(`${srcDir}/**/*.txt`)
  .then(files => files.map(f => fs.stat(f)))
  .then(files => console.log('glob + files.map/stat', files))
  .catch(error => console.error(error))
```
{: title=promises/step-02.js}
```
$ node step-02.js .
glob + files.map/stat [ Promise { <pending> },
  Promise { <pending> },
  Promise { <pending> },
  Promise { <pending> },
  Promise { <pending> },
  Promise { <pending> } ]
```

-   Step 3: use `Promise.all` to wait for all stat promises to resolve

```js
...imports and arguments as before...

glob(`${srcDir}/**/*.txt`)
  .then(files => Promise.all(files.map(f => fs.stat(f))))
  .then(files => console.log('glob + Promise.all(files.map/stat)', files))
  .catch(error => console.error(error))
```
{: title=promises/step-03.js}
```
$ node step-03.js
glob + Promise.all(files.map/stat) [ Stats {
    dev: 16777220,
    mode: 33188,
    ...more information... },
    ...five more Stats objects...
]
```

-   Step 4: we need to remember the name of the file we stat'd, so we need to write our own function that returns a pair

```js
...imports and arguments as before...

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
{: title=promises/step-04.js}
```
$ node step-04.js .
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

-   Step 5: make sure we're only reading files

```js
...imports and arguments as before...

glob(`${srcDir}/**/*.txt`)
  .then(files => Promise.all(files.map(f => statPair(f))))
  .then(files => files.filter(pair => pair.stats.isFile()))
  .then(files => Promise.all(files.map(f => fs.readFile(f.filename, 'utf8'))))
  .then(contents => console.log('...readFile', contents.map(c => c.length)))
  .catch(error => console.error(error))
```
{: title=promises/step-05.js}
```
$ node step-05.js .
...readFile [ 148134, 1070331, 248369, 1276201, 706124, 204492 ]
```

-   Step 6: split into lines and count

```js
...imports and arguments as before...

const countLines = (text) => {
  return text.split('\n').length
}

glob(`${srcDir}/**/*.txt`)
  .then(files => Promise.all(files.map(f => statPair(f))))
  .then(files => files.filter(pair => pair.stats.isFile()))
  .then(files => Promise.all(files.map(f => fs.readFile(f.filename, 'utf8'))))
  .then(contents => contents.map(c => countLines(c)))
  .then(lengths => console.log('lengths', lengths))
  .catch(error => console.error(error))
```
{: title=promises/step-06.js}
```
$ node step-06.js .
lengths [ 2654, 21063, 4105, 22334, 13028, 3584 ]
```

{% include links.md %}
