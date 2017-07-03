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

**ASCII**{:#ascii):
a widely-used set of numeric codes for representing characters from the Latin alphabet
and common puncutation symbols,
now superseded by [Unicode](#unicode).

**assertion**{:#assertion}:
a statement that something is true at a certain point in a program.
Assertions are often used to define tests,
but are also used in [production code](#production-code)
to check that software is behaving as it should.

**attribute**{:#attribute}:
a named property attached to an HTML [element](#element).

**backward-compatible**{:#backward-compatible}:
able to work consistently with older systems.

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

**HTTP**{:#http}:

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
a database that is stored in memory rather than in permanent storage.
In-memory databases are often used for testing.

**inherit**{:#inherit}:
to acquire properties and methods from a parent class.
See also [extend](#extend).

**JSON**{:#json}:
a way to represent data by combining basic values like numbers and character strings
in [arrays](#arrays) and name/value structures.
The acronym stands for "JavaScript Object Notation";
unlike alternative standards like [XML](#xml),
it is unencumbered by ways to define comments or specify [schemas](#schema).

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

**schema**{:#schema}:
a specification of the "shape" of data,
such as the [fields](#field) making up a database table
or the ways in which structures can be nested in [JSON](#json).

**scope**{:#scope}:
FIXME

**selector**{:#selector}:
a way to identify elements within an HTML document.
The selector `h2#contents`,
for example,
means "the `h2` element with the ID `contents`".

**server**{:#server}:
FIXME

**server-side page generation**{:#server-side-page-generation}:

**SQL**{:#sql}:
the language used for writing queries for [relational databases](#relational-database).
The term was originally an acronym for Structured Query Language.

**stateful**{:#stateful}:
to retain information from one operation to the next.

**stateless**{:#stateless}:
to *not* retain information from one operation to the next.

**string**{:#string}:
a block of text in a program.
The term is short for "character string".

**table**{:#table}:
a set of uniformly-formatted [records](#record)
in a [relational database](#relational-database).
Tables are usually drawn with rows (each of which represents one record)
and columns (each of which represents a [field](#field)).

**tag**{:#tag}:
a short textual label identifying a kind of element in an HTML page.
Commonly-used tags include `p` (for a paragraph)
and `h1` (for a level-1 heading).

**template**{:#template}:
a document with some placeholders that can be filled in with specific values.
Templates are often used to create personalized email messages and web pages,
though their efficacy is predicated upon
relentless commercialization and devaluation
of modern society's sense of what constitutes "personal".

**throw**{:#throw}:
to signal that something unexpecte or unusual has happened in a program
by creating an [exception](#exception)
and handing it to the error-handling system,
which then tries to find a point in the program that will [catch](#catch) it.

**truthy**{:#truthy}:
a truly horrible neologism meaning "not equivalent to false".
See also [falsy](#falsy),
but only if you are able to set aside your respect for the English language.

**Unicode**{:#unicode}:
a standard that defines numeric codes for many thousands of characters and symbols.
Unicode does *not* define how those numbers are stored;
that is done by standards like [UTF-8](#utf-8).

**UTF-8**{:#utf-8):
a way to store the numeric codes representing Unicode characters in memory
that is [backward-compatible](#backward-compatible) with the older [ASCII](#ascii) standard.

**variable**{:#variable}:
a name in a program that has some data associated with it.
A variable's value can be changed after definition.
See also [constant](#constant).

**XML**{:#xml}:
a set of rules for defining HTML-like tags
and using them to format documents (typically data).
XML was popular in the early 2000s,
but its complexity led many programmers to adopt [JSON](#json) instead.
