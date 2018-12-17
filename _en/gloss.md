---
permalink: "/en/gloss/"
title: "Glossary"
---

**absolute path**{:#g:absolute-path}:
: a path that points to the same location in the filesystem regardless of where
  it's evaluated.  An absolute path is the equivalent of latitude and longitude
  in geography.  See also [relative path](#g:relative-path).

**aggregation function**{:#g:aggregation-function}:
: a function that combines many values into one, such as `sum` or `max`.

**anonymous function**{:#g:anonymous-function}:
: a function that is defined without giving it a name, such as a callback
  defined where it is used.  Anonymous functions are sometimes called *lambda
  functions* because the Greek letter lambda is used for them in mathematics.

**argument**{:#g:argument}:
: see [parameter](#g:parameter).
  
**array**{:#g:array}:
: a collection of values stored in a particular order and indexed numerically.
  Arrays are written as comma-separated values in square brackets, such as
  `['a', 'b', 'c']`.  The term [list](#g:list) is often used synonymously.

**ASCII**{:#g:ascii}:
: a widely-used set of numeric codes for representing characters from the Latin
  alphabet and common punctuation symbols, now superseded by
  [Unicode](#g:unicode).

**assertion**{:#g:assertion}:
: a statement that something is true at a certain point in a program.
  Assertions are often used to define tests, but are also used in [production
  code](#g:production-code) to check that software is behaving as it should.

**attribute**{:#g:attribute}:
: a named property attached to an HTML [element](#g:element).
  
**backward-compatible**{:#g:backward-compatible}:
: able to work consistently with older systems.
  
**body**{:#g:http-body} (of an HTTP message):
: any optional data sent after the message's headers.

**bundler**{:#g:bundler}:
: a tool that combines JavaScript files, web pages, images, and other assets
  into a single bundle for deployment.

**cache**{:#g:cache}:
: a place where copies of recently-used values are stored for quicker access.

**call stack**{:#g:call-stack}:
: a data structure that stores information about function calls that are
  currently in progress.  Each function call adds another table of
  variable-value pairs to the top of the stack; when the function completes,
  that table is discarded.  See also [closure](#g:closure).

**callback function**{:#g:callback-function}:
: a function A that is passed to another function B for B to call at a later
  time.  Callback functions are used to implement delayed actions, such as what
  to do when data arrives in response to a network request.

**Cascading Style Sheets**{:#g:css} (CSS):
: a way to describe how HTML should be rendered.

**catch**{:#g:catch}:
: to take responsibility for handling an [exception](#g:exception).  Catch is
  the counterpart of [throw](#g:throw).

**character encoding**{:#g:character-encoding}:
: a specification of how characters are stored as bytes.  The most commonly-used
  encoding today is [UTF-8](#g:utf-8).

**child class**{:#g:child-class}:
: a new [class](#g:class) that [extends](#g:extend) an existing class (called
  the [parent class](#g:parent-class)).

**child node**{:#g:child-node}:
: a [node](#g:node) in a [tree](#g:tree) that is below some other node (which is
  called the child node's [parent](#g:parent-node)).

**class**{:#g:class}:
: a programming structure that defines the properties and behavior of a family
  of related [objects](#g:object).  Classes can [inherit](#g:inherit) from other
  classes to specify or change behavior incrementally.

**client**{:#g:client}:
: a program such as a browser that sends requests to a [server](#g:server) and
  does something with the response.  It is sometimes helpful to think of clients
  as sorcerors petitioning ancient gods for favors.  Sometimes.

**client-side page generation**{:#g:client-page-gen}:
: to create an HTML page within a [client](#g:client) using data provided by a
  [server](#g:server).  See also [server-side page
  generation](#g:server-page-gen).

**closure**{:#g:closure}:
: a set of variables defined in the same [scope](#g:scope) whose existence has
  been preserved after that scope has ended.  Closures are one of the trickiest
  ideas in programming.

**Comma-Separated Values**{:#g:csv} (CSV):
: a text format for tabular data in which each record is one row and fields are
  separated by commas.  There are many minor variations, particularly around
  quoting of strings.

**connection manager**{:#g:connection-manager}:
: an object that maintains a connection to a database.  When the code is
  finished working with the database, the connection manager ensures that the
  connection is closed gracefully, which helps to avoid the corruption of data.

**Content Delivery Network**{:#g:cdn} (CDN):
: a geographically distributed set of servers that store commonly-used or
  recently-used data such as web pages so that they can be served more quickly.

**constant**{:#g:constant}:
: a variable whose value cannot be changed.  Note that the value itself might be
  changed: for example, after the statement `const v = ['a', 'b']`, the name `v`
  will always refer to the same array, but the array's contents can be changed.

**Cross-Origin Resource Sharing**{:#g:cors} (CORS):
: a way to control requests made for data and other resources that aren't served
  by the site that gave the browser the original page.

**declarative programming**{:#g:declarative}:
: a style of programming in which the user specifies what they want, and the
  computer figures out how to deliver it.

**destructuring**{:#g:destructuring}:
: a form of assignment that unpacks a data structure in one step, such as `[a,
  b] = [1, 2]` or `{left, right} = {left: 1, right: 2}`.

**Domain Name System**{:#g:dns} (DNS):
: a decentralized naming system for computers that translates logical names such
  as `third-bit.com` into the addresses of particular computers.

**document**{:#g:document}:
: an entire HTML page.

**Document Object Model**{:#g:dom} (DOM):
: a standard way to represent HTML in memory.  The [elements](#g:element) and
  [attributes](#g:attribute) of the page, along with its text, are stored as
  [nodes](#g:node) organized in a tree.

**dotted notation**{:#g:dotted-notation}:
: a common way to refer to the parts of structures in programming languages.
  `whole.part` means "the thing called `part` belonging to `whole`".

**driver**{:#g:driver}:
: a program that provides a standard interface through which to communicate with
  another piece of hardware or software.  Every graphics card has a driver that
  translates generic drawing commands into card-specific operations; every
  database comes with drivers that (theoretically) allow other programs to talk
  to them all in the same way.

**element**{:#g:element}:
: an individual component of a web page.  In HTML, elements are enclosed in
  matching `<tag>` and `</tag>` pairs, or written as `<tag/>` if they contain no
  content.  Elements are represented as [nodes](#g:node) in the [DOM](#g:dom).

**entry point**{:#g:entry-point}:
: a function with a known name and [signature](#g:signature) that a framework
  requires every plugin or other dynamically-loaded content to have.  The entry
  point is (as the name suggests) how the framework gets into the plugin.

**escape sequence**{:#g:escape-sequence}:
: a sequence of characters used to represent some other character that would
  otherwise have a special meaning.  For example, the escape sequence `\"` is
  used to represent a double-quote character inside a double-quoted string.

**event handler**{:#g:event-handler}:
: a [callback function](#g:callback-function) that does something in response to
  a particular interaction with a browser, such as a key being pressed or a link
  being clicked.

**event listener**{:#g:event-listener}:
: see [event handler](#g:event-handler).

**event loop**{:#g:event-loop}:
: the fundamental processing cycle in JavaScript that takes the next task from a
  list and runs it, possibly adding more tasks to the list as it does so.

**event object**{:#g:event-object}:
: an [object](#g:object) that the system passes to an [event
  handler](#g:event-handler) that contains information about the event, such as
  which key was pressed.

**exception**{:#g:exception}:
: an object that stores information about an error or other unusual event in a
  program.  One part of a program will create and [throw](#g:throw) an exception
  to signal that something unexpected has happened; another part will
  [catch](#g:catch) it.

**extend**{:#g:extend}:
: to create a new class from an existing class.  We say that the new class
  [inherits](#g:inherit) from the old one.

**falsy**{:#g:falsy}:
: a horrible neologism meaning "equivalent to false".  See also the equally
  horrible [truthy](#g:truthy).

**fat arrow function**{:#g:fat-arrow}:
: a JavaScript function defined using the syntax `(...parameters...) =>
  {...body...}`.  Fat arrow functions treat the special value `this` in a less
  inconsistent way than their older equivalents.

**field**{:#g:field}:
: a named part of a [record](#g:record) in a [relational
  database](#g:relational-database).  Fields are typically shown as columns in a
  [table](#g:table).

**fixture**{:#g:fixture}:
: the data on which a [unit test](#g:unit-test) is run.

**functional programming**{:#g:functional-programming}:
: a style of programming in which data is transformed through successive
  application of functions, rather than by using control structures such as
  loops.  Functional programming in JavaScript relies heavily on
  [callbacks](#g:callback-function) and [higher-order
  functions](#g:higher-order-function).

**global installation**{:#g:global-installation}:
: a JavaScript library placed in a location where it can be accessed by all
  users and projects.  See also [local installation](#g:local-installation).

**global variable**{:#g:global-variable}:
: a variable defined outside any particular function, which is therefore visible
  to all functions.  See also [local variable](#g:local-variable).

**header row**{:#g:header-row}:
: if present, the first of a [CSV](#g:csv) file that defines column names (but
  tragically, not their data types or units).

**heterogeneous**{:#g:heterogeneous}:
: having mixed type.  For example, an [array](#g:array) is said to be
  heterogeneous if it contains a mix of numbers, character strings, and values
  of other types.  See also [homogeneous](#g:homogeneous).

**higher-order function**{:#g:higher-order-function}:
: a function that operates on other functions.  For example, the higher-order
  function `forEach` executes a given function once on each value in an
  [array](#g:array).  Higher-order functions are heavily used in [functional
  programming](#g:functional-programming).

**homogeneous**{:#g:homogeneous}:
: having a single type.  For example, an [array](#g:array) is said to be
  homogeneous if it contains only numbers or only character strings, but not a
  mix of the two.

**hostname**{:#g:hostname}:
: the part of a URL that specifies the computer to talk to.  In
  `http://example.com/something/`, the hostname is `example.com`; in
  `http://localhost:1234/`, it is `localhost`.

**HTTP**{:#g:http}:
: the HyperText Transfer Protocol used to exchange information between browsers
  and websites, and more generally between other [clients](#g:client) and
  [servers](#g:server).  HTTP is a [stateless](#g:stateless) protocol in which
  communication consists of [requests](#g:http-request) and
  [responses](#g:http-response).

**HTTP header**{:#g:http-header}:
: a name-value pair at the start of an HTTP [request](#g:http-request) or
  [response](#g:http-response).  Headers are used to specify what data formats
  the sender can handle, the date and time the message was sent, and so on.

**HTTP method**{:#g:http-method}:
: the verb in an [HTTP request](#g:http-request) that defines what the client
  wants to do.  Common methods are `GET` (to get data) and `POST` (to submit
  data).

**HTTP request**{:#g:http-request}:
: a precisely-formatted block of text sent from a [client](#g:client) (such as a
  browser) to a [server](#g:server) that specifies what resource is being
  requested, what data formats the client will accept, and so on.

**HTTP response**{:#g:http-response}:
: a precisely-formatted block of text sent from a [server](#g:server) back to a
  [client](#g:client) in reply to a [request](#g:http-request).

**HTTP status code**{:#g:http-status-code}:
: a numerical code that indicates what happened when an [HTTP
  request](#g:http-request) was processed, such as 200 (OK), 404 (not found), or
  500 (internal server error).

**in-memory database**{:#g:in-memory-database}:
: a database that is stored in memory rather than in permanent storage.
  In-memory databases are often used for testing.

**inherit**{:#g:inherit}:
: to acquire properties and methods from a parent class.  See also
  [extend](#g:extend).

**internal style sheet**{:#g:internal-style-sheet}:
: a set of [CSS](#g:css) definitions placed inside a web page rather than in an
  external file.

**JSON**{:#g:json}:
: a way to represent data by combining basic values like numbers and character
  strings in [arrays](#g:array) and name/value structures.  The acronym stands
  for "JavaScript Object Notation"; unlike better-defined standards like
  [XML](#g:xml), it is unencumbered by a syntax for comments or ways to define
  [schemas](#g:schema).

**library**{:#g:library}:
: see [module](#g:module).

**list**{:#g:list}:
: see [array](#g:array).

**local installation**{:#g:local-installation}:
: a JavaScript library placed inside a particular project, and only accessible
  within that project.  See also [global installation](#g:global-installation).

**local server**{:#g:local-server}:
: a [server](#g:server) run on the user's own computer, usually for testing
  purposes during development.

**local variable**{:#g:local-variable}:
: a variable defined inside a function which is only visible within that
  function.  See also [global variable](#g:global-variable) and
  [closure](#g:closure).

**logging**{:#g:logging}:
: to record information about a program's execution in a structured way.

**logging transport**{:#g:logging-transport}:
: a channel through which [logging](#g:logging) messages are sent, such as
  standard output (for the user's screen) or a database connection.

**member variable**{:#g:member-variable}:
: see [property](#g:property).

**memory diagram**{:#g:memory-diagram}:
: a picture showing the variables a program contains and the data they refer to.

**method**{:#g:method}:
: a function attached to an [object](#g:object), typically called using [dotted
  notation](#g:dotted-notation).  In JavaScript and many other languages, a
  special variable called `this` is provided to methods to refer to the
  particular object for which the method is being called.

**minimization**{:#g:minimization}:
: to remove spaces and other extraneous characters from source files (and
  possibly even rename variables).  This makes those files smaller and faster to
  deploy at the expense of readability.

**module**{:#g:module}:
: a set of variables, functions, and/or classes grouped together for easier
  management (typically but not always in a single file).  Modules are sometimes
  also called [libraries](#g:library).

**module variable**{:#g:module-variable}:
: a variable that is visible within a module but not outside it.  See
  [scope](#g:scope).

**mutation**{:#g:mutation}:
: changing data in place, such as modifying an element of an array or adding a
  record to a database.

**name collision**{:#g:name-collision}:
: the ambiguity that arises when two or more things in a program that have the
  same name are active at the same time.  The [call stack](#g:call-stack) was
  invented in part to address this problem.

**Node**{:#g:node-js}:
: an open source implementation of JavaScript for use outside the browser.

**node**{:#g:node}:
: an in-memory representation of an element in an HTML page.  See also
  [DOM](#g:dom). Not to be confused with [Node.js](#g:node-js).

**NoSQL database**{:#g:nosql-database}:
: any database that doesn't use the [relational](#g:relational-database) model.
  The awkward name comes from the fact that such databases don't use
  [SQL](#g:sql) as a query language.

**object**{:#g:object}:
: a clump of variables and/or [methods](#g:method) grouped together in a
  program.  In most languages, objects can only be created as instances of
  [classes](#g:class), but JavaScript calls anything created using `{...}` an
  object.  Do not seek to walk in the footsteps of the sages; seek rather what
  they sought.

**observer-observable**{:#g:observer-observable}:
: a widely-used programming pattern in which some [objects](#g:object) are
  notified and take action when other objects change state or take action.

**override**{:#g:override-method}:
: to replace a definition of a [method] in a [parent-class](#g:parent-class)
  with a new definition in a [child class](#g:child-class).

**query parameter**{:#g:query-parameter}:
: a placeholder in an [SQL](#g:sql) query that must be filled in with an actual
  value in order for the query to run.

**package manager**{:#g:package-manager}:
: a program that does its best to keep track of the bits and bobs of software
  installed on a computer.  The most widely used package manager for JavaScript
  is called NPM; it does its best, but really, without proper discipline on the
  part of programmers, it's like Boromir trying to hold back the orcs or a
  kindergarten teacher trying to keep everyone's shirt clean during
  finger-painting.

**parameter**{:#g:parameter}:
: a variable whose value is passed into a function when the function is called.
  Some writers distinguish parameters (the variables) from
  [arguments](#g:argument) (the values passed in), but others use the terms in
  the opposite sense.  It's all very confusing.

**parent class**{:#g:parent-class}:
: an existing [class](#g:class) that has been [extended](#g:extend) to create a
  new class.  (The new class is called the [child class](#g:child-class).)

**parent node**{:#g:parent-node}:
: the [node](#g:node) in a [tree](#g:tree) that is above some other node.  Every
  node has a parent except the [root]{#root-node}.

**parse**{:#g:parse}:
: to translate the text of a program or web page into a data structure in memory
  that the program can then manipulate.

**polymorphism**{:#g:polymorphism}:
: literally, "having many forms".  The term refers to the way in which
  [objects](#g:object) whose [methods](#g:method) have the same names and
  [parameters](#g:parameter) can be used interchangeably.

**port**{:#g:port}:
: a logical endpoint for communication, corresponding to a phone number in an
  office building.  In a URL such as `http://example.com:8081/something`, the
  port is `8081`.  Only one program may use a port at any time.

**production code**{:#g:production-code}:
: software that is delivered to an end user.  The term is used to distinguish
  such code from test code, deployment infrastructure, and everything else that
  programmers write along the way.

**promise**{:#g:promise}:
: a way to handle delayed computations in JavaScript.  Promises were supposed to
  make programmers' lives simpler.

**protocol**{:#g:protocol}:
: a set of rules specifying how two things will interact.  The HTTP protocol
  defines the format of [requests](#g:http-request),
  [responses](#g:http-response), and [status codes](#g:http-status-code); a
  protocol for application plugins defines how they will be referred to and what
  [entry points](#g:entry-point) they must contain.

**prototype**{:#g:prototype}:
: an idiosyncratic mechanism used in the original definition of JavaScript for
  sharing properties between objects that we unfortunately still have to cope
  with.

**property**{:#g:property}:
: a variable associated with an [object](#g:object).  The term is used to
  distinguish an object's passive data from its executable [methods](#g:method).
  Properties are sometimes called [member variables](#g:member-variable).

**pseudo-random number**{:#g:pseudo-random-number}:
: a value generated in a repeatable way that has the properties of being truly
  random.

**pseudo-random number generator**{:#g:prng} (PRNG):
: a function that can generate a series of [pseudo-random
  numbers](#g:pseudo-random-number) after being initialized with a
  [seed](#g:seed).

**race condition**{:#g:race-condition}:
: a situation in which the result of a computation can vary due to operations
  being performed in different orders.

**raise**{:#g:raise}:
: see [throw](#g:throw).

**read-evaluate-print loop**{:#g:repl} (REPL):
: an interactive program that reads a command typed in by a user, executes it,
  prints the result, and then waits patiently for the next command.  REPLs are
  often used to explore new ideas or for debugging.

**record**{:#g:record}:
: a set of related values.  In a [relational database](#g:relational-database),
  a record is typically shown as a single row in a [table](#g:table).  See also
  [field](#g:field).

**regular expression**{:#g:regular-expression}:
: a pattern for matching text, written as text itself.  Regular expressions
  are sometimes called "regexp", "regex", or "RE", and are as powerful as
  they are cryptic.  See [this documentation][regexp-docs] for more details.

**relational database**{:#g:relational-database}:
: a database that organizes information into [tables](#g:table), each of which
  has a fixed set of named [fields](#g:field) (shown as columns) and a variable
  number of [records](#g:record) (shown as rows).  See also [SQL](#g:sql).

**relative path**{:#g:relative-path}:
: a path whose destination is interpreted relative to some other location, such
  as the current directory.  A relative path is the equivalent of giving
  directions using terms like "straight" and "left".  See also [absolute
  path](#g:absolute-path).

**responsive design**{:#g:responsive-design}:
: an approach to building web pages and other applications that resizes and
  reorganizes things smoothly for different sizes of screens.

**RGB**{:#g:rgb}:
: a way to represent colors as triples of red, green, and blue intensities, each
  of which ranges from 0 to 255.  RGB is often augmented in modern systems to
  create RGBA, where the fourth component is the pixel's transparency.

**root**{:#g:root-node}:
: the only node in a [tree](#g:tree) that *doesn't* have a [parent](#g:parent-node).

**root directory**{:#g:root-directory}:
: the directory that contains everything else, directly or indirectly.  The root
  directory is written `/` (a bare forward slash).

**root element**{:#g:root-element}:
: the [element](#g:element) in a document that contains every other element.
  The root element of a web page is the `html` element.

**schema**{:#g:schema}:
: a specification of the "shape" of data, such as the [fields](#g:field) making
  up a database table or the ways in which structures can be nested in
  [JSON](#g:json).

**scope**{:#g:scope}:
: the portion of a program within which a definition can be seen and used.  See
  [global-variable](#g:global-variable), [local-variable](#g:local-variable),
  [module-variable](#g:module-variable), and (if you are brave)
  [closure](#g:closure).

**seed**{:#g:seed}:
: a value used to initialize a [pseudo-random number generator](#g:prng).

**selector**{:#g:selector}:
: a way to identify elements within an HTML document.  The selector
  `h2#contents`, for example, means "the `h2` element with the ID `contents`".

**server**{:#g:server}:
: a program that waits for requests from [clients](#g:client) and sends them
  data in response.  It is sometimes helpful to think of servers as harassed
  parents trying to babysit a room full of unruly children.

**server-side page generation**{:#g:server-page-gen}:
: to create an HTML page on a server.  That HTML is then delivered as-is to a
  browser for display.  See also [client-side page
  generation](#g:client-page-gen).

**SQL**{:#g:sql}:
: the language used for writing queries for [relational
  databases](#g:relational-database).  The term was originally an acronym for
  Structured Query Language.

**signature**{:#g:signature}:
: the ordered list of argument data types required by a function or
  [method](#g:method).  If two functions or methods have the same signature,
  they can be called in the same way.

**stateful**{:#g:stateful}:
: to retain information from one operation to the next.

**stateless**{:#g:stateless}:
: to *not* retain information from one operation to the next.

**string**{:#g:string}:
: a block of text in a program.  The term is short for "character string".

**string interpolation**{:#g:string-interpolation}:
: the process of inserting text corresponding to specified values into a string,
  usually to make output human-readable.

**table**{:#g:table}:
: a set of uniformly-formatted [records](#g:record) in a [relational
  database](#g:relational-database).  Tables are usually drawn with rows (each
  of which represents one record) and columns (each of which represents a
  [field](#g:field)).

**tag**{:#g:tag}:
: a short textual label identifying a kind of element in an HTML page.
  Commonly-used tags include `p` (for a paragraph) and `h1` (for a level-1
  heading).

**template**{:#g:template}:
: a document with some placeholders that can be filled in with specific values.
  Templates are often used to create personalized email messages and web pages,
  though their efficacy is predicated upon relentless commercialization and
  devaluation of modern society's sense of what constitutes "personal".

**test runner**{:#g:test-runner}:
: a program that finds and runs [unit tests](#g:unit-test) and reports their
  results.
  
**test suite**{:#g:test-suite}:
: a set of [unit tests](#g:unit-test), usually stored in files that follow a
  prescribed naming convention.
  
**throw**{:#g:throw}:
: to signal that something unexpected or unusual has happened in a program by
  creating an [exception](#g:exception) and handing it to the error-handling
  system, which then tries to find a point in the program that will
  [catch](#g:catch) it.  (Some languages call this *[raising](#g:raise)* an
  exception.)

**tree**{:#g:tree}:
: a data structure containing strictly-nested [nodes](#g:node).  Every node
  except the [root node](#g:root-node) must have exactly one [parent
  node](#g:parent-node), but each node may have zero or more
  [children](#g:child-node).

**truthy**{:#g:truthy}:
: a truly horrible neologism meaning "not equivalent to false".  See also
  [falsy](#g:falsy), but only if you are able to set aside your respect for the
  English language.

**Unicode**{:#g:unicode}:
: a standard that defines numeric codes for many thousands of characters and
  symbols.  Unicode does *not* define how those numbers are stored; that is done
  by standards like [UTF-8](#g:utf-8).

**unit test**{:#g:unit-test}:
: a test that exercises one property or expected behavior of a system.

**URL**{:#g:url} (Uniform Resource Locator):
: a multi-part identifier that specifies something on a computer network.  A URL
  may contain a protocol (such as `http`), a hostname (such as `example.com`), a
  port (such as `80`), a path (such as `/homepage.html`), and [query
  parameters](#g:query-parameter)

**UTF-8**{:#g:utf-8}:
: a way to store the numeric codes representing Unicode characters in memory
  that is [backward-compatible](#g:backward-compatible) with the older
  [ASCII](#g:ascii) standard.

**variable**{:#g:variable}:
: a name in a program that has some data associated with it.  A variable's value
  can be changed after definition.  See also [constant](#g:constant).

**XML**{:#g:xml}:
: a set of rules for defining HTML-like tags and using them to format documents
  (typically data).  XML achieved license plate popularity in the early 2000s,
  but its complexity led many programmers to adopt [JSON](#g:json) instead.

{% include links.md %}
