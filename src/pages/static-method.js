class Vec2D {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  toString() {
    return `(${this.x},${this.y})`
  }

  magnitude() {
    return Math.sqrt(this.x ** 2 + this.y ** 2)
  }

  static dist(left, right) {
    return Math.sqrt((left.x - right.x) ** 2 +
                     (left.y - right.y) ** 2)
  }
}

const a = new Vec2D(0.0, 1.0)
console.log(`magnitude of ${a} is ${a.magnitude()}`)

const b = new Vec2D(1.0, 0.0)
console.log(`distance between ${a} and ${b} is ${Vec2D.dist(a, b)}`)
