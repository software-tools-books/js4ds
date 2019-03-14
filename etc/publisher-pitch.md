# Book Proposal: JavaScript versus Data Science

-   [Toby Hodges](https://tbyhdgs.info/)
-   [Greg Wilson](http://third-bit.com/)

## Proposed Title

Main title: *JavaScript versus Data Science*

Subtitle: *A Brief Guide for Those Who Regret That This Has Become Necessary*

## Author Data

Dr. Toby Hodges<br/>
Karlsruher Strasse 69<br/>
69126 Heidelberg<br/>
Baden-Württemberg<br/>
Germany<br/>
tbyhdgs@gmail.com

Dr. Greg Wilson<br/>
65 Highfield Road<br/>
Toronto, Ontario<br/>
Canada M4L 2T9<br/>
gvwilson@third-bit.com

## Book Description

JavaScript is the language of the web.
Originally developed for making browser-based interfaces more dynamic,
it is now used for large-scale software projects of all kinds,
including scientific visualization tools and data services.
However,
most researchers and data scientists have little or no experience with it,
and most introductions to it are written for people who want to build shopping carts
rather than share maps of coral reefs.

This book is designed to fill that void.
It introduces readers to JavaScript's power and ideosyncracies,
and guides them through the key features of the modern version of the language
and its tools and libraries.
The book places equal focus on client- and server-side programming,
and shows readers how to create interactive web content,
build and test data services,
and visualize data in the browser.

## Unique Selling Points

1.  Written by two very experienced instructors
    (between them, the authors have more than thirty years of teaching experience).

2.  All of the material is grounded in practical applications
    that are representative of the problems researchers encounter in real life.

## What Readers Will Learn

-   Core features of modern JavaScript
-   Programming with callbacks and promises
-   Creating objects and classes
-   Writing HTML and CSS
-   Creating interactive pages with React
-   Building data services
-   Testing
-   Data visualization
-   Combining everything to create a three-tier web application

## Source Code

All material is available at
<https://github.com/software-tools-in-javascript/js-vs-ds>.

## Key Words

-   JavaScript

-   Data science

## Audience

From <https://software-tools-in-javascript.github.io/js-vs-ds/en/intro/>:

**Bhadra**
received a BSc in microbiology five years ago,
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

**Efraim**
did fieldwork for the Ministry of Natural Resources for thirty-one years.
He learned Visual Basic so that he could write Excel macros,
then mastered C in order to maintain the control software
for some second-hand remote sensing equipment.
Efraim recently retired,
and is now an active member of several citizen science projects.
This book will show him how to create a service
to share those projects' data with the world,
and how to build a web-based administrative interface for it.

**Sumi**
is completing a PhD in 19th Century history.
As part of her research,
she is transcribing and cataloging the records of several dozen Japanese-American midwives.
She has been creating and customizing WordPress sites for several years,
and has picked up bits and pieces of JavaScript while doing so.
Sumi is about to start looking for a job,
and wants to create an interactive website to showcase her research.
This book will fill in some of the gaps in her knowledge
and show her how to take advantage of JavaScript's more modern features.

## Competition

Ashley Davis: *Data Wrangling with JavaScript*.
Manning, 2018,
<https://www.manning.com/books/data-wrangling-with-javascript>.
This step-by-step guide to managing data with JavaScript
is solidly grounded in real-world problems,
but focuses on only one aspect of JavaScript's use (data wrangling),
and its reliance on a library developed solely by the author is not necessarily a strength.

Martijn Haverbeke: *Eloquent Javascript*.
No Starch Press, 2018,
<https://eloquentjavascript.net/>.
A widely-used programmer-oriented guide to modern JavaScript,
it is representative of the many books that *aren't* appropriate for our audience,
as it assumes more background in computer science than most researchers have,
and does not use examples that researchers will find engaging.

## Estimated Page

Not counting code samples, the book is about 38,000 words
(208 pages when formatted as US 6x9).

## Estimated Schedule

We completed the book in January 2019,
and since then have incorporated errata from several readers.
For publication,
we would want to make minor revisions to several examples
and include more diagrams.

## Author Information

### Author Bio/CV

**[Toby Hodges](https://tbyhdgs.info/)** is a bioinformatician turned community
coordinator, working on the [Bio-IT Project](https://bio-it.embl.de) at
[EMBL](https://www.embl.de). He teaches a lot of courses in computing, organizes
a lot of community-building events, listens to a lot of punk rock, and
occasionally still finds time to write code and ride his bike.  Toby would like
to thank his wife for her support and patience while he swore about how annoying
JavaScript is to debug.

**[Greg Wilson](http://third-bit.com/)** has worked for 35 years in both
industry and academia, and is the author or editor of several books on computing
and two for children. He co-founded [Software Carpentry][carpentries], a
non-profit organization that teaches basic computing skills to researchers, and
is now part of the education team at [RStudio](http://rstudio.com).  Greg would
like to thank everyone at [Rangle](https://rangle.io/) who was so patient with
him when he was learning JavaScript.

### Author Platform

Toby: I give at least one conference talk each year, plus seminars at my
workplace (the European Molecular Biology Laboratory) and at other similar 
institutes by invitation. I am active on Twitter under the handle @tbyhdgs.

Greg: I give conference presentations once or twice a year, and blog several
times a month.  I was very active on Twitter for almost a decade, but have
(mostly) dropped off since December 2018.

## License

The existing material is available under the CC-BY license,
and we would like some sort of open license to apply to the published work.

## Table of Contents

1.  Introduction: 1
    1.  Who You Are: 1
    1.  Setting Up: 2
    1.  Who We Are: 2
    1.  Exercises: 3
    1.  Key Points: 3
1.  Basic Features: 5
    1.  Hello, World: 5
    1.  Basic Data Types: 5
    1.  Control Flow: 6
    1.  Formatting Strings: 7
    1.  Objects: 8
    1.  Functions: 9
    1.  Modules: 10
    1.  Exercises: 12
    1.  Key Points: 14
1.  Callbacks: 17
    1.  The Call Stack: 17
    1.  Functions of Functions: 19
    1.  Anonymous Functions: 22
    1.  Functional Programming: 22
    1.  Closures: 24
    1.  Exercises: 27
    1.  Key Points: 29
1.  Objects and Classes: 31
    1.  Doing It By Hand: 31
    1.  Classes: 32
    1.  Inheritance: 34
    1.  Protocols: 35
    1.  Exercises: 39
    1.  Key Points: 41
1.  HTML and CSS: 43
    1.  Formatting: 43
    1.  Text: 43
    1.  Pages: 44
    1.  Attributes: 45
    1.  Lists: 46
    1.  Tables: 47
    1.  Links: 47
    1.  Images: 48
    1.  Cascading Style Sheets: 49
    1.  Bootstrap: 51
    1.  Exercises: 52
    1.  Key Points: 53
1.  Manipulating Pages: 55
    1.  Counting Paragraphs: 55
    1.  Creating a Table of Contents: 57
    1.  Sortable Lists: 59
    1.  Bibliographic Citations: 62
    1.  A Real-time Clock: 65
    1.  Exercises: 66
    1.  Key Points: 67
1.  Dynamic Pages: 69
    1.  Hello, World: 70
    1.  JSX: 71
    1.  Creating Components: 73
    1.  Developing with Parcel: 74
    1.  Multiple Files: 75
    1.  Exercises: 77
    1.  Key Points: 78
1.  Visualizing Data: 79
    1.  Vega-Lite: 79
    1.  Local Installation: 84
    1.  Exercises: 86
    1.  Key Points: 86
1.  Promises: 87
    1.  The Execution Queue: 88
    1.  Promises: 90
    1.  Using Promises: 94
    1.  async and await: 97
    1.  Exercises: 98
    1.  Key Points: 100
1.  Interactive Sites: 103
    1.  But It Doesn't Work: 105
    1.  Models and Views: 108
    1.  Fetching Data: 111
    1.  Exercises: 116
    1.  Key Points: 117
1.  Managing Data: 119
    1.  Data Formats: 119
    1.  Slicing Data: 120
    1.  Data Manager: 121
    1.  Exercises: 125
    1.  Key Points: 126
1.  Creating a Server: 127
    1.  HTTP: 127
    1.  Hello, Express: 130
    1.  Handling Multiple Paths: 131
    1.  Serving Files from Disk: 132
    1.  Content Types: 133
    1.  Exercises: 134
    1.  Key Points: 135
1.  Testing: 137
    1.  Introducing Mocha: 137
    1.  Refactoring: 139
    1.  Testing the Server: 139
    1.  Checking the HTML: 141
    1.  Exercises: 142
    1.  Key Points: 143
1.  Capstone Project: 145
    1.  Data Manager: 145
    1.  Server: 145
    1.  API: 147
    1.  The Display: 148
    1.  The Tables: 151
    1.  The Chart: 153
    1.  Running It: 154
    1.  Exercises: 156
    1.  Key Points: 157
1.  Conclusion: 159
    1.  Key Points: 159

Bibliography: 161

Appendices
1.  License: 163
1.  Code of Conduct: 165
1.  Citation: 167
1.  Contributing: 169
1.  Glossary: 171
1.  Key Points: 181
1.  Collaborating: 187
1.  Legacy JavaScript Issues: 191
1.  Logging: 195
1.  Extensible Servers: 197
1.  Using a Database: 199
1.  Deploying: 213
