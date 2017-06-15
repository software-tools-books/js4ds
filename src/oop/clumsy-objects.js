const square = {
  name: 'square',
  size: 5,
  area: (it) => {return it.size * it.size},
  perimeter: (it) => {return 4 * it.size}
}

const a = square.area(square)
console.log(`area of square is ${a}`)

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
