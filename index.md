---
layout: default
permalink: "/"
---
<div align="center">
  <h1>{{site.title}}</h1>
  <p>{{site.subtitle}}</p>
</div>

This short book is an introduction to modern JavaScript
for scientists, engineers, librarians, digital humanists,
and anyone else who uses computing in their research.
The book and related software are freely available under [open licences]({{site.data.links.license}}),
and can be viewed on [the book's website]({{site.data.links.site}}).
Questions, suggestions, and corrections are very welcome:
please [file an issue]({{site.data.links.issues}})
in the book's [GitHub repository]({{site.data.links.repo}})
or [email the author]({{site.data.links.email}}) directly.

<div class="row">
  <div class="col-sm-6">
    {% include toc.html title="Sections" selector="lesson" %}
  </div>
  <div class="col-sm-6">
    {% include toc.html title="Appendices" selector="appendix" %}
  </div>
</div>
