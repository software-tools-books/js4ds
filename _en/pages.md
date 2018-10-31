---
permalink: "/en/pages/"
title: "Manipulating Pages"
questions:
- "FIXME"
keypoints:
- "FIXME"
---

We have presented a lot of tools, but as yet no applications.
As a reward for your patience,
we will therefore work through several examples that show
how to do useful things to web pages.
These examples introduce some new concepts,
the most important of which is the way in which HTML pages are represented in,
and manipulated by,
JavaScript.

One thing these examples *don't* show is how to build interactive web pages.
JavaScript was invented primarily to support buttons, forms, and the like,
but we will need to do a bit more background work before exploring them.
Still,
we can do a surprising number of useful things
simply by playing with the content of pages.

## Counting Paragraphs {#s:pages-counting}

Let's begin by counting the number of paragraphs in a page:

```html
<html>
  <head>
    <meta charset="utf-8"/>
  </head>
  <body>
    <h1>Title</h1>
    <div class="fill"></div>
    <h2 id="one">First <em>emphasized</em></h2>
    <p>stuff</p>
    <h2 id="two">Second <code>with code</code></h2>
    <h3>stuff</h3>
    <h2 id="three">Third</h2>
    <p>stuff</p>

    <script>
      const counter = () => {
        const paragraphs = document.querySelectorAll('p')
        return paragraphs.length
      }
      console.log(`number of paragraphs: ${counter()}`)
    </script>
  </body>
</html>
```
{: title="src/pages/count-paragraphs.html"}

This page has three main parts:

1. The `head` contains a `meta` tag that specifies the page's
   [character encoding](#g:character-encoding),
   i.e.,
   the scheme used to represent characters not found on a standard American keyboard in the 1970s.
   Character sets and character encodings are out of scope for this lesson;
   see [this essay][spolsky-unicode] for an unfortunately timeless discussion.

2. The top half of the `body` has some headings and paragraphs
   for the JavaScript to play with.
   It also contains a `div` marked with `class="fill"`
   that our script will eventually fill in with a count.

3. The script itself is contained in a `script` tag at the bottom of the page;
   we will explore it in depth below.

> **When Scripts Run**
>
> We have put the script at the bottom of the page
> because we want to be sure that the page's contents actually exist in  memory
> before trying to process them.
> If we put the `script` tag and its contents at the top of the page,
> the browser might run our JavaScript *after* the page has been read
> but *before* its elements and text have been parsed and stored in memory.
> [Race conditions](#g:race-condition) like this bedevil web programming;
> we will see more robust ways to deal with them later.

Inside the `script` tag,
we define a function called `counter` that takes no arguments,
then use `console.log` to display the result of calling it.
The only thing inside the function that we haven't encountered before
is the call `document.querySelectorAll('p')`.
As you might guess from its name,
`document` is an object that gives us a handle on the page the script is in;
it is created and provided automatically by the browser.
Its `querySelectorAll` method finds all elements in the page
that match the selector we provide.
In this case,
we're looking for all paragraphs,
so we simply search for `'p'`.

To see the JavaScript in action,
run a browser,
open its developer tools so that you can see the JavaScript console,
and then load the page.
The page's elements will be displayed as usual,
and the console will show:

```text
number of paragraphs: 2
```

> **Developer Tools**
>
> FIXME: explain how to open dev tools in Firefox, Chrome, Safari, and Edge

Showing results in the console is good enough for development work,
but we would like to see the result in the page itself.
To do this,
we can replace the call to `console.log` with the two lines shown below:

```js
const counter = () => {
  const paragraphs = document.querySelectorAll('p')
  return paragraphs.length
}
const fill = document.getElementById('fill')
fill.innerHTML = `number of paragraphs: ${counter()}`
```

Where `document.querySelectorAll` returns all nodes that match a selector,
`document.getElementById` returns a single element that has the specified ID
(which is set inside the element's opening tag with `id="some_name"`).
The variable `fill` is therefore assigned a reference to our `div`.
We can then change the text inside that element by assigning to its `innerHTML` property.
When we do this,
JavaScript parses the string we provided as if it were HTML
and creates whatever nodes it needs to represent the result.
In this case,
the content is just text,
so JavaScript will create a single text node,
store `"number of paragraphs: 2"` as its content,
and add it to the in-memory structure that represents the page.

...at which point some magic happens behind the scenes.
The browser stores the elements and text of the current page in a data structure called
the Document Object Model,
or more commonly, the [DOM](#g:dom).
Any time the browser detects a change to the DOM,
it automatically refreshes just as much of its display as it needs to.
We can insert or remove text,
change elements' styles,
or copy in entire sub-pages:
each time,
the browser will do only the work required to reflect that change
as quickly as possible.

## Creating a Table of Contents {#s:pages-toc}

Reporting the number of paragraphs is a good way to see how JavaScript works in the browser,
but isn't particularly useful
(although counting the number of words is---we will tackle that in the exercises).
Something we're more likely to put in a real page is a table of contents,
which takes only a little more code than what we've already seen:

```js
(() => {
  const container = document.getElementById('fill')
  const headings = Array.from(document.querySelectorAll('h2'))
  const items = headings
        .map((h) => `<li><a href="#${h.id}">${h.innerHTML}</a></li>`)
        .join('')
  container.innerHTML = '<ul>' + items + '</ul>'
})()
```
{: title="src/pages/create-toc.html"}

Let's start with the first and last lines,
since they demonstrate a commonly-used idiom.
We've seen how to define a function and then call it:

```js
const f = (param) => {
  // body
}
f()
```

If we're only going to call the function once,
we might as well define it and call it immediately without giving it a name:

```js
(param) => {
  // body
}(actual_value)
```

The `()` before the fat arrow means "this function doesn't take any parameters".
The second `()` after the closing curly brace means "call the function".
However,
this doesn't reliably work as written;
in order to make JavaScript happy,
we have to parenthesize the function definition
so that it's clear exactly what's being called:

```js
((param) => {
  // body
})(actual_value)
```

If the function doesn't take any arguments,
this becomes:

```js
(() => {
  // body
})()
```

which is a lot of parentheses in a row,
but that's what people write.

Let's come back to the body of the function:

```js
  const container = document.getElementById('fill')
  const headings = Array.from(document.querySelectorAll('h2'))
  const items = headings
        .map((h) => `<li><a href="#${h.id}">${h.innerHTML}</a></li>`)
        .join('')
  container.innerHTML = '<ul>' + items + '</ul>'
```

As before,
the first line gets the `div` we're going to fill in.
The second line grabs all the `h2` headings,
which we have arbitrarily decided are the only things worthy of inclusion
in the table of contents.
We wrap the call in `document.querySelectorAll` with `Array.from`
because the former's result isn't actually a JavaScript array:
For reasons that probably made sense to someone, somewhere,
it's a thing called a `NodeList`
that lacks most of `Array`'s useful methods.

We then have three lines that do most of the function's work.
The first tells us that `items` is going to be assigned
something derived from `headings`;
the second transforms the array of headings into an array of strings,
and the third joins those strings to create a single string.
Looking at the `map` call,
each heading becomes a list item (`li`)
containing a link (`a`)
whose `href` attribute is the ID of the heading
and whose displayed content (the text between `<a...>` and `</a>`)
is the text of the heading.
The `href` attribute's value starts with `#`,
which makes this a local link
(i.e., it links to something inside the same page).
If one of our `h2` headings doesn't have an `id` set,
this `map` will fail;
we'll explore ways to handle this in the exercises.

Finally,
the last line of the code shown above
fills in the content of the container (i.e., the `div`)
with an unordered list (`ul`)
that contains all of the items we just constructed.
Again,
when we assign to an element's `innerHTML` property,
JavaScript parses the string we give it
and constructs the HTML nodes we need.
It would be marginally faster to build these nodes ourselves
(which we will do in the exercises),
but building and parsing strings is usually easier to read,
and the performance differences are small enough in modern browsers
that we should only worry about them if they actually prove themselves a problem.

## Sortable Lists {#s:pages-sort-list}

Creating nodes allows us to add content to a page,
but we can also rearrange the nodes that are there.
Our next exercise is to sort the elements of a list,
so that if the author writes:

```html
<ul>
  <li>pee (P)</li>
  <li>cue (Q)</li>
  <li>are (R)</li>
</ul>
```

we will automatically rearrange the items to be:

```html
<ul>
  <li>are (R)</li>
  <li>cue (Q)</li>
  <li>pee (P)</li>
</ul>
```

Our first attempt uses this as the HTML page:

```html
<html>
  <head>
    <meta charset="utf-8">
    <script src="sort-lists.js"></script>
  </head>

  <body onload="sortLists()">

    <ul class="sorted">
      <li>first</li>
      <li>second</li>
      <li>third</li>
      <li>fourth</li>
      <li>fifth</li>
    </ul>

    <ol class="sorted">
      <li>one</li>
      <li>two</li>
      <li>three</li>
      <li>four</li>
      <li>five</li>
    </ol>

  </body>
</html>
```

When we load the page,
though,
the items aren't sorted.
A bit of trial and error reveals that we have tripped over the race condition alluded to earlier:
if we call our function in the `onload` attribute of the `body` tag,
it is run when the page is loaded into memory
but *before* the page's content has been parsed and turned into a DOM tree.
After searching online for "run JavaScript when page loaded",
we go back to this:

```html
<html>
  <head>
    <meta charset="utf-8">
    <script src="sort-lists-event.js"></script>
  </head>

  <body>
    ...lists as before...
  </body>
</html>
```

and write our JavaScript like this:

```js
const sortLists = () => {
  // ...function to sort lists...
}

document.addEventListener("DOMContentLoaded", (event) => {
  sortLists()
})
```
{: title="src/pages/sort-lists-event.js"}

An [event listener](#g:event-listener) is a function that the browser calls
when some kind of event occurs.
In our example,
the event we care about is "DOM content has been loaded".
When that occurs,
the browser will call `sortLists()`.
(The `event` parameter to our function will be given an object that stores details about what precisely happened.
We don't need that information now,
but will use it later when we start handling button clicks and the like.)

Let's return to the function:

```js
const sortLists = () => {
  const lists = Array.from(document.querySelectorAll('.sorted'))
  lists.forEach((list) => {
    const children = Array.from(list.childNodes)
          .filter(c => c.nodeName !== '#text')
    children.sort((left, right) => left.textContent.localeCompare(right.textContent))
    while (list.firstChild) {
      list.removeChild(list.firstChild)
    }
    children.forEach(c => list.appendChild(c))
  })
}
```
{: title="src/pages/sort-lists-events.js"}

As before,
it starts by creating an array containing the nodes we want to operate on.
(We use the selector `.sorted` (with a dot `.`) to select everything with the class `sorted`,
rather than `#sorted`,
which would find nodes with the ID `sorted`.)
This array will then have all the `ul` or `ol` lists that the function is to sort.

We process each list separately with `lists.forEach`.
The callback function inside `forEach` creates an array containing the child nodes of the main list element,
then filters that list to remove any top-level text nodes.
We need the `Array.from` call because (once again) the DOM doesn't use a JavaScript array to store children,
but a structure of its own devising that lacks the methods we want to call.
As for removing top-level text nodes,
the diagram below shows why we have to do this:

FIXME: diagram

> **Identifying Text Nodes**
>
> We could check `c.nodeType` instead of `c.nodeName` to spot text nodes,
> but we felt that `nodeName` made the code easier to understand.
> Note that we use `!==` for the comparison in order to prevent [unpleasant surprises](../legacy/#s:legacy-equality).

Now that we have an array of the `li` elements to be sorted,
we can use `Array.sort` to order them.
Since we want to sort them by the text they contain,
we have to provide our own sorting function
that returns -1, 0, or 1 to show whether its `left` argument is less than,
equal to,
or greater than its `right` argument.
We use the `textContent` member of the node to get the text it contains,
and the string object's `locateCompare` to get a -1/0/1 result.
All of this was discovered by searching online,
primarily on the [W3Schools][w3schools] site.

Unfortunately,
searching for "remove all children from node" tells us that we have to do it ourselves,
so we use a `while` loop to remove all the children (including the unwanted top-level text elements)
from the `ul` or `ol` list,
then add all of the children back in sorted order.
Sure enough,
the page now displays the nodes in the right order.

## Bibliographic Citations {#s:pages-citations}

And so we come to the largest example in this lesson.
HTML has a `cite` tag for formatting citations,
but it doesn't allow us to link directly to a bibliography entry.
In order to minimize typing in scholarly papers,
we'd like to find links like this:

```html
<a href="#b">key1, key2</a>
```

and turn them into this:

```html
[<a href="../bib/#key1">key1</a>, <a href="../bib/#key2">key2</a>]
```

The typed-in form is about as little typing as we can get away with;
the displayed form then wraps the citations in `[...]`
and turns each individual citation into a link to our bibliography.
For now,
we'll assume that the bibliography can be found at `../bib/`,
i.e.,
in a file called `index.html` that's in a directory called `bib`
that's a sibling of the directory containing whatever page the citation is in.
This is very fragile,
and we should be ashamed of ourselves,
but we can tell ourselves that we're going to fix it later
and get on with learning JavaScript for now.

Here's our test page:

```html
<html>
  <head>
    <meta charset="utf-8">
    <script src="citations.js"></script>
  </head>
  <body>

    <p>As <a href="#b">Moreau1896</a> shows...</p>
    <p>We can look to <a href="#b">Brundle1982, Brundle1984</a> for answers.</p>

  </body>
</html>
```
{: title="src/pages/citations.html"}

and here's our function
(which we'll call from an event listener as before):

```js
const citations = () => {
  Array.from(document.querySelectorAll('a'))
    .filter(link => link.getAttribute('href') === '#b')
    .map(link => ({node: link,
                   text: link.textContent.split(',').map(s => s.trim())}))
    .map(({node, text}) => ({node,
                             text: text.map(cite => `<a href="../bib/#${cite}">${cite}</a>`)}))
    .map(({node, text}) => ({node,
                             text: `[${text.join(', ')}]`}))
    .forEach(({node, text}) => {
      const span = document.createElement('span')
      span.innerHTML = text
      node.parentNode.replaceChild(span, node)
    })
}
```
{: title="src/pages/citations.js"}

There is a lot going on here,
but it all uses patterns we have seen before.
It starts by building an array of all the links in the document (i.e., every `a` element):

```js
  Array.from(document.querySelectorAll('a'))
```
{: title="src/pages/citations.js"}

We then filter this array to find the links pointing at `#b`,
which is what we're using to signal citations:

```js
    .filter(link => link.getAttribute('href') === '#b')
```
{: title="src/pages/citations.js"}

We now have a problem.
We could use a `map` call to get the text out of each link and process it,
but then all we'd have is an array of strings.
We're going to want the nodes those strings came out of later on as well,
so somehow we have to pass the nodes and strings together through our pipeline.
One option would be to create a two-element array for each:

```js
    .map(link => [link, link.textContent.whatever])
```

but it's more readable to create an object so that each component has a name:

```js
    .map(link => ({node: link,
                   text: link.textContent.split(',').map(s => s.trim())}))
```
{: title="src/pages/citations.js"}

Here,
we are turning each link into an object whose `"node"` key has the link's DOM node as its value,
and whose `"text"` key has the node's text,
split on commas and with leading and trailing whitespace trimmed off.
But we're not done looking at this stage of our pipeline:

1. We don't need to quote the names `"node"` and `"text"`, though we could.
2. JavaScript's `String.split` returns an array,
   so the value associated with `"text"` is an array.
   We then `map` over its elements to trim leading and trailing space from each.
3. If we wrote `link => {node: link, text: whatever}`,
   JavaScript would interpret the curly braces `{...}` as meaning,
   "Here is the body of a function,"
   and then complain because what's in those curly braces clearly *isn't* a function body.
   Putting parentheses around the curly braces,
   i.e., writing `({...})`,
   tells JavaScript that the function is returning an object.

After all of this,
the next stage of the pipeline is almost a relief:

```js
    .map(({node, text}) => ({node,
                             text: text.map(cite => `<a href="../bib/#${cite}">${cite}</a>`)}))
```
{: title="src/pages/citations.js"}

All right,
that's not actually much of a relief,
but it does make a strange kind of sense.
First,
if we have an object whose keys are called `a` and `b`,
then the call `f({a, b})` means,
"Match the value of key `a` to a parameter called `a`
and the value of key `b` to a parameter called `b`."

Second,
if we have a variable called `name`,
then define an object with `{name}`,
JavaScript helpfully assumes that what we mean is `{"name": name}`,
i.e.,
that we want a key called `"name"`
with whatever value `name` currently has.
This allows us to pass the value of `node` from call to call in our pipeline
without typing anything more than its name.

And after all of *this*,
the `text.map` call actually *is* a relief.
The value associated with the key `text` is an array of strings,
each of which is a bibliography key.
All the `map` does is convert each to the text we want:
a link that refers to `../bib/#citation_key` and whose displayed text is also the citation key.

On to the next stage,
which simply joins the string in `text` together to create a single string
with commas between the entries:

```js
    .map(({node, text}) => ({node,
                             text: `[${text.join(', ')}]`}))
```
{: title="src/pages/citations.js"}

The last stage in our pipeline uses `forEach` instead of `map`
because we want to do something for each element of the array,
but don't need a value returned
(because what we're doing has the side effect of modifying the document):

```js
    .forEach(({node, text}) => {
      const span = document.createElement('span')
      span.innerHTML = text
      node.parentNode.replaceChild(span, node)
    })
```
{: title="src/pages/citations.js"}

This is the point at which carrying the node itself forward through the pipeline pays off.
We create a `span` element,
fill it in by assigning to its `innerHTML` property,
and then replace the original link node with the node we have just created.
If we now load our page,
we see our citations formatted as we desired.

## A Real-time Clock {#s:pages-clock}

We will wrap up this lesson with an example that is short,
but hints at the possibilities to come:

```js
<html>
  <head>
    <script>
      const startTime = () => {
        const today = new Date()
        const fields = [today.getHours(),
                        today.getMinutes(),
                        today.getSeconds()]
        const current = fields
              .map(t => `${t}`.padStart(2, '0'))
              .join(':')
        document.getElementById('current').innerHTML = current
        setTimeout(startTime, 1000)
      }

      document.addEventListener("DOMContentLoaded", (event) => {
        startTime()
      })
    </script>
  </head>

  <body>
    <p id="current"></p>
  </body>
</html>
```
{: title="src/pages/clock.html"}

Defining a function: check.
Calling that function when the DOM is ready: check.
What about inside the function?
It's pretty easy to guess that `Date()` creates an object that holds a date,
and from the fact that we're assigning that object to a variable called `today`,
you might even guess that if we don't specify which date we want,
we get today's values.
We then pull the hours, minutes, and seconds out of the date and put them in an array
so that we can turn each value into a two-character string,
padded with a leading zero if necessary,
and then join those strings to create a time like `17:48:02`
to stuff into the element whose ID is `current`.

But what does `setTimeout` do?
It tells the browser to run a function after some number of milliseconds have passed.
In this case,
we're running the same function `startTime` a second from now.
That call will change the displayed time,
then set up another callback to run a second later,
and so on forever.
When we load the page,
we see the current time updating itself second by second
to remind us just how quickly life is passing by.

## Exercises {#s:pages-exercises}

FIXME: exercises for page manipulation

{% include links.md %}
