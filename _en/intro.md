---
permalink: "/en/intro/"
title: "Introduction"
questions:
- "Why is this course called 'versus'?"
- "What are the main topics of this course?"
- "Is this the right course for me?"
- "How do I set up my computer to do the exercises?"
keypoints:
- "Modern JavaScript is a good tool for building desktop and web-based applications."
- "This course is for people who know what loops and functions are, but have never used JavaScript or built web applications."
- "Node is a command-line interpreter for JavaScript, which can be used interactively or to run scripts in files."
- "NPM is the Node Package Manager, which can be used to find, install, and update libraries."
---

## Who You Are {#s:intro-personas}

Every lesson should aim to [meet the needs of specific learners][t3-process] [Wils2018](#b).
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

You can do the exercises in the first part of this course online,
but will need to install some software on your own computer
to do the later ones.

For small exercises as you're getting started,
you can use an online service like [RunKit][runkit],
which gives you an interactive JavaScript playground in your browser.
For larger things,
and for chapters starting with the one on [creating dynamic web pages](../display/),
you should [download and install][node-download] the latest Long-term Support (LTS) versions of Node and NPM.

`node` is a command-line interpreter for JavaScript
like those for languages such as Python and R.
The command `node` on its own starts a [read-evaluate-print loop](../gloss/#g:repl)
that executes commands as they are typed in and displays their output.
The command `node filename.js` reads and runs the commands in `filename.js`;
we will see [later](../display/) how to run JavaScript in a browser.

`npm` the Node [Package Manager](../gloss/#g:package-manager),
a command-line tool for finding, installing, and updating JavaScript libraries.
The command <code>npm install --global <em>library-name</em></code> (without a `.js` extension)
installs a library [globally](../gloss/#g:global-intallation) so that all projects can use it,
while <code>npm install --save <em>library-name</em></code> installs the library [locally](../gloss/#g:local-installation)
(i.e., in the current project folder).
Local installation is usually a better idea,
since it isolates projects from one another;
we will explore this [later](../display/) when we look at how to create projects.

## Exercises {#s:intro-exercises}

### Setting Up

Install Node and NPM on your computer,
then run the commands `node --version` and `npm --version`
to see which versions you have.

{% include links.md %}
