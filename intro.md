---
layout: page
permalink: "/intro/"
---

I was originally going to call this book *JavaScript for Scientists and Engineers*,
but [David Beazley thought that "versus" would make a better title]({{site.data.links.beazley_tweet}}).
That one-word change sums up how many people view the language,
but I hope I can convince you that modern JavaScript is usable as well as useful.
I also changed the second half of the title in the hope that
this guide will help librarians,
digital humanists,
and everyone else who uses computing in their research,
not just scientists and engineers.

## Who You Are

Every lesson should aim to meet the needs of specific learners
{% include bref key="Wils2017" %}.
The three people described below define the intended audience for this one.

**Bhadra** received a BSc in microbiology five years ago,
and has worked since then for a biotech firm with labs in four countries.
She did a statistics class using R as an undergrad,
then learned some more R and some Unix shell scripting
in a [Software Carpentry]({{site.data.links.swc}}) workshop,
but has no other training as a programmer.
Bhadra's team is developing tools
to detect structural similarities between proteins.
They would like to build a browser interface to their tools
so that people can test different algorithms on various data sets.
This book will show Bhadra how to build, test, and deploy that interface.

**Efraim** did fieldwork for the Ministry of Natural Resources for thirty-one years.
He learned Visual Basic so that he could write Excel macros,
then mastered C in order to maintain the control software
for some second-hand remote sensing equipment.
Efraim recently retired,
and is now an active member of several citizen science projects.
This book will show him how to create a service
to share those projects' data with the world,
and how to build a web-based administrative interface for it.

**Sumi** is completing a PhD in 19th Century history.
As part of her research,
she is transcribing and cataloging the records of several dozen Japanese-American midwives.
She has been creating and customizing [WordPress]({{site.data.links.wordpress}}) sites for several years,
and has picked up bits and pieces of JavaScript while doing so.
Sumi is about to start looking for a job,
and wants to create an interactive website to showcase her research.
This book will fill in some of the gaps in her knowledge
and show her how to take advantage of JavaScript's more modern features.

## Setting Up

You can do the exercises in the first part of this course online,
but will need to install some software on your own computer
to do the later ones.

- For small exercises, use an online service like [RunKit]({{site.data.links.runkit}})
- For larger things, install the latest Long-term Support (LTS) versions of Node and NPM from <https://nodejs.org/en/download/>
- `node` is a command-line interpreter for JavaScript
  - The command `node` on its own starts a [read-evaluate-print loop](../gloss/#repl)
    - Executes commands as they are typed in
    - Displays their output
  - The command `node filename.js` runs the commands in `filename.js`
    - We will see [later](../display/) how to run JavaScript in a browser
- `npm` is Node's [package manager](../gloss/#package-manager)
  - A command-line tool for finding, installing, and updating libraries that your program depends on
  - Use <code>npm install --global <em>library-name</em></code> (without `.js` extension) to install a library globally
    (i.e., so that all projects can load it)
  - Use <code>npm install --save <em>library-name</em></code> to install in the current project
    - A better idea, since it isolates projects from one another
    - We will see [later](../display/) how to create projects

<div class="challenges" markdown="1">

## Challenges

### Setting Up

Install Node and NPM on your computer,
then run the commands `node --version` and `npm --version`
to see which versions you have.

</div>
