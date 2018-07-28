---
permalink: "/en/oop/"
title: "Object-Oriented Programming"
questions:
- "How can I use classes to keep code and data together?"
- "What are the benefits of doing this?"
- "How can I create an object from a class?"
- "How can I initialize that object?"
- "How can I create new classes from old?"
- "How does JavaScript decide what to do when two classes define the same thing?"
- "When should I create new classes and when should I combine existing ones?"
- "How can old code use new code?"
keypoints:
- "Create classes to define combinations of data and behavior."
- "Use the class's constructor to initialize objects."
- "`this` refers to the current object."
- "Use polymorphism to express common behavior patterns."
- "Extend existing classes to create new ones-sometimes."
- "Override methods to change or extend their behavior."
- "Creating extensible systems by defining interfaces and protocols."
---

- Making new code use old code is easy
- How can we make old code use new code without rewriting?
- Objects!

## Doing It By Hand {#s:oop-manual}

- An object is a set of key/value pairs
- Values can be functions
- So have data carry around functions that work on it

```js
const square = {
  name: 'square',
  size: 5,
  area: (it) => { return it.size * it.size },
  perimeter: (it) => { return 4 * it.size }
}
```
{: title="src/oop/clumsy-objects.js"}

- Pass the object itself into the function

```js
const a = square.area(square)
console.log(`area of square is ${a}`)
```
{: title="src/oop/clumsy-objects.js"}
```text
area of square is 25
```

- This seems like a lot of work
- But it allows us to handle many different kinds of things in the same way

```js
const circle = {
  name: 'circle',
  radius: 3,
  area: (it) => { return Math.PI * it.radius * it.radius },
  perimeter: (it) => { return 2 * Math.PI * it.radius }
}

const rectangle = {
  name: 'rectangle',
  width: 2,
  height: 3,
  area: (it) => { return it.width * it.height },
  perimeter: (it) => { return 2 * (it.width + it.height) }
}

const everything = [square, circle, rectangle]
for (let thing of everything) {
  const a = thing.area(thing)
  const p = thing.perimeter(thing)
  console.log(`${thing.name}: area ${a} perimeter ${p}`)
}
```
{: title="src/oop/clumsy-objects.js"}
```text
square: area 25 perimeter 20
circle: area 28.274333882308138 perimeter 18.84955592153876
rectangle: area 6 perimeter 10
```

- As long as we only use the value `name` and the functions `area` and `perimeter`
  we don't need to know what kind of thing we're actually working with
- [Polymorphism](#g:polymoprhism)

- But:
  - Building every object by hand is painful
  - Calling `it.function(it)` is clumsy

## Classes {#s:oop-classes}

- JavaScript solved these problems using [prototypes](#g:prototype)
  - Which turned out to be [clumsy and confusing](../legacy/#prototypes)
- Most object-oriented languages use [classes](#g:class)
  - These have been added to JavaScript ES6
  - We will only use them

```js
class Square {
  constructor (size) {
    this.name = 'square'
    this.size = size
  }
  area () { return this.size * this.size }
  perimeter () { return 4 * this.size }
}

const sq = Square(3)
console.log(`sq name ${sq.name} and area ${sq.area()}`)
```
{: title="src/oop/es6-objects.js"}
```text
sq name square and area 9
```

- `new ClassName(...)`:
  - Creates a new blank object
  - Inserts a (hidden) reference to the class, so that the object can find its [methods](#g:method)
  - Calls `constructor` to initialize the object's state
  - Class names are written in CamelCase by convention
- `this` is a pronoun that refers to a single specific object
- Methods are defined with a slightly different syntax than the fat arrows we have been using
- Again, supports polymorphism

```js
class Circle {
  constructor (radius) {
    this.name = 'circle'
    this.radius = radius
  }
  area () { return Math.PI * this.radius * this.radius }
  perimeter () { return 2 * Math.PI * this.radius }
}

class Rectangle {
  constructor (width, height) {
    this.name = 'rectangle'
    this.width = width
    this.height = height
  }
  area () { return this.width * this.height }
  perimeter () { return 2 * (this.width + this.height) }
}

const everything = [
  new Square(3.5),
  new Circle(2.5),
  new Rectangle(1.5, 0.5)
]
for (let thing of everything) {
  const a = thing.area(thing)
  const p = thing.perimeter(thing)
  console.log(`${thing.name}: area ${a} perimeter ${p}`)
}
```
{: title="src/oop/es6-objects.js"}
```text
square: area 12.25 perimeter 14
circle: area 19.634954084936208 perimeter 15.707963267948966
rectangle: area 0.75 perimeter 4
```

## Inheritance {#s:oop-inheritance}

- Build new classes from old by:
  - Adding methods
  - [Overriding methods](#g:override-method)
- Start by defining a person

```js
class Person {
  constructor (name) {
    this.name = name
  }

  greeting (formal) {
    if (formal) {
      return `Hello, my name is ${this.name}`
    } else {
      return `Hi, I'm ${this.name}`
    }
  }
}
```
{: title="src/oop/override.js"}

- Then [extend](#g:extend) to create a scientist
  - Say that `Scientist` [inherits](#g:inherit) from `Person`

```js
class Scientist extends Person {
  constructor (name, area) {
    super(name)
    this.area = area
  }

  greeting (formal) {
    return `${super.greeting(formal)}. Let me tell you about ${this.area}...`
  }
}
```
{: title="src/oop/override.js"}

- Use `super(...)` in `constructor` to call up to parent's constructor
  - Do *not* duplicate the steps it takes
- An instance of `Scientist` will use `Scientist.greeting`,
  while instances of `Person` will use `Person.greeting`

FIXME-40: memory diagram

- Result

```js
const parent = new Person('Hakim')
console.log(`parent: ${parent.greeting(true)}`)

const child = new Scientist('Bhadra', 'microbiology')
console.log(`child: ${child.greeting(false)}`)
```
{: title="src/oop/override.js"}
```text
parent: Hello, my name is Hakim
child: Hi, I'm Bhadra. Let me tell you about microbiology...
```

## Protocols {#s:oop-protocols}

- Common use of object-oriented programming is to define a [protocol](../guide/#protocol)
  - Actions that objects might take are defined in methods
  - Parent defines a method that invokes them at specific times or in a specific order
  - "You will all follow this procedure, but you may follow it in different ways"

- How does a generic bird behave throughout the year?

```js
class Bird {
  constructor (species) {
    this.species = species
  }

  daily (season) {
    return [
      this.foraging(season),
      this.mating(season),
      this.nesting(season)
    ]
  }

  foraging (season) {
    return `${this.species} looks for food`
  }

  mating (season) {
    let result = ''
    if (season === 'fall') {
      result = `${this.species} looks for a mate`
    }
    return result
  }

  nesting (season) {
    // do nothing
  }
}
```
{: title="src/oop/protocol.js"}

- `daily` defines the bird's overall behavior
- `foraging`, `mating`, and `nesting` define default behaviors

- How does a specific kind of bird behave?

```js
class Penguin extends Bird {
  constructor () {
    super('penguin')
    this.hasEgg = false
  }

  mating (season) {
    if (season === 'fall') {
      this.hasEgg = Math.random() < 0.5
    }
    return super.mating(season)
  }

  nesting (season) {
    let result = ''
    if (this.hasEgg && ((season === 'winter') || (season === 'spring'))) {
      result = `${this.species} is nesting`
      if (season === 'spring') {
        this.hasEgg = false
      }
    }
    return result
  }
}
```
{: title="src/oop/protocol.js"}

- Has extra state (`this.hasEgg`)
  - Calls parent constructor before setting this up
- Doesn't override the default behavior for `foraging`
- Extends the default behavior for `mating`
- Replaces the default behavior for `nesting`

- Result of some runs:

```js
const bird = new Penguin()
const seasons = ['summer', 'fall', 'winter', 'spring']
for (let season of seasons) {
  console.log(`in ${season}: ${bird.daily(season)}`)
}
```
{: title="src/oop/protocol.js"}
```text
in summer: penguin looks for food,,
in fall: penguin looks for food,penguin looks for a mate,
in winter: penguin looks for food,,
in spring: penguin looks for food,,
```

- Result of other runs:

```text
in summer: penguin looks for food,,
in fall: penguin looks for food,penguin looks for a mate,
in winter: penguin looks for food,,penguin is nesting
in spring: penguin looks for food,,penguin is nesting
```

- Different random numbers produce different behaviors
  - Makes testing hard
  - Look at how to address this in challenges
- But main idea is how old code can use new code
  - Old code defines expectations as an interface and a protocol
  - New code implements that interface and respects that protocol

## Exercises {#s:oop-exercises}

### Delays

Define a class called `Delay` whose `call` method always returns
the value given in the *previous* call:

```js
const example = new Delay('a')
for (let value of ['b', 'c', 'd']) {
  console.log(value, '->', example.call(value))
}
```
```text
b -> a
c -> b
d -> c
```

A class like `Delay` is sometimes called [stateful](#g:stateful),
since it remembers its state from call to call.

### Filtering

Define a class called `Filter` whose `call` method returns `null`
if its input matches one of the values given to its constructor,
or the input as output otherwise:

```js
const example = new Filter('a', 'e', 'i', 'o', 'u')
for (let value of ['a', 'b', 'c', 'd', 'e']) {
  console.log(value, '->', example.call(value))
}
```
```text
a -> null
b -> b
c -> c
d -> d
e -> null
```

A class like `Filter` is sometimes called [stateless](#g:stateless),
since it does not remember its state from call to call.

### Pipelines

Define a class called `Pipeline`
whose constructor takes one or more objects with a single-parameter `call` method,
and whose own `call` method passes a value through each of them in turn.
If any of the components' `call` methods returns `null`,
`Pipeline` stops immediately and returns `null`.

```js
const example = new Pipeline(new Filter('a', 'e', 'i', 'o', 'u'), new Delay('a'))
for (let value of ['a' ,'b', 'c', 'd', 'e']) {
  console.log(value, '->', example.call(value)
}
```
```text
a -> null
b -> a
c -> b
d -> c
e -> null
```

### Active Expressions

Consider this class:

```js
class Active {
  constructor (name, transform) {
    this.name = name
    this.transform = transform
    this.subscribers = []
  }

  subscribe (someone) {
    this.subscribers.push(someone)
  }

  update (input) {
    console.log(this.name, 'got', input)
    const output = this.transform(input)
    for (let s of this.subscribers) {
      s.update(output)
    }
  }
}
```
{: title="ex/oop/observe.js"}

and this program that uses it:

```js
const start = new Active('start', (x) => Math.min(x, 10))
const left = new Active('left', (x) => 2 * x)
const right = new Active('right', (x) => x + 1)
const final = new Active('final', (x) => x)
start.subscribe(left)
start.subscribe(right)
left.subscribe(final)
right.subscribe(final)

start.update(123)
```
{: title="ex/oop/observe.js"}

1. Trace what happens when the last line of the program is called.
2. Modify `Active` so that it calls `transform` *if* that function was provided,
   or a method `Active.transform` if a transformation function wasn't provided.
3. Create a new class `Delay` whose `transform` method always returns the previous value.
   (Its constructor will need to take an initial value as a parameter.)

This pattern is called [observer/observable](#g:observer-observable).

{% include links.md %}
