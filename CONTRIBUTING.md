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

1. Content pages are divided between two collections: `lessons`, which
   holds the main lesson material, and `appendices`, which holds
   supplementary material. The overall order for the union of the two
   collections is specified in `_data/toc.yml`, where each file is
   identified by its permalink.

2. Jekyll doesn't provide a way to sort collection entries according
   to an external list, so several inclusions use a nested loop to
   order items according to `site.data.toc`.  This means total
   processing is O(N^3), since the doubly-nested loop is run once per
   page.

3. Most inter-page references use {% raw %}[term](../permalink/){% endraw %},
   since all generated pages are in their own sub-directories.  However,
   references to things like asset files use the `relative_url` transform
   because those references need to work both in per-page subdirectories and
   from the root directory (where the overall `index.html` page is placed).

4. `_includes/bref` and `_includes/btitle` create text to cite
    bibliography entries by citation key and title respectively.  Both
    expect a single inclusion parameter `key`, which must match a
    top-level key in `_data/bib.yml`.
