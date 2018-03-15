---
layout: appendix
permalink: "/guide/"
title: Guide
---
{% for toc_entry in site.data.toc %}{% for item in site.lesson %}{% if toc_entry == item.permalink %}
{% capture heading %}<a href="..{{item.permalink}}">{{item.title}}</a>{% endcapture %}
{% include listblock.html title=heading items=item.keypoints class="guide" heading=h4 %}
{% endif %}{% endfor %}{% endfor %}
