---
permalink: "/en/regexp/"
title: "Regular Expressions"
---

A [regular expression](../gloss/#regular-expression) is
a pattern for matching text which is itself written as text.
Alphanumeric characters match themselves,
so the regexp `/abc/` matches the strings `"abc"` and `"some abc here"`,
but not the string `"no a-b-c here"`.
Most punctuation characters have special meaning:
the character `.`, for example, matches any single character,
while `+` means "one or more",
so `/a.+c/` matches an 'a' followed by one or more characters followed by a 'c'.
Regular expressions are widely used in JavaScript,
but are outside the scope of this tutorial.
