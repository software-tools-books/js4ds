const iceCream = {
    size: 'large'
}

const Cone = function(f) {
    this.flavor = f
}

Cone.prototype = iceCream

const dessert = new Cone('mustard')
console.log(`flavor "${dessert.flavor}" size "${dessert.size}"`)

dessert.size = 'extra-large'
console.log(`new flavor "${dessert.flavor}" size "${dessert.size}"`)
