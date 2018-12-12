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

- If you would like to add or fix a diagram,
  please edit the XML file in `./files/` corresponding to the chapter
  using [draw.io][draw-io],
  then select the drawing and export as SVG with a 4-pixel boundary and transparency turned on,
  but *without* including the diagram source in the exported SVG.

- The [Jekyll][jekyll] template used in this tutorial can support multiple languages.
  We encourage translations;
  if you would like to take this on,
  please <a href="mailto:{{site.email}}">email us</a>.

{% include links.md %}
