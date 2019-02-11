---
title: "Objects and Classes"
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

Making new code use old code is easy:
just load the libraries you want and write calls to the functions you need.
Making *old* code use *new* code without rewriting it is trickier,
but object-oriented programming can help.

## Doing It By Hand {#s:oop-manual}

As we saw [earlier](../basics/),
an object in JavaScript is a set of key-value pairs.
Since functions are just another kind of data,
an object's values can be functions,
so data can carry around functions that work on it.
For example,
we can create an object to represent a square:

```js
const square = {
  name: 'square',
  size: 5,
  area: (it) => { return it.size * it.size },
  perimeter: (it) => { return 4 * it.size }
}
```
{: title="oop/clumsy-objects.js"}

<!-- == \noindent -->
and then pass the object itself into each of its own functions:

```js
const a = square.area(square)
console.log(`area of square is ${a}`)
```
{: title="oop/clumsy-objects.js"}
```text
area of square is 25
```

This is a bit clumsy---we'll often forget to pass the object into its functions---but
it allows us to handle many different kinds of things in the same way.
For example,
we can create another object to represent a circle:

```js
const circle = {
  name: 'circle',
  radius: 3,
  area: (it) => { return Math.PI * it.radius * it.radius },
  perimeter: (it) => { return 2 * Math.PI * it.radius }
}
```
{: title="oop/clumsy-objects.js"}

<!-- == \noindent -->
and then put all of these different objects in an array
and operate on them in the same way
without knowing precisely what kind of object we're dealing with:

```js
const show_all = (shapes) => {
  for (let s of shapes) {
    const a = s.area(s)
    const p = s.perimeter(s)
    console.log(`${s.name}: area ${a} perimeter ${p}`)
  }
}

show_all([square, circle])
```
{: title="oop/clumsy-objects.js"}
```text
square: area 25 perimeter 20
circle: area 28.274333882308138 perimeter 18.84955592153876
```

As long as we only use the value `name` and the functions `area` and `perimeter`
we don't need to know what kind of shape we have.
This is called [polymorphism](#g:polymorphism),
and it allows us to add new shapes without changing the code in our loop.
In other words,
it allows old code (in this case, the function `show_all`)
to use new code (the new object `rectangle`).

```js
const rectangle = {
  name: 'rectangle',
  width: 2,
  height: 3,
  area: (it) => { return it.width * it.height },
  perimeter: (it) => { return 2 * (it.width + it.height) }
}

show_all([square, circle, rectangle])
```
{: title="oop/clumsy-objects.js"}
```text
square: area 25 perimeter 20
circle: area 28.274333882308138 perimeter 18.84955592153876
rectangle: area 6 perimeter 10
```

## Classes {#s:oop-classes}

Building every object by hand and calling `thing.function(thing)` is clumsy.
JavaScript solved these problems using [prototypes](#g:prototype),
which also turned out to be [clumsy](../legacy/#s:legacy-prototypes).
Most object-oriented languages use [classes](#g:class) instead;
these were added to JavaScript in ES6,
and we will use them instead of prototypes throughout.
Here's how we create a class that defines the properties of a square,
without actually creating any specific squares:

```js
class Square {
  constructor (size) {
    this.name = 'square'
    this.size = size
  }
  area () { return this.size * this.size }
  perimeter () { return 4 * this.size }
}
```
{: title="oop/es6-objects.js"}

<!-- == \noindent -->
(Class names are written in CamelCase by convention.)
We can then create a specific square by using the class's name as if it were a function:

```js
const sq = new Square(3)
console.log(`sq name ${sq.name} and area ${sq.area()}`)
```
{: title="oop/es6-objects.js"}
```text
sq name square and area 9
```

`new ClassName(...)` creates a new blank object
and inserts a (hidden) reference to the class
so that the object can find its [methods](#g:method).
`new` then calls the specially-named method `constructor` to initialize the object's state.
Inside the constructor and other methods,
the object being operated on is referred to by the pronoun `this`.

Inside the class,
methods are defined with classic syntax rather than the [fat arrows](#g:fat-arrow) we have been using.
The inconsistency is unfortunate
but this way of defining methods is what the current version of Node prefers;
we will explore this topic further in the [discussion of visualization](../vis/).

Classes defined this way support polymorphism:
if two or more classes have some methods with the same names
that take the same parameters
and return the same kinds of values,
other code can use objects of those classes interchangeably.
For example,
here's a class-based rewrite of our shapes code:

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
{: title="oop/es6-objects.js"}
```text
square: area 12.25 perimeter 14
circle: area 19.634954084936208 perimeter 15.707963267948966
rectangle: area 0.75 perimeter 4
```

## Inheritance {#s:oop-inheritance}

We can build new classes from old ones by adding or [overriding](#g:override-method) methods.
To show this,
we'll start by defining a person:

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

  farewell () {
    return `Goodbye`
  }
}
```
{: title="oop/override.js"}

We can now [extend](#g:extend) `Person` to create a new class `Scientist`,
in which case we say that `Scientist` [inherits](#g:inherit) from `Person`,
or that `Person` is a [parent class](#g:parent-class) of `Scientist`
and `Scientist` is a [child class](#g:child-class) of `Person`.

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
{: title="oop/override.js"}

This tells us that a `Scientist` is a `Person` who:

- Has an area of specialization as well as a name.
- Says hello in a slightly longer way
- Says goodbye in the same way as a `Person`
  (since `Scientist` *doesn't* define its own `farewell` method)

The word `super` is used in two ways here:

- In the constructor for `Scientist`,
  `super(...)` calls up to the constructor of the parent class `Person`
  so that it can do whatever initialization it does
  before `Scientist` does its own initialization.
  This saves us from duplicating steps.
- Inside `greeting`,
  the expression `super.greeting(formal)` means
  "call the parent class's `greeting` method for this object".
  This allows methods defined in child classes to add to or modify
  the behavior of methods defined in parent classes,
  again without duplicating code.

Let's try it out:

```js
const parent = new Person('Hakim')
console.log(`parent: ${parent.greeting(true)} - ${parent.farewell()}`)

const child = new Scientist('Bhadra', 'microbiology')
console.log(`child: ${child.greeting(false)} - ${child.farewell()}`)
```
{: title="oop/override.js"}
```text
parent: Hello, my name is Hakim - Goodbye
child: Hi, I'm Bhadra. Let me tell you about microbiology... - Goodbye
```

The diagram below shows what memory looks like after these classes have been defined
and the objects `parent` and `child` have been created.
It looks complex at first,
but allows us to see how JavaScript finds the right method
when `child.farewell()` is called:

- It looks in the object `child` to see if there's a function there with the right name.
- There isn't, so it follows `child`'s link to its class `Scientist`
  to see if a function is there.
- There isn't, so it follows the link from `Scientist` to the parent class `Person`
  and finds the function it's looking for.

<figure id="f:oop-inheritance"> <img src="../../files/oop-inheritance.svg" /> <figcaption>Object-Oriented Inheritance</figcaption> </figure>

## Protocols {#s:oop-protocols}

A common way to use object-oriented programming is to define a [protocol](#g:protocol).
The parent defines a method that invokes other methods at specific times or in a specific order.
Users then derive classes from the parent that implement those methods
to do those specific things.
In essence,
a protocol says,
"You will all follow this procedure, but you may follow it in different ways."

For example,
how does a generic bird behave throughout the year?
The class `Bird` specifies that it forages, mates, and nests,
and provides default methods for each:

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
{: title="oop/protocol.js"}

A specific kind of bird,
such as a penguin,
can then override these methods to provide its own behaviors
*without* changing its daily behavior:

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
{: title="oop/protocol.js"}

`Penguin` has some extra state (the variable `this.hasEgg`),
and calls its parent's constructor before setting this up.
It doesn't override the default behavior for `foraging`,
but it extends the default behavior for `mating`
and completely replaces the default behavior for `nesting`.
Here are the results of watching one penguin for four seasons:

```js
const bird = new Penguin()
const seasons = ['summer', 'fall', 'winter', 'spring']
for (let season of seasons) {
  console.log(`in ${season}: ${bird.daily(season)}`)
}
```
{: title="oop/protocol.js"}
```text
in summer: penguin looks for food,,
in fall: penguin looks for food,penguin looks for a mate,
in winter: penguin looks for food,,
in spring: penguin looks for food,,
```

Here's another:

```text
in summer: penguin looks for food,,
in fall: penguin looks for food,penguin looks for a mate,
in winter: penguin looks for food,,penguin is nesting
in spring: penguin looks for food,,penguin is nesting
```

Different random numbers produce different behaviors,
which makes testing hard:
we'll see how to address this [later](../testing/)
The main idea,
though,
is how old code can use new code:
the old code defines expectations as an interface and a protocol,
and the new code implements that interface and respects that protocol.
We will see this idea over and over again
as we build applications using standard libraries.

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
  console.log(value, '->', example.call(value))
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
{: title="oop/observe.js"}

<!-- == \noindent -->
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
{: title="oop/observe.js"}

1. Trace what happens when the last line of the program is called.
2. Modify `Active` so that it calls `transform` *if* that function was provided,
   or a method `Active.transform` if a transformation function wasn't provided.
3. Create a new class `Delay` whose `transform` method always returns the previous value.
   (Its constructor will need to take an initial value as a parameter.)

This pattern is called [observer/observable](#g:observer-observable).

{% include links.md %}
