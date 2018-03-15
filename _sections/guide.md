---
layout: appendix
permalink: "/guide/"
title: Guide
---
{% for toc_entry in site.toc %}{% for item in site.sections %}{% if item.layout == "lesson" %}{% if toc_entry == item.permalink %}
{% include listblock.html title=item.title link=item.permalink level="h3" class="guide" items=item.keypoints %}
{% endif %}{% endif %}{% endfor %}{% endfor %}
