---
permalink: "/en/htmlcss/"
title: "HTML and CSS"
questions:
- "Where did HTML come from?"
- "What kinds of things can HTML pages contain?"
- "How do I create headings? Lists? Tables? Links?"
- "How do I include images?"
- "How can I change the appearance of elements on a page?"
- "How can I reference specific elements on a page?"
keypoints:
- "HTML is the latest in a long line of markup languages."
- "HTML documents contain elements (represented by tags in angle brackets) and text."
- "Elements must be strictly nested."
- "Elements can contain attributes."
- "Use escape sequences beginning with ampersand to represent special characters."
- "Every page should have one `html` element containing a `head` and a `body`."
- "Use `<!--...-->` to include comments in HTML."
- "Use `ul` and `ol` for unordered and ordered lists, and `li` for list elements."
- "Use `table` for tables, `tr` for rows, `th` for headings, and `td` for regular data."
- "Use `<a href=\"...\">...</a>` to create links."
- "Use `<img src=\"...\" title=\"...\" alt=\"...\" />` to include images."
- "Use CSS to define appearance of elements."
- "Use `class` and `id` to identify elements."
- "Use selectors to specify the elements that CSS applies to."
---

HTML is the standard way to represent documents for presentation in web browsers,
and CSS is the standard way to describe how it should look.
Both are more complicated than they should have been,
but in order to create web applications,
we need to understand a little of both.

## Formatting {#s:htmlcss-formatting}

An HTML [document](../gloss/#g:document) contains [elements](../gloss/#g:element) and text
(and possibly other things that we will ignore for now).
Elements are shown using [tags](../gloss/#g:tag):
an opening tag `<tagname>` shows where the element begins,
and a corresponding closing tag `</tagname>` (with a leading slash) shows where it ends.
If there's nothing between the two, we can write `<tagname/>` (with a trailing slash).

A document's elements must form a [tree](../gloss/#g:tree),
i.e.,
they must be strictly nested.
This means that if Y starts inside X,
Y must end before X ends,
so `<X>...<Y>...</Y></X>` is legal,
but `<X>...<Y>...</X></Y>` is not.
Finally,
every document should have a single [root element](../gloss/#g:root-element) that encloses everything else,
although browsers aren't strict about enforcing this.
In fact,
most browsers are pretty relaxed about enforcing any kind of rules at all,
since most people don't obey them anyway.

## Text {#s:htmlcss-text}

The text in an HTML page is normal printable text.
However,
since `<` and `>` are used to show where tags start and end,
we must use [escape sequences](../gloss/#g:escape-sequence) to represent them,
just as we use `\"` to represented a literal double-quote character
inside a double-quoted string in JavaScript.
In HTML,
escape sequences are written `&name;`,
i.e.,
an ampersand, the name of the character, and a semi-colon.
A few common escape sequences include:

| Name         | Escape Sequence | Character |
| ------------ | --------------- | --------- |
| Less than    | `&lt;`          | &lt;      |
| Greater than | `&gt;`          | &gt;      |
| Ampersand    | `&amp;`         | &amp;     |
| Copyright    | `&copy;`        | &copy;    |
| Plus/minus   | `&plusmn;`      | &plusmn;  |
| Micro        | `&micro;`       | &micro;   |

The first two are self-explanatory,
and `&amp;` is needed so that we can write a literal ampersand
(just as `\\` is needed in JavaScript strings so that we can write a literal backslash).
`&copy;`, `&plusmn;`, and `&micro;` are usually not needed any longer,
since most editors will allow us to put non-ASCII characters directly into documents these days,
but occasionally we will run into older or stricter systems.

## Pages {#s:htmlcss-pages}

An HTML page should have:

- a single `html` element that encloses everything else
- a single `head` element that contains information about the page
- a single `body` element that contains the content to be displayed

It doesn't matter whether or how we indent the tags showing these elements and the content they contain,
but laying them out on separate lines
and indenting to show nesting
helps human readers.
Well-written pages also use comments, just like code:
these start with `<!--` and end with `-->`.
Unfortunately,
comments cannot be nested,
i.e.,
if you comment out a section of a page that already contains a comment,
the results are unpredictable.

Here's an empty HTML page with the structure described above:

```html
<html>
  <head>
    <!-- description of page goes here -->
  </head>
  <body>
    <!-- content of page goes here -->
  </body>
</html>
```
{: title="src/htmlcss/empty-page.html"}

Nothing shows up if we open this in a browser,
so let's add a little content:

```html
<html>
  <head>
    <title>This text is displayed in the browser bar</title>
  </head>
  <body>
    <h1>Displayed Content Starts Here</h1>
    <p>
      This course introduces core features of <em>JavaScript</em>
      and shows where and how to use them.
    </p>
    <!-- The word "JavaScript" is in italics (emphasis) in the preceding paragraph. -->
  </body>
</html>
```
{: title="src/htmlcss/first-page.html"}

- The `title` element inside `head` gives the page a title.
  This is displayed in the browser bar when the page is open,
  but is *not* displayed as part of the page itself.
- The `h1` element is a level-1 heading;
  we can use `h2`, `h3`, and so on to create sub-headings.
- The `p` element is a paragraph.
- Inside a heading or a paragraph,
  we can use `em` to *emphasize* text.
  We can also use `strong` to make text **stronger**.
  Tags like these are better than tags like `i` (for italics) or `b` (for bold)
  because they signal intention rather than forcing a particular layout.
  Someone who is visually impaired, or someone using a small-screen device,
  may want emphasis of various kinds displayed in different ways.

## Attributes {#s:htmlcss-attributes}

Elements can be customized by giving them [attributes](../gloss/#g:attribute),
which are written as `name="value"` pairs inside the element's opening tag.
For example:

```html
<h1 align="center">A Centered Heading</h1>
```

centers the `h1` heading on the page, while:

```
<p class="disclaimer">This planet provided as-is.</p>
```

marks this paragraph as a disclaimer.
That doesn't mean anything special to HTML,
but as we'll see later,
we can define styles based on the `class` attributes of elements.

An attribute's name may appear at most once in any element,
just like a key can only appear once in any JavaScript object,
so `<p align="left" align="right">...</p>` is illegal.
If we want to give an attribute multiple values---for example,
if we want an element to have several classes---we put all the values in one string.
Unfortunately,
as the example below shows,
HTML is inconsistent about whether values should be separated by spaces or semi-colons:

```html
<p class="disclaimer optional" style="color: blue; font-size: 200%;">
```

However they are separated,
values are supposed to be quoted,
but in practice we can often get away with `name=value`.
And for Boolean attributes whose values are just true or false,
we can even sometimes just get away with `name` on its own.

## Lists {#s:htmlcss-lists}

Headings and paragraphs are all very well,
but data scientists need more.
To create an unordered (bulleted) list,
we use a `ul` element,
and wrap each item inside the list in `li`.
To create an ordered (numbered) list,
we use `ol` instead of `ul`,
but still use `li` for the list items.

```html
<ul>
  <li>first</li>
  <li>second</li>
  <li>third</li>
</ul>
```

- first
- second
- third

```html
<ol>
  <li>first</li>
  <li>second</li>
  <li>third</li>
</ol>
```

1. first
2. second
3. third

Lists can be nested by putting the inner list's `ul` or `ol`
inside one of the outer list's `li` elements:

```html
<ol>
  <li>Major A
    <ol>
      <li>minor p</li>
      <li>minor q</li>
    </ol>
  </li>
  <li>Major B
    <ol>
      <li>minor r</li>
      <li>minor s</li>
    </ol>
  </li>
</ol>
```

<ol>
  <li>Major A
    <ol>
      <li>minor p</li>
      <li>minor q</li>
    </ol>
  </li>
  <li>Major B
    <ol>
      <li>minor r</li>
      <li>minor s</li>
    </ol>
  </li>
</ol>

## Tables {#s:htmlcss-tables}

Lists are a great way to get started,
but if we *really* want to impress people with our data science skills,
we need tables.
Unsurprisingly,
we use the `table` element to create these.
Each row is a `tr` (for "table row"),
and within rows,
column items are shown with `td` (for "table data")
or `th` (for "table heading").

```html
<table>
  <tr> <th>Alkali</th>   <th>Noble Gas</th> </tr>
  <tr> <td>Hydrogen</td> <td>Helium</td>    </tr>
  <tr> <td>Lithium</td>  <td>Neon</td>      </tr>
  <tr> <td>Sodium</td>   <td>Argon</td>     </tr>
</table>
```
{: title="src/htmlcss/table.html"}

<table>
  <tr> <th>Alkali</th>   <th>Noble Gas</th> </tr>
  <tr> <td>Hydrogen</td> <td>Helium</td>    </tr>
  <tr> <td>Lithium</td>  <td>Neon</td>      </tr>
  <tr> <td>Sodium</td>   <td>Argon</td>     </tr>
</table>

Do *not* use tables to create multi-column layouts:
there's a better way.

## Links {#s:htmlcss-links}

Links to other pages are what makes HTML hypertext.
Confusingly,
the element used to show a link is called `a`.
The text inside the element is displayed and (usually) highlighted for clicking.
Its `href` attribute specifies what the link is pointing at;
both local filenames and URLs are supported.
Oh,
and we can use `<br/>` to force a line break in text
(with a trailing slash inside the tag, since the `br` element doesn't contain any content):

```html
<a href="https://nodejs.org/">Node.js</a>
<br/>
<a href="https://facebook.github.io/react/">React</a>
<br/>
<a href="../index.html">home page (relative path)</a>
```
{: title="src/htmlcss/links.html"}

<a href="https://nodejs.org/">Node.js</a>
<br/>
<a href="https://facebook.github.io/react/">React</a>
<br/>
<a href="../index.html">home page (relative path)</a>

## Images {#s:htmlcss-images}

Images can be stored inside HTML pages in two ways:
by using SVG (which we will discuss [later](../vis/)
or by encoding the image as text and including that text in the body of the page,
which is clever,
but makes the source of the pages very hard to read.

It is far more common to store each image in a separate file
and refer to that file using an `img` element
(which also allows us to use the image in many places without copying it).
The `src` attribute of the `img` tag specifies where to find the file;
as with the `href` attribute of an `a` element,
this can be either a URL or a local path.
Every `img` should also include a `title` attribute (whose purpose is self-explanatory)
and an `alt` attribute with some descriptive text to aid accessibility and search engines.

```html
<img src="./html5.png" title="HTML5 Logo" alt="Displays the HTML5 logo using a local path" />
<img src="https://github.com/software-tools-in-javascript/js-vs-rc/blob/master/src/htmlcss/html5.png"
     title="HTML5 Logo" alt="Display the HTML5 logo using a URL" />
```
{: title="src/htmlcss/images.html"}

Two things are worth noting here:

1. Since `img` elements don't contain any text,
   they are often written with the trailing-slash notation.
   However,
   they are also often written improperly as `<img src="...">` without any slashes at all.
   Browsers will understand this,
   but some software packages will complain.
2. If an image file is referred to using a path rather than a URL,
   that path can be either [relative](../gloss/#g:relative-path) or [absolute](../gloss/#g:absolute-path).
   If it's a relative path,
   it's interpreted starting from where the web page is located;
   if it's an absolute path,
   it's interpreted relative to wherever the web browser thinks the [root directory](../gloss/#g:root-directory) of the filesystem is.
   As we will see [later](../server/),
   this can change from one installation to the next,
   so you should always try to use relative paths,
   except where you can't.
   It's all very confusing...

## Cascading Style Sheets {#s:htmlcss-css}

When HTML first appeared, people styled elements by setting their attributes:

```html
<html>
  <body>
    <h1 align="center">Heading is Centered</h1>
    <p>
      <b>Text</b> can be highlighted
      or <font color="coral">colorized</font>.
    </p>
  </body>
</html>
```
{: title="src/htmlcss/style-with-attributes.html"}

Many still do,
but a better way is to use [Cascading Style Sheets](../gloss/#g:css) (CSS).
These allow us to define a style once and use it many times,
which makes it much easier to maintain consistency.
(I was going to say "...and keep pages readable",
but given how complex CSS can be,
that's not a claim I feel I can make.)
Here's a page that uses CSS instead of direct styling:

```html
<html>
  <head>
    <link rel="stylesheet" href="simple-style.css" />
  </head>
  <body>
    <h1 class="title">Heading is Centered</h1>
    <p>
      <span class="keyword">Text</span> can be highlighted
      or <span class="highlight">colorized</span>.
    </p>
  </body>
</html>
```
{: title="src/htmlcss/style-with-css.html"}

The `head` contains a link to a CSS file stored in the same directory as the page itself;
we could use a URL here instead of a relative path,
but the `link` element *must* have the `rel="stylesheet"` attribute.
Inside the page,
we then set the `class` attribute of each element we want to style.

The file `simple-style.css` looks like this:

```css
h1.title {
  text-align: center;
}
span.keyword {
  font-weight: bold;
}
.highlight {
  color: coral;
}
```
{: title="src/htmlcss/simple-style.css"}

Each entry has the form `tag.class` followed by a group of properties inside curly braces,
and each property is a key-value pair.
We can omit the class and just write (for example):

```css
p {
  font-style: italic;
}
```

in which case the style applies to everything with that tag.
If we do this,
we can override general rules with specific ones:
the style for a disclaimer paragraph is defined by `p` with overrides defined by `p.disclaimer`.
We can also omit the tag and simply use `.class`,
in which case every element with that class has that style.

As suggested by the earlier discussion of separators,
elements may have multiple values for class,
as in `<span class="keyword highlight">...</span>`.
(The `span` element simply marks a region of text,
but has no effect unless it's styled.)

These two features are one
(but unfortunately not the only)
common source of confusion with CSS:
If one may override general rules with specific ones
but also provide multiple values for class,
how do we keep track of which rules will apply to an element with multiple classes?
A detailed discussion of the order of precedence for CSS rules
is outside the scope of this tutorial. We recommend that those
likely to work often with stylesheets read (and consider bookmarking)
[this W3Schools page][css-precedence].

One other thing CSS can do is match specific elements.
We can label particular elements uniquely within a page using the `id` attribute,
then refer to those elements using `#name` as a [selector](../gloss/#g:selector).
For example,
if we create a page that gives two spans unique IDs:

```html
<html>
  <head>
    <link rel="stylesheet" href="selector-style.css" />
  </head>
  <body>
    <p>
      First <span id="major">keyword</span>.
    </p>
    <p>
      Full <span id="minor">explanation</span>.
    </p>
  </body>
</html>
```
{: title="src/htmlcss/selectors.html"}

then we can style those spans like this:

```css
#major {
  text-decoration: underline red;
}
#minor {
  text-decoration: overline blue;
}
```
{: title="src/htmlcss/selector-style.css"}

> **Internal Links**
>
> We can also link directly to an element within a page using `#name`
> inside the `href` attribute of a link.
> For example,
> `<a href="selectors.html#major">some text</a>` refers to the `#major` element in `selectors.html`,
> while `<a href="selectors.html#minor">some text</a>` refers to the `#minor` element.
> This is particularly useful *within* pages:
> `<a href="#major">jump</a>` takes us straight to the `#major` element within this page.
> Internal links like this are often used for cross-referencing and to create a table of contents.

## Bootstrap {#s:htmlcss-bootstrap}

CSS can become very complicated very quickly,
so most people use a framework to take care of the details.
One of the most popular is [Bootstrap][bootstrap]
(which is what we're using to style this website).
Here's the entire source of a page that uses Bootstrap
to create a two-column layout with a banner at the top:

```html
<html>
  <head>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css">
    <style>
      div {
        border: solid 1px;
      }
    </style>
  </head>
  <body>

    <div class="jumbotron text-center">
      <h1>Page Title</h1>
      <p>Resize this page to see how the layout adjusts dynamically.</p>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-sm-4">
          <h2>First column is 4 wide</h2>
          <p>Text here goes</p>
          <p>in the column</p>
        </div>
        <div class="col-sm-8">
          <h2>Second column is 8 wide</h2>
          <p>Text over here goes</p>
          <p>in the other column</p>
        </div>
      </div>
    </div>

  </body>
</html>
```
{: title="src/htmlcss/bootstrap.html"}

The page opens by loading Bootstrap from the web;
we can also download `bootstrap.min.css` and refer to it with a local path.
(The `.min` in the file's name signals that the file has been [minimized](../gloss/#g:minimization)
so that it will load more quickly.)

The page then uses a `style` element to create an [internal style sheet](../gloss/#g:internal-style-sheet)
to put a solid one-pixel border around every `div`
so that we can see the regions of the page more clearly.
Defining styles in the page header is generally a bad idea,
but it's a good way to test things quickly.
Oh,
and a `div` just marks a region of a page without doing anything to it,
just as a `span` marks a region of text without changing its appearance
unless we apply a style.

The first `div` creates a header box (called a "jumbotron") and centers its text.
The second `div` is a container,
which creates a bit of margin on the left and right sides of our content.
Inside that container is a row with two columns,
one 4/12 as wide as the row and the other 8/12 as wide.
(Bootstrap uses a 12-column system because 12 has lots of divisors.)

The names `col-sm-4` and `col-sm-8` deserve some explanation.
Bootstrap is [responsive](../gloss/#g:responsive-design):
elements change size as the page grows narrower,
and are then stacked when the screen becomes too small to display them side by side.
The `-sm-` means "do this for small devices";
we can also define behavior for medium-sized screens with `-med-`.
The rules are rather complicated,
and are out of the scope of this tutorial.

We've left out many other aspects of HTML and CSS as well,
such as figure captions,
multi-column table cells,
and why it's so hard to center text vertically within a `div`.
One thing we will return to [later](../display/) is
how to include interative elements like buttons and forms in a page.
Handling those is part of why JavaScript was invented in the first place,
but we need more experience before tackling them.

## Exercises {#s:htmlcss-exercises}

### Cutting Corners

What does your browser display if you forget to close a paragraph or list item tag
like this:

```html
<p>This paragraph starts but doesn't officially end.

<p>Another paragraph starts here but also doesn't end.

<ul>
  <li>First item in the list isn't closed.
  <li>Neither is the second.
</ul>
```

1. What happens if you don't close a `ul` or `ol` list?
2. Is that behavior consistent with what happens when you omit `</p>` or `</li>`?

### Mix and Match

1. Create a page that contains a 2x2 table,
   each cell of which has a three-item bullet-point list.
   How can you reduce the indentation of the list items within their cells using CSS?
2. Open your page in a different browser (e.g., Firefox or Edge).
   Do they display your indented lists consistently?
3. Why do programs behave inconsistently?
   Why do programmers do this to us?
   Why?
   Why why why why why?

### Naming

What does the `sm` in Bootstrap's `col-sm-4` and `col-sm-8` stand for?
What other options could you use instead?
Why do web developers still use FORTRAN-style names in the 21st Century?

### Color

HTML and CSS define names for a small number of colors.
All other colors must be specified using [RGB](../gloss/#g:rgb) values.
Write a small JavaScript program that creates an HTML page
that displays the word `color` in 100 different randomly-generated colors.
Compare this to the color scheme used in your departmental website.
Which one hurts your eyes less?

### Units

What different units can you use to specify text size in CSS?
What do they mean?
What does *anything* mean, when you get right down to it?

{% include links.md %}
