# Design Notes

1. Jekyll doesn't provide a way to sort collection entries according
   to an external list, so several inclusions use a nested loop to
   order items according to `site.data.toc`.  This means total
   processing is O(N**3), since the doubly-nested loop is run once per
   page.

2. `bref` and `btitle` create text to cite bibliography entries by
    citation key and title respectively.  Both expect a single
    inclusion parameter `key`, which must match a top-level key in
    `_data/bib.yml`.
