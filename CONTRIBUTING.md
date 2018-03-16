---
layout: default
permalink: "/contributing/"
title: Contributing
---
We welcome contributions of all kinds to both the text and the example
code.  By contributing, you agree that we may redistribute your work
under [our license](../license/).  In exchange, we will address your
issues and/or assess your proposed changes as promptly as we can.

*Please note that all participants in this project
are required to abide by our [Code of Conduct](../conduct/).*

## Design Notes

1. Content pages are all in the collection `sections`, but are either
   lessons or appendices, which are distinguished by using the layouts
   `lesson` and `appendix` respectively.

1. The overall order for the lessons and appendices is specified in
   the `toc` section of `_config.yml`, which identifies files by their
   permalinks.  Unfortunately, Jekyll doesn't provide a way to sort
   the elements of a collection by an external key, so several
   inclusions use a doubly-nested loop to order items according to
   `site.toc`.  This makes total processing time O(N^3), since the
   doubly-nested loop is run once per page.  (See [Possible
   Improvements](#possible-improvements) below.)

1. Inter-page links use `[term](../page/)`, since
   all generated pages are in their own sub-directories.  They should
   use `[term]({% raw %}{{/page/|relative_url}}{% endraw %})`, but
   that's a lot more typing for the average author.

1. References to asset files *do* use `relative_url` because they need
   to work both in per-page subdirectories and from the root directory
   (where the overall `index.html` page is placed).

1. `_includes/bref` and `_includes/btitle` cite bibliography entries
    by citation key and title respectively.  Both expect a single
    parameter `key`, which must match a key in `_data/bib.yml`.

## Possible Improvements

Adding an 'order' attribute to each page would dramatically improve
performance, since pages could then be ordered in O(N^2 log N) (i.e.,
an O(N log N) sort done once for each of N pages).  However, authors
would then have to edit multiple pages each time they wanted to change
page order: in particular, inserting or deleting a page would require
them to edit the sequence numbers of all downstream pages, which
experience shows is both tedious and error-prone.

Instead, it should be possible to use the list in `site.toc` to set
page order:

1. Construct a `{permalink => index}` map from `site.toc`.

2. Loop over `site.sections` and add an `order` attribute to each
   entry by looking up its permalink in that map.

3. Use `{% raw %}{{site.sections | sort: 'order' }}{% endraw %}` to
   sort sections.

4. Loop over the sorted collection and set `previous` and `next`
   for each item to support inter-page linking.

Step 1, 2, and 4 have O(N) runtime, so this method would have the
same overall O(N^2 log N) runtime as a method based on an explicit
ordering key. However, steps 1 and 2 do not appear to be possible
with Jekyll out of the box.
