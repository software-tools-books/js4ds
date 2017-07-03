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

**argument**{:#argument}:
see [parameter](#parameter).

**array**{:#array}:
a collection of values stored in a particular ordered and indexed numerically.
Lists are written as comma-separated values in square brackets,
such as `['a', 'b', 'c']`.
The term *list* is often used synonymously.

**ASCII**{:#ascii}:
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

**Cascading Style Sheets**{:#css} (CSS):
a way to describe how HTML should be rendered.

**catch**{:#catch}:
to take responsibility for handling an [exception](#exception).
Catch is the counterpart of [throw](#throw).

**child class**{:#child-class}:
a new [class](#class) that [extends](#extend) an existing class
(called the [parent class](#parent-class)).

**class**{:#class}:
a programming structure that defines
the properties and behavior of a family of related [objects](#object).
Classes can [inherit](#inherit) from other classes
to specify or change behavior incrementally.

**client**{:#client}:
a program such as a browser that sends requests to a [server](#server)
and does something with the response.
It is sometimes helpful to think of clients as sorcerors
petitioning ancient gods for favors.
Sometimes.

**client-side page generation**{:#client-side-page-generation}:
to create an HTML page within a [client](#client)
using data provided by a [server](#server).
See also [server-side page generation](#server-side-page-generation).

**closure**{:#closure}:
a set of variables defined in the same [scope](#scope)
whose existence has been preserved after that scope has ended.
Closures are one of the trickiest ideas in programming.

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

**Document Object Model**{:#dom} (DOM):
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
a named part of a [record](#record) in a [relational database](#relational-database).
Fields are typically shown as columns in a [table](#table).

**functional programming**{:#functional-programming}:
a style of programming in which data is transformed through successive application of functions,
rather than by using control structures such as loops.
Functional programming in JavaScript relies heavily on [callbacks](#callback)
and [higher-order functions](#higher-order-function).

**global variable**{:#global-variable}:
a variable defined outside any particular function,
which is therefore visible to all functions.
See also [local variable](#local-variable).

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
the HyperText Transfer Protocol used to exchange information between browsers and websites,
and more generally between other [clients](#client) and [servers](#server).
HTTP is a [stateless](#stateless) protocol
in which communication consists of [requests](#http-request) and [responses](#http-response).

**HTTP request**{:#http-request}:
a precisely-formatted block of text sent from a [client](#client) (such as a browser)
to a [server](#server)
that specifies what resource is being requested,
what data formats the client will accept,
and so on.

**HTTP response**{:http-response}:
a precisely-formatted block of text sent from a [server](#server) back to a [client](#client)
in reply to a [request](#http-request).

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
unlike better-defined standards like [XML](#xml),
it is unencumbered by a syntax for comments
or ways to define [schemas](#schema).

**library**{:#library}:
see [module](#module).

**list**{:#list}:
see [array](#array).

**local variable**{:#local-variable}:
a variable defined inside a function
which is only visible within that function.
See also [global variable](#global-variable) and [closure](#closure).

**member variable**{:#member-variable}:
see [property](#property).

**memory diagram**{:#memory-diagram}:
a picture showing the variables a program contains and the data they refer to.

**method**{:#method}:
a function attached to an [object](#object),
typically called using [dotted notation](#dotted-notation).
In JavaScript and many other languages,
a special variable called `this` is provided to methods
to refer to the particular object for which the method is being called.

**module**{:#module}:
a set of variables, functions, and/or classes grouped together for easier management
(typically but not always in a single file).
Modules are sometimes also called [libraries](#library).

**node**{:#node}:
an in-memory representation of an element in an HTML page.
See also [DOM](#dom).

**NoSQL database**{:#nosql-database}:
any database that doesn't use the [relational](#relational-database) model.
The awkward name comes from the fact that such databases don't use [SQL](#sql) as a query language.

**object**{:#object}:
a clump of variables and/or [methods](#method) grouped together in a program.
In most languages,
objects can only be created as instances of [classes](#class),
but JavaScript calls anything created using `{…}` an object.
Do not seek to walk in the footsteps of the sages;
seek rather what they sought.

**observer-observable**{:#observer-observable}:
a widely-used programming pattern in which some [objects](#object)
are notified and take action when other objects change state or take action.

**override**{:#override-method}:
to replace a definition of a [method] in a [parent-class](#parent-class)
with a new definition in a [child class](#child-class).

**query parameter**{:#query-parameter}:
a placeholder in an [SQL](#sql) query
that must be filled in with an actual value in order for the query to run.

**package manager**{:#package-manager}:
a program that does its best to keep track of the bits and bobs of software
installed on a computer.
The most widely used package manager for JavaScript is called NPM;
it does its best,
but really,
without proper discipline on the part of programmers,
it's like Boromir trying hold back the orcs
or a kindergarten teacher trying to keep everyone's shirt clean during finger-painting.

**parameter**{:#parameter}:
a variable whose value is passed into a function when the function is called.
Some writers distinguish parameters (the variables)
from [arguments](#arguments) (the values passed in),
but others use the terms in the opposite sense.
It's all very confusing.

**parent class**{:#parent-class}:
an existing [class](#class) that has been [extended](#extend) to create a new class.
(The new class is called the [child class](#child-class).)

**polymorphism**{:#polymoprhism}:
literally, "having many forms".
The term refers to the way in which [objects](#object) whose [methods](#method) have
the same names and [parameters](#parameter)
can be used interchangeably.

**production code**{:#production-code}:
software that is delivered to an end user.
The term is used to distinguish such code from test code,
deployment infrastructure,
and everything else that programmers write along the way.

**promise**{:#promise}:
a way to handle delayed computations in JavaScript.
Promises were supposed to make programmers' lives simpler.

**prototype**{:#prototype}:
an idiosyncratic mechanism used in the original definition of JavaScript
for sharing properties between objects
that we unfortunately still have to cope with.

**property**{:#property}:
a variable associated with an [object](#object).
The term is used to distinguish an object's passive data
from its executable [methods](#methods).
Properties are sometimes called [member variables](#member-variable).

**raise**{:#raise}:
see [throw](#throw).

**read-evaluate-print loop**{:#repl} (REPL):
an interactive program that reads a command typed in by a user,
executes it,
prints the result,
and then waits patiently for the next command.
REPLs are often used to explore new ideas or for debugging.

**record**{:#record}:
a set of related values.
In a [relational database](#relational-database),
a record is typically shown as a single row in a [table](#table).
See also [field](#field).

**regular expression**{:#regular-expression}:
a pattern for matching text.

**relational database**{:#relational-database}:
a database that organizes information into [tables](#table),
each of which has a fixed set of named [fields](#field) (shown as columns)
and a variable number of [records](#record) (shown as rows).
See also [SQL](#sql).

**responsive design**{:#responsive-design}:
an approach to building web pages and other applications
that resizes and reorganizes things smoothly
for different sizes of screens.

**RGB**{:#rgb}:
a way to represent colors as triples of red, green, and blue intensities,
each of which ranges from 0 to 255.
RGB is often augmented in modern systems to create RGBA,
where the fourth component is the pixels' transparency.

**Scalable Vector Graphics**{:#svg}:
a standard way to represent line-based graphics using [XML](#xml)-style notation.
SVG images resize much more cleanly than pixel-based images,
and most browsers can draw them directly.

**schema**{:#schema}:
a specification of the "shape" of data,
such as the [fields](#field) making up a database table
or the ways in which structures can be nested in [JSON](#json).

**scope**{:#scope}:
the portion of a program within which a definition can be seen and used.
See [global-variable](#global-variable),
[local-variable](#local-variable),
and (if you are brave) [closure](#closure).

**selector**{:#selector}:
a way to identify elements within an HTML document.
The selector `h2#contents`,
for example,
means "the `h2` element with the ID `contents`".

**server**{:#server}:
a program that waits for requests from [clients](#client) and sends them data in response.
It is sometimes helpful to think of servers as harassed parents
trying to babysit a room full of unruly children.

**server-side page generation**{:#server-side-page-generation}:
to create an HTML page on a server.
That HTML is then delivered as-is to a browser for display.
See also [client-side page generation](#client-side-page-generation).

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

**UTF-8**{:#utf-8}:
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
