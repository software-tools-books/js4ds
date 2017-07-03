---
layout: page
permalink: "/gloss/"
---

**aggregation function**{:#aggregation-function}:
a function that combines many values into one,
such as `sum` or `max`.

**anonymous function**{:#anonymous-function}:
a function that is defined without giving it a name,
such as a callback defined where it is used.
Anonymous functions are sometimes called *lambda functions*
because the symbol &lambda; is used for them in mathematics.

**array**{:#array}:
a collection of values stored in a particular ordered and indexed numerically.
Lists are written as comma-separated values in square brackets,
such as `['a', 'b', 'c']`.
The term *list* is often used synonymously.

**assertion**{:#assertion}:
a statement that something is true at a certain point in a program.
Assertions are often used to define tests,
but are also used in [production code](#production-code)
to check that software is behaving as it should.

**attribute**{:#attribute}:
a named property attached to an HTML [element](#element).

**callback function**{:#callback-function}:
a function A that is passed to another function B
for B to call at a later time.
Callback functions are used to implement delayed actions,
such as what to do when data arrives in response to a network request.

**Cascading Style Sheets**{:#css}:
a way to describe how HTML should be rendered.

**catch**{:#catch}:
to take responsibility for handling an [exception](#exception).
Catch is the counterpart of [throw](#throw).

**class**{:#class}:
a programming structure that defines
the properties and behavior of a family of related [objects](#object).
Classes can [inherit](#inherit) from other classes
to specify or change behavior incrementally.

**client**{:#client}:
FIXME

**client-side page generation**{:#client-side-page-generation}:
to create an HTML page on a server.
That HTML is then delivered as-is to a browser for display.
See also [server-side page generation](#server-side-page-generation).

**closure**{:#closure}:
FIXME

**constant**{:#constant}:
a variable whose value cannot be changed.
Note that the value itself might be changed:
for example,
after the statement `const v = ['a', 'b']`,
the name `v` will always refer to the same array,
but the array's contents can be changed.

**destructuring**{:#destructuring}:
a form of assignment that unpacks a data structure in one step,
such as `[a, b] = [1, 2]` or
`{left, right} = {left: 1, right: 2}`.

**document**{:#document}:
an entire HTML page.

**Document Object Model**{:#dom}:
a standard way to represent HTML in memory.
The [elements](#element) and [attributes](#attribute) of the page,
along with its text,
are stored as [nodes](#node) organized in a tree.

**dotted notation**{:#dotted-notation}:
a common way to refer to the parts of structures in programming languages.
`whole.part` means "the thing called `part` belonging to `whole`".

**event handler**{:#event-handler}:
a [callback function](#callback-function) that does something
in response to a particular interaction with a browser,
such as a key being pressed or a link being clicked.

**event object**{:#event-object}:
an [object](#object) that the system passes to an [event handler](#event-handler)
that contains information about the event,
such as which key was pressed.

**exception**{:#exception}:
an object that stores information about an error
or other unusual event in a program.
One part of a program will create and [throw](#throw) an exception
to signal that something unexpected has happened;
another part will [catch](#catch) it.

**extend**{:#extend}:
to create a new class from an existing class.
We say that the new class [inherits](#inherit) from the old one.

**falsy**{:#falsy}:
a horrible neologism meaning "equivalent to false".
See also the equally horrible [truthy](#truthy).

**fat arrow function**{:#far-arrow-function}:
a JavaScript function defined using the syntax `(…parameters…) => {…body…}`.
Fat arrow functions treat the special value `this` in a less inconsistent way
than their older equivalents.

**field**{:#field}:
a named part of a [record](#record) in a database.
Fields are typically shown as table columns.

**functional programming**{:#functional-programming}:
a style of programming in which data is transformed through successive application of functions,
rather than by using control structures such as loops.
Functional programming in JavaScript relies heavily on [callbacks](#callback)
and [higher-order functions](#higher-order-function).

**global variable**{:#global-variable}:
a variable defined outside any particular function,
which is therefore visible to all functions.

**heterogeneous**{:#heterogeneous}:
having mixed type.
For example,
an [array](#array) is said to be heterogeneous
if it contains a mix of numbers, character strings, and values of other types.
See also [homogeneous](#homogeneous).

**higher-order function**{:#higher-order-function}:
a function that operates on other functions.
For example, the higher-order function `forEach` executes a given function once
on each value in an [array](#array).
Higher-order functions are heavily used in [functional programming](#functional-programming).

**homogeneous**{:#homogeneous}:
having a single type.
For example,
an [array](#array) is said to be homogeneous
if it contains only numbers or only character strings,
but not a mix of the two.

**HTTP request**{:#http-request}:
a precisely-formatted block of text sent from a [client](#client) (such as a browser)
to a [server](#server)
that specifies what resource is being requested,
what data formats the client will accept,
and so on.

**HTTP status code**{:#http-status-code}:
a numerical code that indicates what happened when an [HTTP request]{#http-request} was processed,
such as 200 (OK),
404 (not found),
or 500 (internal server error).
Four-digit codes are reserved for reporting the actions of ancient malevolent entities
bent on the destruction of all that is good in the universe,
and will be phased in from 2026 onward.

**in-memory database**{:#in-memory-database}:

**inherit**{:#inherit}:

**JSON**{:#json}:

**list**{:#list}:
see [array](#array).

**local variable**{:#local-variable}:

**memory diagram**{:#memory-diagram}:

**method**{:#method}:

**module**{:#module}:

**node**{:#node}:

**NoSQL database**{:#nosql-database}:

**object**{:#object}:

**observer-observable**{:#observer-observable}:

**override method**{:#override-method}:

**query parameter**{:#query-parameter}:

**package manager**{:#package-manager}:

**parameter**{:#parameter}:

**polymorphism**{:#polymoprhism}:

**production code**{:#production-code}:
software that is delivered to an end user.
The term is used to distinguish such code from test code,
deployment infrastructure,
and everything else that programmers write along the way.

**promise**{:#promise}:

**prototype**{:#prototype}:

**property**{:#property}:

**raise**{:#raise}:
see [throw](#throw).

**read-evaluate-print loop**{:#repl}:

**record**{:#record}:

**regular expression**{:#regular-expression}:

**relational database**{:#relational-database}:

**responsive design**{:#responsive-design}:

**RGB**{:#rgb}:

**Scalable Vector Graphics**{:#svg}:

**scope**{:#scope}:

**selector**{:#selector}:

**server**{:#server}:
FIXME

**server-side page generation**{:#server-side-page-generation}:

**SQL**{:#sql}:

**stateful**{:#stateful}:

**stateless**{:#stateless}:

**string**{:#string}:

**tables**{:#table}:

**tag**{:#tag}:

**template**{:#template}:

**text**{:#text}:

**throw**{:#throw}:

**truthy**{:#truthy}:

**Unicode**{:#unicode}:

**variable**{:#variable}:

**XML**{:#xml}:
