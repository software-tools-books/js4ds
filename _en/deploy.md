---
title: "Deploying"
---

Running applications on our laptop is fine for testing,
but sooner or later we will want to put them on the web for others to use.
A general discussion of [deployment](#g:deployment) is outside the scope of these lessons,
particularly because it shouldn't be done without thinking carefully about security,
but there are now a few entry-level platforms you can try out.

One of the simplest of these platforms is [Glitch][glitch],
which is designed to help students build their first interactive websites.
It isn't designed to host large, high-traffic applications,
but is great for prototyping and classroom use.
To try it out,
go to <https://glitch.com> and create a free account.
You can then click on the "New Project" button in the upper right and select `hello-express`,
which will create a basic Express application.
This project contains a handful of files that you should find familiar:

-   `README.md`: a description of the project formatted in Markdown.
-   `package.json`: the NPM package listing for the project.
-   `server.js`: the server.
    This is initially set up to route requests for `/` to `/views/index.html`,
    but can be made as complicated as we want.
    Note that it uses a variable called `__dirname` (with two leading underscores)
    to get the name of the directory that the server is running in;
    this is needed because Glitch controls where our application runs.
-   `views/index.html`: the application's home page.
    We can add as many other pages as we want,
    but they have to go in the `views` folder.
-   `public/client.js`: the user interface code that is run in the browser.
    The `public` folder acts as the root directory for the server,
    so inside `views/index.html` and other web pages,
    we refer to `public/client.js` simply as `/client.js`.
-   `public/style.css`: the CSS that styles the application.
    Again,
    inside `views/index.html` we refer to this file as `/style.css`
    without naming the `public` folder.
-   `.env`: a shell script that defines any secret configuration variables the application needs,
    such as passwords for databases.
    Unlike the files above,
    this one *isn't* automatically copied when someone clones our application.
    If we define a variable called `PASSWORD` in this file,
    then our server can get its value (as a string) using `process.env.PASSWORD`.
    Life might have been a little simpler if Glitch's creators had used a JSON file instead of a shell script,
    but as long as we stick to simple `NAME=VALUE` pairs,
    we'll be OK.

Two things that *aren't* automatically present are a license and a Code of Conduct,
but both can easily be added by clicking on the "New File" button.
Several widely-used open source licenses are available,
and the Code of Conduct is based on one that is also widely used in open source projects.
Adding both makes it clear what we are allowing and expecting people to do with our project.

The "Rewind" button in the bottom of the file explorer lets us view the project's history.
Glitch uses Git to store changes,
but presents those changes as a timeline
so that we can scroll backward and forward to see what was altered when.
The "Tools" button (also in the bottom of the file explorer)
gives us access to run logs and performance information,
and lets us connect our project to a repository on GitHub.

Behind the scenes,
every Glitch application runs in a virtual machine.
Any data that it creates or modifies
(such as files on disk or SQLite databases [s:db](#REF)) are automatically saved,
up to a limit of 128 MByte.
An application is allowed to handle several thousand requests per hour;
if it doesn't receive any requests for 5 minutes,
the virtual machine is put to sleep.
It is automatically restarted the next time a request comes in,
but there will be a lag as it wakes up.

{% include links.md %}
