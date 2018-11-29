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

FIXME: explain iteration

## Prototypes {#s:legacy-prototypes}

FIXME: explain prototypes

{% include links.md %}
