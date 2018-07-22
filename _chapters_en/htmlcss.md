---
layout: default
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
- "Use `<img src=\"...\" alt=\"...\" />` to include images."
- "Use CSS to define appearance of elements."
- "Use `class` and `id` to identify elements."
- "Use selectors to specify the elements that CSS applies to."
---

## Introduction

- HTML is the standard way to represent documents for presentation in web browsers
- CSS is the standard way to describe how it should look
- Both are more complicated than they should have been

## Formatting

- An HTML [document](../gloss/#document) contains [elements](../gloss/#element) and text
  - Full spec allows for other things that we will ignore for now
- Elements are shown using [tags](../gloss/#tag)
  - Opening tag: `<tagname>`
  - Corresponding closing tag: `</tagname>`
  - If there's nothing between the two: `<tagname/>`
- Elements must form a [tree](../gloss/#tree), i.e. must be strictly nested
  - If Y starts inside X, Y must end before X ends
  - So `<X>...<Y>...</Y></X>` is legal...
  - ...but `<X>...<Y>...</X></Y>` is not
- Every document should have a single root element
  - I.e., a single element must enclose everything else
  - Browsers aren't strict about this

## Text

- Text is normal printable text
- Must use escape sequences to represent `<` and `>`
  - In HTML, written `&name;`

| Escape Sequence | Character |
| --------------- | --------- |
| `&lt;`          | &lt;      |
| `&gt;`          | &gt;      |
| `&amp;`         | &amp;     |
| `&copy;`        | &copy;    |

## Pages

- An HTML page should have:
  - Enclosing `html` element
  - A single `head` element containing information about the page
  - A single `body` element containing the displayed content
- Indentation (mostly) doesn't matter
  - But helps human readers
- Well-written pages also use comments (just like code)
  - Introduce with `<!--`, and end with `-->`
  - Unfortunately, comments cannot be nested

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

## Attributes

- Elements can be customized by giving them [attributes](../gloss/#attribute)
  - Enclosed in the opening tag
  - `<h1 align="center">A Centered Heading</h1>`
  - `<p class="disclaimer">This planet provided as-is.</p>`
- An attribute name may appear at most once in any element
  - Like keys in a dictionary
  - So `<p align="left" align="right">...</p>` is illegal
- Values ought to be quoted
  - In practice, can often get away with `name=value`
  - And for Boolean attributes, sometimes just `name`

## Lists

- Use `ul` for an unordered (bulleted) list, and `ol` for an ordered (numbered) one
  - Each list item is wrapped in `li`

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

```js
<ol>
  <li>first</li>
  <li>second</li>
  <li>third</li>
</ol>
```

1. first
2. second
3. third

## Tables

- Use `table` for tables
  - Each row is wrapped in `tr` (for "table row")
  - Within each row, column items are wrapped in `td` (for "table data")
  - Or `th` for headings
  - Do *not* use tables for multi-column layout: there's a better way

```html
<html>
  <head>
    <title>Lists and Tables</title>
  </head>
  <body>
    <table>
      <tr> <th>Alkali</th>   <th>Noble Gas</th> </tr>
      <tr> <td>Hydrogen</td> <td>Helium</td>    </tr>
      <tr> <td>Lithium</td>  <td>Neon</td>      </tr>
      <tr> <td>Sodium</td>   <td>Argon</td>     </tr>
    </table>
  </body>
</html>
```
{: title="src/htmlcss/table.html"}

<html>
  <head>
    <title>Lists and Tables</title>
  </head>
  <body>
    <table>
      <tr> <th>Alkali</th>   <th>Noble Gas</th> </tr>
      <tr> <td>Hydrogen</td> <td>Helium</td>    </tr>
      <tr> <td>Lithium</td>  <td>Neon</td>      </tr>
      <tr> <td>Sodium</td>   <td>Argon</td>     </tr>
    </table>
  </body>
</html>

## Links

- Links to other pages are what makes HTML hypertext
- Use the `a` element to create a link
  - The text inside the element is displayed and (usually) highlighted for clicking
  - The `href` attribute specifies what the link is pointing at
  - Both local filenames and URLs are supported

```html
<a href="http://gvwilson.github.io/js-vs-rc/">This course</a>
<a href="https://nodejs.org/">Node.js</a>
<a href="https://facebook.github.io/react/">React</a>
```
{: title="src/htmlcss/links.html"}

## Images

- Store a reference to an external file using the `img` tag
- The `src` attribute specifies where to find the file
  - Can be either a URL or a local path
- The `alt` attribute is text for accessibility and search engines

```html
<img src="./html5.png" alt="HTML5 Logo with local path"/>
<img src="https://github.com/gvwilson/js-vs-rc/blob/master/src/htmlcss/html5.png" alt="HTML5 logo online"/>
```
{: title="src/htmlcss/images.html"}

## Cascading Style Sheets

- When HTML first appeared, people styled it using attributes

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

- Many still do, but a better way is to using [Cascading Style Sheets](../gloss/#css) (CSS)
  - Separates content from presentation
  - Easier to maintain consistency

```html
<html>
  <head>
    <link href="simple-style.css" rel="stylesheet" />
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

- Usual form is `tag.class` followed by a group of properties
  - Each property is a key/value pair
- Can omit the class, in which case the style applies to everything with that tag
  - Unless overridden by something more specific
- Can omit the tag and simply use `.class`
- Element may have multiple values for class
  - Try `<span class="keyword highlight">...</span>`

- Can label particular elements uniquely within the page using `id="name"` attribute
- Then refer to those elements using `#name` [selector](../gloss/#selector)
- Can also use `parent > child` to select elements that are within specified other elements

```html
<html>
  <head>
    <link href="selector-style.css" rel="stylesheet" />
  </head>
  <body>
    <p>
      First <span id="major">keyword</span>.
    </p>
    <p class="details">
      Full <span id="minor">explanation</span>.
    </p>
  </body>
</html>
```
{: title="src/htmlcss/selectors.html"}

```css
#major {
  text-decoration: underline red;
}
#minor {
  text-decoration: overline blue;
}
.details {
  font-style: italic;
}
```
{: title="src/htmlcss/selector-style.css"}

## Bootstrap

- CSS can become very complicated very quickly
- Most people rely on a framework to take care of the details
- One of the most widely used is Bootstrap

```html
<html>
  <head>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
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

- Page opens by loading Bootstrap from the web
  - Can also download and use locally
- Then defines a style that puts a solid one-pixel border around every `div`
  - Defining styles in the page header is generally a bad idea, but it's a good way to test things quickly
- First div creates a header box with centered text
- Second div is a container (creates a bit of marging on the left and right)
- Inside is a row with two columns
  - First column is 4/12 wide
  - Second column is 8/12 wide
  - Bootstrap uses 12 because it has lots of divisors
- Bootstrap is [responsive](../gloss/#responsive-design)
  - Elements change to stacked layout when screen is small

- Note: interactive elements (buttons, forms) are deferred to React chapter

## Challenges

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
All other colors must be specified using [RGB](../gloss/#rgb) values.
Write a small JavaScript program that creates an HTML page
that displays the word `color` in 100 different randomly-generated colors.
Compare this to the color scheme used in your departmental website.
Which one hurts your eyes less?

### Units

What different units can you use to specify text size in CSS?
What do they mean?
What does *anything* mean, when you get right down to it?
