---
layout: page
permalink: "/oop/"
---

- Making new code use old code is easy
- How can we make old code use new code without rewriting?
- Objects!

## Doing It By Hand

- An object is a set of key/value pairs
- Values can be functions
- So have data carry around functions that work on it

<!-- @src/oop/clumsy-objects.js -->
```js
const square = {
  name: 'square',
  size: 5,
  area: (it) => {return it.size * it.size},
  perimeter: (it) => {return 4 * it.size}
}
```

- Pass the object itself into the function

<!-- @src/oop/clumsy-objects.js -->
```js
const a = square.area(square)
console.log(`area of square is ${a}`)
```
```output
area of square is 25
```

- This seems like a lot of work
- But it allows us to handle many different kinds of things in the same way

<!-- @src/oop/clumsy-objects.js -->
```js
const circle = {
  name: 'circle',
  radius: 3,
  area: (it) => {return Math.PI * it.radius * it.radius},
  perimeter: (it) => {return 2 * Math.PI * it.radius}
}

const rectangle = {
  name: 'rectangle',
  width: 2,
  height: 3,
  area: (it) => {return it.width * it.height},
  perimeter: (it) => {return 2 * (it.width + it.height)}
}

const everything = [square, circle, rectangle]
for (let thing of everything) {
  const a = thing.area(thing)
  const p = thing.perimeter(thing)
  console.log(`${thing.name}: area ${a} perimeter ${p}`)
}
```
```output
square: area 25 perimeter 20
circle: area 28.274333882308138 perimeter 18.84955592153876
rectangle: area 6 perimeter 10
```

- As long as we only use the value `name` and the functions `area` and `perimeter`
  we don't need to know what kind of thing we're actually working with
- [Polymorphism](../gloss/#polymoprhism)

- But:
  - Building every object by hand is painful
  - Calling `it.function(it)` is clumsy

## Classes

- JavaScript solved these problems using [prototypes](../gloss/#prototype)
  - Which turned out to be [clumsy and confusing](../legacy/#prototypes)
- Most object-oriented languages use [classes](../gloss/#class)
  - These have been added to JavaScript ES6
  - We will only use them

<!-- @src/oop/es6-objects.js -->
```js
class Square {
  constructor (size) {
    this.name = 'square'
    this.size = size
  }
  area() { return this.size * this.size }
  perimeter() { return 4 * this.size }
}

const sq = Square(3)
console.log(`sq name ${sq.name} and area ${sq.area()}`)
```
```output
sq name square and area 9
```

- `new ClassName(…)`:
  - Creates a new blank object
  - Inserts a (hidden) reference to the class, so that the object can find its [methods](../gloss/#method)
  - Calls `constructor` to initialize the object's state
  - Class names are written in CamelCase by convention
- `this` is a pronoun that refers to a single specific object
- Methods are defined with a slightly different syntax than the fat arrows we have been using
- Again, supports polymorphism

<!-- @src/oop/es6-objects.js -->
```js
class Circle {
  constructor (radius) {
    this.name = 'circle'
    this.radius = radius
  }
  area() { return Math.PI * this.radius * this.radius }
  perimeter() { return 2 * Math.PI * this.radius }
}

class Rectangle {
  constructor (width, height) {
    this.name = 'rectangle'
    this.width = width
    this.height = height
  }
  area() { return this.width * this.height }
  perimeter() { return 2 * (this.width + this.height) }
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
```output
square: area 12.25 perimeter 14
circle: area 19.634954084936208 perimeter 15.707963267948966
rectangle: area 0.75 perimeter 4
```

## Inheritance

- Build new classes from old by:
  - Adding methods
  - [Overriding methods](../gloss/#override-method)
- Start by defining a person

<!-- @src/oop/override.js -->
```js
class Person {
  constructor (name) {
    this.name = name
  }

  greeting (formal) {
    if (formal) {
      return `Hello, my name is ${this.name}`
    }
    else {
      return `Hi, I'm ${this.name}`
    }
  }
}
```

- Then [extend](../gloss/#extend'|absolue_url}}) to create a scientist
  - Say that `Scientist` [inherits](../gloss/#inherit) from `Person`

<!-- @src/oop/override.js -->
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

- Use `super(…)` in `constructor` to call up to parent's constructor
  - Do *not* duplicate the steps it takes
- An instance of `Scientist` will use `Scientist.greeting`,
  while instances of `Person` will use `Person.greeting`

FIXME-40: memory diagram

- Result

<!-- @src/oop/override.js -->
```js
parent = new Person('Hakim')
console.log(`parent: ${parent.greeting(true)}`)

child = new Scientist('Bhadra', 'microbiology')
console.log(`child: ${child.greeting(false)}`)
```
```output
parent: Hello, my name is Hakim
child: Hi, I'm Bhadra. Let me tell you about microbiology...
```

## Protocols

- Common use of object-oriented programming is to define a [protocol](../guide/#protocol)
  - Actions that objects might take are defined in methods
  - Parent defines a method that invokes them at specific times or in a specific order
  - "You will all follow this procedure, but you may follow it in different ways"

- How does a generic bird behave throughout the year?

<!-- @src/oop/protocol.js -->
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

- `daily` defines the bird's overall behavior
- `foraging`, `mating`, and `nesting` define default behaviors

- How does a specific kind of bird behave?

<!-- @src/oop/protocol.js -->
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

- Has extra state (`this.hasEgg`)
  - Calls parent constructor before setting this up
- Doesn't override the default behavior for `foraging`
- Extends the default behavior for `mating`
- Replaces the default behavior for `nesting`

- Result of some runs:

```output
in summer: penguin looks for food,,
in fall: penguin looks for food,penguin looks for a mate,
in winter: penguin looks for food,,
in spring: penguin looks for food,,
```

- Result of other runs:

```output
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

## Challenges

FIXME-27: write challenges
