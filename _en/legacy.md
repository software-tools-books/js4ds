---
title: "Legacy JavaScript Issues"
---

JavaScript is now twenty-five years old,
and like many twenty-somethings,
it is still struggling with issues from its childhood.
This appendix explores three of them.

## Equality {#s:legacy-equality}

Gary Bernhardt's [lightning talk from 2012][bernhardt-wat]
may be the most-watched presentation on JavaScript ever.
In it,
he rattles through some truths about the language that may surprise you:

| Operation                      | Code      | Result               |
| ------------------------------ | --------- | -------------------- |
| empty array plus empty array   | `[] + []` | `""` (empty string)  |
| empty array plus empty object  | `[] + {}` | `{}` (empty object)  |
| empty object plus empty array  | `{} + []` | `0` (number zero)    |
| empty object plus empty object | `{} + {}` | `NaN` (not a number) |

In order to understand this, we need to know several things
(which are laid out in more detail in [this article][suri-wat] by Abhinav Suri):

1.  Arrays are objects whose keys happen to be sequential integers.
2.  When JavaScript tries to add things that aren't numbers,
    it tries to convert them to numbers,
    and if that doesn't work,
    to strings (because it can always concatenate strings).
3.  To convert an array to a string,
    JavaScript converts the elements to strings and concatenates them.
    If the array is empty, the result is an empty string.
4.  When converting an object to a string,
    JavaScript produces `[object CLASS]`,
    where `CLASS` is the name of the object's class.
5.  `{}` can be interpreted as either an empty object *or* an empty block of code.

So:

-   Empty array plus empty array becomes empty string plus empty string.
-   Empty array plus empty object becomes empty string plus `[object Object]`
    (because the class of an empty object is just `Object`).
-   `{} + []` is "an empty block of code producing nothing, followed by `+[]`",
    which becomes "+ of the numeric value of the string value of an empty array",
    which becomes "+ of 0".
-   Empty object plus empty object is interpreted as an empty object plus an empty block of code,
    and since an empty block of code doesn't produce a result,
    its "value" is `NaN` (not a number).

This is one of many cases in programming (and real life) where
doing something that's convenient in a simple case
produces confusion in less common cases.
Every language except Canadian English has warts like these.

## Iteration {#s:legacy-iteration}

We wrote above that arrays are objects.
This led to some undesirable behavior with JavaScript's original `for` loop,
which used the word `in` rather than `of`,
and which looped over all of an object's enumerable keys:

```js
const things = ['x', 'y', 'z']
things.someProperty = 'someValue'

for (let key in things) {
  console.log(key)
}
```
{: title="legacy/for-loops.js"}
```text
0
1
2
someProperty
```

That phrase "enumerable keys" conceals some strangeness of its own,
but in brief,
a `for-in` loop will loop over keys inherited from the object's parents
as well as those defined in the object itself.
Since this is usually not what programmers want (especially for arrays),
older code often used a C-style loop:

```js
for (let i = 0; i < things.length; i += 1) {
  console.log(i)
}
```
```text
0
1
2
```

Today's solution is to use `for-of` to get the *values* from an array,
which is usually what we want:

```js
for (let key of things) {
  console.log(key)
}
```
```text
x
y
z
```

Better yet, use `forEach` and take advantage of its optional second and third arguments:

```js
things.forEach((val, loc, array) => {
    console.log(`element ${loc} of ${array} is ${val}`)
})
```
```text
element 0 of x,y,z is x
element 1 of x,y,z is y
element 2 of x,y,z is z
```

## Prototypes {#s:legacy-prototypes}

We come finally to an aspect of JavaScript that has been the cause of a great deal of confusion: prototypes.
Every JavaScript object has an internal property called its [prototype](#g:prototype).
If you try to access some property of an object and it's not found,
JavaScript automatically looks in the object that the first object's prototype refers to.
If the desired property isn't there,
JavaScript looks in the prototype object's prototype, and so on.

So where do prototypes come from?
If an object is created with `new Something()`,
and the function `Something` has a property called `prototype`,
then the new object's prototype is set to the object to which that
`prototype` property points.

This will all make sense with an example and a diagram.
Let's create an object to store the default properties of ice cream cones,
then create a function `Cone` that creates an actual cone:

```js
const iceCream = {
    size: 'large'
}

const Cone = function(f) {
    this.flavor = f
}

Cone.prototype = iceCream
```
{: title="legacy/prototypes.js"}

We can now create a cone and look at its properties:

```js
const dessert = new Cone('mustard')
console.log(`initial flavor "${dessert.flavor}" and size "${dessert.size}"`)
```
{: title="legacy/prototypes.js"}
```text
initial flavor "mustard" and size "large"
```

<figure id="f:legacy-prototype"> <img src="../../files/legacy-prototype.svg" /> <figcaption>Prototypes</figcaption> </figure>

If we change the `size` of our dessert,
lookup finds the object's property before looking up the chain to find the parent object's:

```js
dessert.size = 'extra-large'
console.log(`modified flavor "${dessert.flavor}" and size "${dessert.size}"`)
```
{: title="legacy/prototypes.js"}
```text
modified flavor "mustard" and size "extra-large"
```

Prototypes are a way to implement inheritance for object-oriented programming;
the problem is that the mechanics are rather clumsy,
and very different from what most programmers are used to,
so people built a variety of layers on top of prototypes.
To make things even more confusing,
`this` can behave in some rather odd ways,
and again,
people built layers to try to insulate themselves from those oddities.
Prototypes still have their fans,
but most people find modern JavaScript's classes easier to use.

{% include links.md %}
