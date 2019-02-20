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

class Scientist extends Person {
  constructor (name, area) {
    super(name)
    this.area = area
  }

  greeting (formal) {
    return `${super.greeting(formal)}. Let's talk about ${this.area}...`
  }
}

const parent = new Person('Hakim')
console.log(`parent: ${parent.greeting(true)} - ${parent.farewell()}`)

const child = new Scientist('Bhadra', 'microbiology')
console.log(`child: ${child.greeting(false)} - ${child.farewell()}`)
