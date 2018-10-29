---
permalink: "/en/pages/"
title: "Manipulating Pages"
questions:
- "FIXME"
keypoints:
- "FIXME"
---

FIXME: show readers how to make simple changes to HTML with JavaScript so that
they get something useful before having to dive into promises.

- count-paragraphs.html: count the number of paragraphs
  - get div by class

- show-paragraphs.html: show the number in the page itself
  - get div by ID

- create-toc.html: create a table of contents
  - converting result of querySelectorAll to array so we can map
  - reading innerHTML (so that contained tags are handled properly)

- clock.html
  - put script in the `head` and use `onload` in `body`
  - set a timeout to call this function again in a second
  - get the date, get the fields, turn into strings, pad: this is all vocabulary

- sort-lists.html and sort-lists-event.js: sortable lists
  - sort-lists.html uses onload(), but that has no effect because the page is loaded, not built
  - found this by searching for "run JavaScript when page loaded"
  - fixed it with an event listener (explanation)
  - looking in Firefox console, got warning about character set encoding, searched for that, added utf-8
  - looked up lists, got nothing, realized that `#sorted` is by ID while `.sorted` is by class (no search would help me here)
  - note: functions within functions within functions
  - get all of the children of the list and remove the direct text nodes (whitespace between elements that we don't want to sort)
  - took two searches to figure out how to identify text nodes: could use nodeType (number), but nodeName seemed more expressive
  - note `!==`: always use the triple-equals (which in this case only has two equals signs)
  - another search for "how to get the text of a DOM node"
  - and then another for "how to sort strings in JavaScript" (have seen the "write your own comparison function" trick before)
  - `localeCompare` does the right thing for whatever kind of text you have, sort of
  - searching for "remove all children from node" tells to do it ourselves
  - then add all the (sorted) children

- fixing glossary entries
- citations

## Exercises {#s:htmlcss-exercises}

FIXME: exercises for page manipulation

{% include links.md %}
