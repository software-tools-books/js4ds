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

class Scientist extends Person {
  constructor (name, area) {
    super(name)
    this.area = area
  }

  greeting (formal) {
    return `${super.greeting(formal)}. Let me tell you about ${this.area}...`
  }
}

parent = new Person('Hakim')
console.log(`parent: ${parent.greeting(true)}`)

child = new Scientist('Bhadra', 'microbiology')
console.log(`child: ${child.greeting(false)}`)
