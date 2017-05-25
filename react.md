---
layout: page
permalink: "/react/"
title: "Building Dynamic Web Pages with React"
---

> **Questions**
>
> - FIXME

- In the beginning, people created HTML pages by typing them in
- Quickly realized that a lot of pages shared a lot of content
  - Headers, footers, etc.
- Create a _template_ with some embedded commands to:
  - Include other bits of HTML (like headers)
  - Loop over data structures to create lists and tables
- _Server-side page generation_ because:
  - That's where the data was
  - That was the only place code could be run

FIXME: diagram

- Balance shifted as browsers and JavaScript became more powerful
- Current standard model is:
  - JavaScript running in the browser fetches data from one or more servers
  - Uses that data to generate HTML in the browser for display
- Allows the client to decide how best to render data
  - Increasingly important as mobile devices take over from PCs

FIXME: diagram

- Lots and lots (and lots) of JavaScript frameworks for building views
- We have chosen React because it is:
  - Freely available
  - Simpler than many alternatives
  - Widely used
  - Well documented
- Central design principles are:
  - Use functions to describe the desired HTML
  - Let React decide which functions to run when data changes
- Show how to do it the pure-JavaScript way
- Then introduce a tool called JSX that simplifies things
