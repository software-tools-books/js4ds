---
permalink: "/en/gloss/"
title: "Glossary"
---

**aggregation function**{:#g:aggregation-function}:
a function that combines many values into one,
such as `sum` or `max`.

**anonymous function**{:#g:anonymous-function}:
a function that is defined without giving it a name,
such as a callback defined where it is used.
Anonymous functions are sometimes called *lambda functions*
because the Greek letter lambda is used for them in mathematics.

**argument**{:#g:argument}:
see [parameter](#g:parameter).

**array**{:#g:array}:
a collection of values stored in a particular ordered and indexed numerically.
Lists are written as comma-separated values in square brackets,
such as `['a', 'b', 'c']`.
The term *list* is often used synonymously.

**ASCII**{:#g:ascii}:
a widely-used set of numeric codes for representing characters from the Latin alphabet
and common puncutation symbols,
now superseded by [Unicode](#g:unicode).

**assertion**{:#g:assertion}:
a statement that something is true at a certain point in a program.
Assertions are often used to define tests,
but are also used in [production code](#g:production-code)
to check that software is behaving as it should.

**attribute**{:#g:attribute}:
a named property attached to an HTML [element](#g:element).

**backward-compatible**{:#g:backward-compatible}:
able to work consistently with older systems.

**callback function**{:#g:callback-function}:
a function A that is passed to another function B
for B to call at a later time.
Callback functions are used to implement delayed actions,
such as what to do when data arrives in response to a network request.

**Cascading Style Sheets**{:#g:css} (CSS):
a way to describe how HTML should be rendered.

**catch**{:#g:catch}:
to take responsibility for handling an [exception](#g:exception).
Catch is the counterpart of [throw](#g:throw).

**child class**{:#g:child-class}:
a new [class](#g:class) that [extends](#g:extend) an existing class
(called the [parent class](#g:parent-class)).

**child node**{:#g:child-node}:
a [node](#g:node) in a [tree](#g:tree) that is below some other node
(which is call the child node's [parent](#g:parent-node)).

**class**{:#g:class}:
a programming structure that defines
the properties and behavior of a family of related [objects](#g:object).
Classes can [inherit](#g:inherit) from other classes
to specify or change behavior incrementally.

**client**{:#g:client}:
a program such as a browser that sends requests to a [server](#g:server)
and does something with the response.
It is sometimes helpful to think of clients as sorcerors
petitioning ancient gods for favors.
Sometimes.

**client-side page generation**{:#g:client-side-page-generation}:
to create an HTML page within a [client](#g:client)
using data provided by a [server](#g:server).
See also [server-side page generation](#g:server-side-page-generation).

**closure**{:#g:closure}:
a set of variables defined in the same [scope](#g:scope)
whose existence has been preserved after that scope has ended.
Closures are one of the trickiest ideas in programming.

**constant**{:#g:constant}:
a variable whose value cannot be changed.
Note that the value itself might be changed:
for example,
after the statement `const v = ['a', 'b']`,
the name `v` will always refer to the same array,
but the array's contents can be changed.

**destructuring**{:#g:destructuring}:
a form of assignment that unpacks a data structure in one step,
such as `[a, b] = [1, 2]` or
`{left, right} = {left: 1, right: 2}`.

**document**{:#g:document}:
an entire HTML page.

**Document Object Model**{:#g:dom} (DOM):
a standard way to represent HTML in memory.
The [elements](#g:element) and [attributes](#g:attribute) of the page,
along with its text,
are stored as [nodes](#g:node) organized in a tree.

**dotted notation**{:#g:dotted-notation}:
a common way to refer to the parts of structures in programming languages.
`whole.part` means "the thing called `part` belonging to `whole`".

**event handler**{:#g:event-handler}:
a [callback function](#g:callback-function) that does something
in response to a particular interaction with a browser,
such as a key being pressed or a link being clicked.

**event object**{:#g:event-object}:
an [object](#g:object) that the system passes to an [event handler](#g:event-handler)
that contains information about the event,
such as which key was pressed.

**exception**{:#g:exception}:
an object that stores information about an error
or other unusual event in a program.
One part of a program will create and [throw](#g:throw) an exception
to signal that something unexpected has happened;
another part will [catch](#g:catch) it.

**extend**{:#g:extend}:
to create a new class from an existing class.
We say that the new class [inherits](#g:inherit) from the old one.

**falsy**{:#g:falsy}:
a horrible neologism meaning "equivalent to false".
See also the equally horrible [truthy](#g:truthy).

**fat arrow function**{:#g:far-arrow-function}:
a JavaScript function defined using the syntax `(...parameters...) => {...body...}`.
Fat arrow functions treat the special value `this` in a less inconsistent way
than their older equivalents.

**field**{:#g:field}:
a named part of a [record](#g:record) in a [relational database](#g:relational-database).
Fields are typically shown as columns in a [table](#g:table).

**functional programming**{:#g:functional-programming}:
a style of programming in which data is transformed through successive application of functions,
rather than by using control structures such as loops.
Functional programming in JavaScript relies heavily on [callbacks](#g:callback)
and [higher-order functions](#g:higher-order-function).

**global variable**{:#g:global-variable}:
a variable defined outside any particular function,
which is therefore visible to all functions.
See also [local variable](#g:local-variable).

**heterogeneous**{:#g:heterogeneous}:
having mixed type.
For example,
an [array](#g:array) is said to be heterogeneous
if it contains a mix of numbers, character strings, and values of other types.
See also [homogeneous](#g:homogeneous).

**higher-order function**{:#g:higher-order-function}:
a function that operates on other functions.
For example, the higher-order function `forEach` executes a given function once
on each value in an [array](#g:array).
Higher-order functions are heavily used in [functional programming](#g:functional-programming).

**homogeneous**{:#g:homogeneous}:
having a single type.
For example,
an [array](#g:array) is said to be homogeneous
if it contains only numbers or only character strings,
but not a mix of the two.

**HTTP**{:#g:http}:
the HyperText Transfer Protocol used to exchange information between browsers and websites,
and more generally between other [clients](#g:client) and [servers](#g:server).
HTTP is a [stateless](#g:stateless) protocol
in which communication consists of [requests](#g:http-request) and [responses](#g:http-response).

**HTTP request**{:#g:http-request}:
a precisely-formatted block of text sent from a [client](#g:client) (such as a browser)
to a [server](#g:server)
that specifies what resource is being requested,
what data formats the client will accept,
and so on.

**HTTP response**{:http-response}:
a precisely-formatted block of text sent from a [server](#g:server) back to a [client](#g:client)
in reply to a [request](#g:http-request).

**HTTP status code**{:#g:http-status-code}:
a numerical code that indicates what happened when an [HTTP request](#g:http-request) was processed,
such as 200 (OK),
404 (not found),
or 500 (internal server error).

**in-memory database**{:#g:in-memory-database}:
a database that is stored in memory rather than in permanent storage.
In-memory databases are often used for testing.

**inherit**{:#g:inherit}:
to acquire properties and methods from a parent class.
See also [extend](#g:extend).

**JSON**{:#g:json}:
a way to represent data by combining basic values like numbers and character strings
in [arrays](#g:arrays) and name/value structures.
The acronym stands for "JavaScript Object Notation";
unlike better-defined standards like [XML](#g:xml),
it is unencumbered by a syntax for comments
or ways to define [schemas](#g:schema).

**library**{:#g:library}:
see [module](#g:module).

**list**{:#g:list}:
see [array](#g:array).

**local variable**{:#g:local-variable}:
a variable defined inside a function
which is only visible within that function.
See also [global variable](#g:global-variable) and [closure](#g:closure).

**member variable**{:#g:member-variable}:
see [property](#g:property).

**memory diagram**{:#g:memory-diagram}:
a picture showing the variables a program contains and the data they refer to.

**method**{:#g:method}:
a function attached to an [object](#g:object),
typically called using [dotted notation](#g:dotted-notation).
In JavaScript and many other languages,
a special variable called `this` is provided to methods
to refer to the particular object for which the method is being called.

**module**{:#g:module}:
a set of variables, functions, and/or classes grouped together for easier management
(typically but not always in a single file).
Modules are sometimes also called [libraries](#g:library).

**node**{:#g:node}:
an in-memory representation of an element in an HTML page.
See also [DOM](#g:dom).

**NoSQL database**{:#g:nosql-database}:
any database that doesn't use the [relational](#g:relational-database) model.
The awkward name comes from the fact that such databases don't use [SQL](#g:sql) as a query language.

**object**{:#g:object}:
a clump of variables and/or [methods](#g:method) grouped together in a program.
In most languages,
objects can only be created as instances of [classes](#g:class),
but JavaScript calls anything created using `{...}` an object.
Do not seek to walk in the footsteps of the sages;
seek rather what they sought.

**observer-observable**{:#g:observer-observable}:
a widely-used programming pattern in which some [objects](#g:object)
are notified and take action when other objects change state or take action.

**override**{:#g:override-method}:
to replace a definition of a [method] in a [parent-class](#g:parent-class)
with a new definition in a [child class](#g:child-class).

**query parameter**{:#g:query-parameter}:
a placeholder in an [SQL](#g:sql) query
that must be filled in with an actual value in order for the query to run.

**package manager**{:#g:package-manager}:
a program that does its best to keep track of the bits and bobs of software
installed on a computer.
The most widely used package manager for JavaScript is called NPM;
it does its best,
but really,
without proper discipline on the part of programmers,
it's like Boromir trying hold back the orcs
or a kindergarten teacher trying to keep everyone's shirt clean during finger-painting.

**parameter**{:#g:parameter}:
a variable whose value is passed into a function when the function is called.
Some writers distinguish parameters (the variables)
from [arguments](#g:arguments) (the values passed in),
but others use the terms in the opposite sense.
It's all very confusing.

**parent class**{:#g:parent-class}:
an existing [class](#g:class) that has been [extended](#g:extend) to create a new class.
(The new class is called the [child class](#g:child-class).)

**parent node**{:#g:parent-node}:
the [node](#g:node) in a [tree](#g:tree) that is above some other node.
Every node has a parent except the [root]{#root-node}.

**polymorphism**{:#g:polymoprhism}:
literally, "having many forms".
The term refers to the way in which [objects](#g:object) whose [methods](#g:method) have
the same names and [parameters](#g:parameter)
can be used interchangeably.

**production code**{:#g:production-code}:
software that is delivered to an end user.
The term is used to distinguish such code from test code,
deployment infrastructure,
and everything else that programmers write along the way.

**promise**{:#g:promise}:
a way to handle delayed computations in JavaScript.
Promises were supposed to make programmers' lives simpler.

**prototype**{:#g:prototype}:
an idiosyncratic mechanism used in the original definition of JavaScript
for sharing properties between objects
that we unfortunately still have to cope with.

**property**{:#g:property}:
a variable associated with an [object](#g:object).
The term is used to distinguish an object's passive data
from its executable [methods](#g:methods).
Properties are sometimes called [member variables](#g:member-variable).

**raise**{:#g:raise}:
see [throw](#g:throw).

**read-evaluate-print loop**{:#g:repl} (REPL):
an interactive program that reads a command typed in by a user,
executes it,
prints the result,
and then waits patiently for the next command.
REPLs are often used to explore new ideas or for debugging.

**record**{:#g:record}:
a set of related values.
In a [relational database](#g:relational-database),
a record is typically shown as a single row in a [table](#g:table).
See also [field](#g:field).

**regular expression**{:#g:regular-expression}:
a pattern for matching text.

**relational database**{:#g:relational-database}:
a database that organizes information into [tables](#g:table),
each of which has a fixed set of named [fields](#g:field) (shown as columns)
and a variable number of [records](#g:record) (shown as rows).
See also [SQL](#g:sql).

**responsive design**{:#g:responsive-design}:
an approach to building web pages and other applications
that resizes and reorganizes things smoothly
for different sizes of screens.

**RGB**{:#g:rgb}:
a way to represent colors as triples of red, green, and blue intensities,
each of which ranges from 0 to 255.
RGB is often augmented in modern systems to create RGBA,
where the fourth component is the pixel's transparency.

**root**{:#g:root-node}:
the only node in a [tree](#g:tree) that *doesn't* have a [parent](#g:parent-node).

**Scalable Vector Graphics**{:#g:svg}:
a standard way to represent line-based graphics using [XML](#g:xml)-style notation.
SVG images resize much more cleanly than pixel-based images,
and most browsers can draw them directly.

**schema**{:#g:schema}:
a specification of the "shape" of data,
such as the [fields](#g:field) making up a database table
or the ways in which structures can be nested in [JSON](#g:json).

**scope**{:#g:scope}:
the portion of a program within which a definition can be seen and used.
See [global-variable](#g:global-variable),
[local-variable](#g:local-variable),
and (if you are brave) [closure](#g:closure).

**selector**{:#g:selector}:
a way to identify elements within an HTML document.
The selector `h2#contents`,
for example,
means "the `h2` element with the ID `contents`".

**server**{:#g:server}:
a program that waits for requests from [clients](#g:client) and sends them data in response.
It is sometimes helpful to think of servers as harassed parents
trying to babysit a room full of unruly children.

**server-side page generation**{:#g:server-side-page-generation}:
to create an HTML page on a server.
That HTML is then delivered as-is to a browser for display.
See also [client-side page generation](#g:client-side-page-generation).

**SQL**{:#g:sql}:
the language used for writing queries for [relational databases](#g:relational-database).
The term was originally an acronym for Structured Query Language.

**stateful**{:#g:stateful}:
to retain information from one operation to the next.

**stateless**{:#g:stateless}:
to *not* retain information from one operation to the next.

**string**{:#g:string}:
a block of text in a program.
The term is short for "character string".

**table**{:#g:table}:
a set of uniformly-formatted [records](#g:record)
in a [relational database](#g:relational-database).
Tables are usually drawn with rows (each of which represents one record)
and columns (each of which represents a [field](#g:field)).

**tag**{:#g:tag}:
a short textual label identifying a kind of element in an HTML page.
Commonly-used tags include `p` (for a paragraph)
and `h1` (for a level-1 heading).

**template**{:#g:template}:
a document with some placeholders that can be filled in with specific values.
Templates are often used to create personalized email messages and web pages,
though their efficacy is predicated upon
relentless commercialization and devaluation
of modern society's sense of what constitutes "personal".

**throw**{:#g:throw}:
to signal that something unexpecte or unusual has happened in a program
by creating an [exception](#g:exception)
and handing it to the error-handling system,
which then tries to find a point in the program that will [catch](#g:catch) it.

**tree**{:#g:tree}:
a data structure containing strictly-nested [nodes](#g:node).
Every node except the [root-node](#g:root) must have exactly one [parent-node](#g:parent),
but each node may have zero or more [children](#g:child-node).

**truthy**{:#g:truthy}:
a truly horrible neologism meaning "not equivalent to false".
See also [falsy](#g:falsy),
but only if you are able to set aside your respect for the English language.

**Unicode**{:#g:unicode}:
a standard that defines numeric codes for many thousands of characters and symbols.
Unicode does *not* define how those numbers are stored;
that is done by standards like [UTF-8](#g:utf-8).

**UTF-8**{:#g:utf-8}:
a way to store the numeric codes representing Unicode characters in memory
that is [backward-compatible](#g:backward-compatible) with the older [ASCII](#g:ascii) standard.

**variable**{:#g:variable}:
a name in a program that has some data associated with it.
A variable's value can be changed after definition.
See also [constant](#g:constant).

**XML**{:#g:xml}:
a set of rules for defining HTML-like tags
and using them to format documents (typically data).
XML achieved license plate popularity in the early 2000s,
but its complexity led many programmers to adopt [JSON](#g:json) instead.

{% include links.md %}
