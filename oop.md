---
layout: page
permalink: "/oop/"
---

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
- [Polymorphism]({{'/gloss/#polymoprhism'|absolute_url}})

- But:
  - Building every object by hand is painful
  - Calling `it.function(it)` is clumsy
- JavaScript solved these problems using [prototypes]({{'/gloss/#prototype'|absolute_url}})
  - Which turned out to be [clumsy and confusing]({{'/legacy/#prototypes'|absolute_url}})
- Most object-oriented languages use [classes]({{'/gloss/#class'|absolute_url}})
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

- `constructor` is used to initialize the object's state when `new ClassName` is called
  - Class names are written in CamelCase by convention
- `this` is a pronoun that refers to a single specific object
- Methods are defined with a slightly different syntax than the fat arrows we have been using

FIXME-26: explain object-oriented programming in JavaScript

## Challenges

FIXME-27: write challenges
