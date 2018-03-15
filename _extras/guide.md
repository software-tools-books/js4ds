---
layout: extra
permalink: "/guide/"
title: Guide
---
{% for toc_entry in site.data.toc %}{% for item in site.lessons %}{% if toc_entry == item.permalink %}
{% capture heading %}<a href="..{{item.permalink}}">{{item.title}}</a>{% endcapture %}
{% include listblock.html title=heading items=item.keypoints class="guide" section=true %}
{% endif %}{% endfor %}{% endfor %}
