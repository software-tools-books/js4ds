const iceCream = {
    size: 'large'
}

const Cone = function(f) {
    this.flavor = f
}

Cone.prototype = iceCream

const dessert = new Cone('mustard')
console.log(`initial flavor "${dessert.flavor}" and size "${dessert.size}"`)

dessert.size = 'extra-large'
console.log(`modified flavor "${dessert.flavor}" and size "${dessert.size}"`)
