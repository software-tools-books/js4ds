class Square {
  constructor (size) {
    this.name = 'square'
    this.size = size
  }
  area () { return this.size * this.size }
  perimeter () { return 4 * this.size }
}

const sq = new Square(3)
console.log(`sq name ${sq.name} and area ${sq.area()}`)

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
