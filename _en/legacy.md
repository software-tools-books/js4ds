---
permalink: "/en/legacy/"
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
| empty object plus empty array  | `[] + {}` | `0` (number zero)    |
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
{: title="src/legacy/for-loops.js"}
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

FIXME: explain prototypes

{% include links.md %}
