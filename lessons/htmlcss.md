---
layout: page
permalink: "/htmlcss/"
---

## Introduction

- HTML is the standard way to represent documents for presentation in web browsers
- CSS is the standard way to describe how it should look
- Both are more complicated than they should have been

## History

- 1969-1986: Standard Generalized Markup Language (SGML)
  - Developed by Charles Goldfarb and others at IBM
  - A way of adding information to medical and legal documents so that computers could process them
  - Very complex specification (over 500 pages)
- 1989: Tim Berners-Lee creates HyperText Markup Language (HTML) for the World Wide Web
  - Much (much) simpler than SGML
  - Anyone could write it, so everyone did
- Problem: HTML had a small, fixed set of tags
  - Everyone wanted to add new ones
  - Solution: create a standard way to define a set of tags, and the relationships between them
- First version of [XML](../gloss/#xml) standardized in 1998
  - A set of rules for defining markup languages
  - Much more complex than HTML, but still simpler than SGML
- HTML5 (finally) standardized in 2014
  - Supports most of the things sensible people do in practice

## Formatting

- An HTML [document](../gloss/#document) contains [elements](../gloss/#element) and [text](../gloss/#text)
  - Full spec allows for other things that we will ignore for now
- Elements are shown using [tags](../gloss/#tag)
  - Opening tag: `<tagname>`
  - Corresponding closing tag: `</tagname>`
  - If there's nothing between the two: `<tagname/>`
- Elements must be properly nested
  - If Y starts inside X, Y must end before X ends
  - So `<X>…<Y>…</Y></X>` is legal…
  - …but `<X>…<Y>…</X></Y>` is not
- Every document should have a single root element
  - I.e., a single element must enclose everything else
  - Browsers aren't strict about this

## Text

- Text is normal printable text
- Must use escape sequences to represent `<` and `>`
  - In XML, written `&name;`

| Escape Sequence | Character |
| --------------- | --------- |
| `&lt;`          | `<`       |
| `&gt;`          | `>`       |
| `&amp;`         | `&`       |
| `&copy;`        | `©`       |

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

<!-- @src/htmlcss/first-page.html -->
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

## Attributes

- Elements can be customized by giving them [attributes](../gloss/#attribute)
  - Enclosed in the opening tag
  - `<h1 align="center">A Centered Heading</h1>`
  - `<p class="disclaimer">This planet provided as-is.</p>`
- An attribute name may appear at most once in any element
  - Like keys in a dictionary
  - So `<p align="left" align="right">…</p>` is illegal
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

<!-- @src/htmlcss/table.html -->
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

<!-- @src/htmlcss/links.html -->
```html
<a href="http://gvwilson.github.io/js-vs-rc/">This course</a>
<a href="https://nodejs.org/">Node.js</a>
<a href="https://facebook.github.io/react/">React</a>
```

## Images

- Store a reference to an external file using the `img` tag
- The `src` attribute specifies where to find the file
  - Can be either a URL or a local path
- The `alt` attribute is text for accessibility and search engines

<!-- @src/htmlcss/images.html -->
```html
<img src="./html5.png" alt="HTML5 Logo with local path"/>
<img src="https://github.com/gvwilson/js-vs-rc/blob/master/src/htmlcss/html5.png" alt="HTML5 logo online"/>
```

## Cascading Style Sheets

- When HTML first appeared, people styled it using attributes

<!-- @src/htmlcss/style-with-attributes.html -->
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

- Many still do, but a better way is to using [Cascading Style Sheets](../gloss/#css) (CSS)
  - Separates content from presentation
  - Easier to maintain consistency

<!-- @src/htmlcss/style-with-css.html -->
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

<!-- @src/htmlcss/simple-style.css -->
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

- Usual form is `tag.class` followed by a group of properties
  - Each property is a key/value pair
- Can omit the class, in which case the style applies to everything with that tag
  - Unless overridden by something more specific
- Can omit the tag and simply use `.class`
- Element may have multiple values for class
  - Try `<span class="keyword highlight">…</span>`

- Can label particular elements uniquely within the page using `id="name"` attribute
- Then refer to those elements using `#name` [selector](../gloss/#selector)
- Can also use `parent > child` to select elements that are within specified other elements

<!-- @src/htmlcss/selectors.html -->
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

<!-- @src/htmlcss/selector-style.css -->
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

## Bootstrap

- CSS can become very complicated very quickly
- Most people rely on a framework to take care of the details
- One of the most widely used is Bootstrap

<!-- @src/htmlcss/bootstrap.html -->
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

FIXME-19: write challenges

{% include links.md %}
