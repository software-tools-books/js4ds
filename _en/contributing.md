---
permalink: "/en/contributing/"
title: "Contributing"
---

{% include contributing.md %}

- If you wish to report errata or suggest improvements to wording,
  please include the chapter name and section name
  (e.g., `Callbacks/Anonymous Functions`)
  in the first line of the body of your report.
  Please note that we use Simplified English rather than Traditional English,
  i.e., American spelling rather than British.

- If you would like to add code fragments,
  please put the source in `src/chapter/long-name.js`.
  Include it in a triple-backquoted code block of type `js`;
  use `sh` for shell commands and `text` for output (including error output).
  If you want to leave out sections of code,
  use `// ...comment...` (i.e., a double-slash comment and triple dots enclosing the text).

- If you would like to add or fix a diagram, please:
  1. Edit the XML file in `./files/` corresponding to the chapter using [draw.io][draw-io].
  2. Select the drawing and export as SVG with a 4-pixel boundary and transparency turned on,
     but *without* including the diagram source in the exported SVG.
  3. Export a second time as PDF (selection only, cropped).
     We have tried automating the SVG-to-PDF conversion with various tools,
     but the results have been unsatisfying.
  4. Edit the Markdown file and include an HTML `figure` element with an ID
     containing (in order) an `img` element with a `src` attribute but nothing else
     and a `figcaption` element with the figure's label.
     **These elements all have to be on one line**
     so that the `sed` magic in the Makefile that gets around Pandoc's handling of figures
     can find and translate the elements correctly.

- The naming conventions for labels are:
  - `s:chapter-section` for section labels
  - `f:chapter-slug` for figure labels
  - `g:slug` for glossary references
  - `b:item` for bibliography references

- If you need to embed a one-line LaTeX command in a Markdown file and have it passed through,
  format it thusly:

      <!-- == \noindent -->

  (i.e., as an HTML comment with a double equals sign and then the command).
  Note that these comments will appear in the generated HTML as well.

The [Jekyll][jekyll] template used in this tutorial can support multiple languages.
We encourage translations;
if you would like to take this on,
please <a href="mailto:{{site.email}}">email us</a>.

{% include links.md %}
