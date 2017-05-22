---
layout: page
permalink: "/htmlcss/"
title: "HTML and CSS"
---

> **Questions**
>
> - FIXME: key questions

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
- First version of [XML](./glossary/#xml) standardized in 1998
  - A set of rules for defining markup languages
  - Much more complex than HTML, but still simpler than SGML
- HTML5 (finally) standardized in 2014
  - Supports most of the things sensible people do in practice

## Formatting

- An HTML [document](./glossary/#document) contains [elements](./glossary/#element) and [text](./glossary/#text)
  - Full spec allows for other things that we will ignore for now
- Elements are shown using [tags](./glossary/#tag-xml)
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
  - FIXME: table of common special characters

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

- Elements can be customized by giving them [attributes](./glossary/#attribute)
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

FIXME: example

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

## Images

- Store a reference to an external file using the `img` tag
- The `src` attribute specifies where to find the file
  - Can be either a URL or a local path
- The `alt` attribute is text for accessibility and search engines

<!-- @src/htmlcss/images.html -->
```html
<html>
  <body>
    <img src="./html5.png" alt="HTML5 Logo with local path"/>
    <img src="https://github.com/gvwilson/js-vs-rc/blob/master/src/htmlcss/html5.png" alt="HTML5 logo online"/>
  </body>
</html>
```

## Links

- Links to other pages are what makes HTML hypertext
- Use the `a` element to create a link
  - The text inside the element is displayed and (usually) highlighted for clicking
  - The `href` attribute specifies what the link is pointing at
  - Both local filenames and URLs are supported

<!-- @src/htmlcss/links.html -->
```html
<html>
  <body>
    <a href="http://gvwilson.github.io/js-vs-rc/">This course</a>
    <a href="https://nodejs.org/">Node.js</a>
    <a href="https://facebook.github.io/react/">React</a>
  </body>
</html>
```

## Cascading Style Sheets

- FIXME: explain

## Summary

FIXME: summarize chapter

> **Key Points**
>
> - FIXME

## Challenges

FIXME: write challenges
