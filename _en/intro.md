---
permalink: "/en/intro/"
title: "Introduction"
questions:
- "Is this the right course for me?"
- "How do I set up my computer to do the exercises?"
keypoints:
- "Modern JavaScript is a good tool for building desktop and web-based applications."
- "This course is for people who know what loops and functions are, but have never used JavaScript or built web applications."
- "Node is a command-line interpreter for JavaScript, which can be used interactively or to run scripts in files."
- "NPM is the Node Package Manager, which can be used to find, install, and update libraries."
---

## Who You Are {#s:intro-personas}

Every lesson should aim to [meet the needs of specific learners][t3-process] [[Wils2018](../bib/#b:Wils2018)].
The three people described below define the intended audience for this one.

Bhadra
: received a BSc in microbiology five years ago,
  and has worked since then for a biotech firm with labs in four countries.
  She did a statistics class using R as an undergrad,
  then learned some more R and some Unix shell scripting
  in a [Software Carpentry][swc] workshop,
  but has no other training as a programmer.
  Bhadra's team is developing tools
  to detect structural similarities between proteins.
  They would like to build a browser interface to their tools
  so that people can test different algorithms on various data sets.
  This book will show Bhadra how to build, test, and deploy that interface.

Efraim
: did fieldwork for the Ministry of Natural Resources for thirty-one years.
  He learned Visual Basic so that he could write Excel macros,
  then mastered C in order to maintain the control software
  for some second-hand remote sensing equipment.
  Efraim recently retired,
  and is now an active member of several citizen science projects.
  This book will show him how to create a service
  to share those projects' data with the world,
  and how to build a web-based administrative interface for it.

Sumi
: is completing a PhD in 19th Century history.
  As part of her research,
  she is transcribing and cataloging the records of several dozen Japanese-American midwives.
  She has been creating and customizing WordPress sites for several years,
  and has picked up bits and pieces of JavaScript while doing so.
  Sumi is about to start looking for a job,
  and wants to create an interactive website to showcase her research.
  This book will fill in some of the gaps in her knowledge
  and show her how to take advantage of JavaScript's more modern features.

## Setting Up {#s:intro-setup}

The exercises at the end of each chapter include new information
that you will need later in the book,
and are therefore not optional.
You can do the first few online,
using a service like [RunKit][runkit],
which gives you an interactive JavaScript playground in your browser.
For larger things,
and for chapters starting with the one on [creating dynamic web pages](../dynamic/),
you should [download and install][node-download] the latest Long-term Support (LTS) versions of Node and NPM.

[Node](../gloss/#g:node-js) is an open source implementation of JavaScript
that includes a command-line interpreter like those for languages such as Python and R.
The command `node` on its own starts a [read-evaluate-print loop](../gloss/#g:repl)
that executes commands as they are typed in and displays their output.
The command `node filename.js` reads and runs the commands in `filename.js`;
we will see [later](../pages/) how to run JavaScript in a browser.

`npm` is the Node [Package Manager](../gloss/#g:package-manager),
a command-line tool for finding, installing, and updating JavaScript libraries.
The command <code>npm install --global <em>library-name</em></code> (without a `.js` extension)
installs a library [globally](../gloss/#g:global-installation) so that all projects can use it,
while <code>npm install --save <em>library-name</em></code> installs the library [locally](../gloss/#g:local-installation)
(i.e., in the current project folder).
Local installation is usually a better idea,
since it isolates projects from one another.

## Who We Are {#s:intro-contributors}

<img src="../../files/hodges-toby.png" alt="Toby Hodges" width="100" />

**[Toby Hodges][hodges-toby]** is a bioinformatician turned community
coordinator, working on the [Bio-IT Project](https://bio-it.embl.de) at
[EMBL](https://www.embl.de). He teaches a lot of courses in computing, organizes
a lot of community-building events, listens to a lot of punk rock, and
occasionally still finds time to write code and ride his bike.  Toby would like
to thank his wife for her support and patience while he swore about how annoying
JavaScript is to debug.

<!-- == \noindent -->
<img src="../../files/wilson-greg.png" alt="Greg Wilson" width="100" />

**[Greg Wilson][wilson-greg]** has worked for 35 years in both industry and
academia, and is the author or editor of several books on computing and two for
children. He co-founded of [Software Carpentry][carpentries], a non-profit
organization that teaches basic computing skills to researchers, and is now part
of the education team at [RStudio](http://rstudio.com).  Greg would like to
thank everyone at [Rangle](https://rangle.io/) who was so patient with him when
he was learning JavaScript.

### Acknowledgments {#s:intro-acknowledgments}

We are also grateful for fixes from:

- [Stephan Druskat](https://github.com/sdruskat)
- [Eric Leung](https://erictleung.com/)
- [Peter Munro](https://github.com/pdm55)

## Exercises {#s:intro-exercises}

### Setting Up

Install Node and NPM on your computer,
then run the commands `node --version` and `npm --version`
to see which versions you have.

{% include links.md %}
