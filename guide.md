---
layout: page
permalink: "/guide/"
---
{% for item in site.toc %}
{% if item.type == "lesson" %}
{% capture heading %}<a href="..{{item.permalink}}">{{item.title}}</a>{% endcapture %}
{% include listblock.html title=heading items=item.keypoints class="guide" section=true %}
{% endif %}
{% endfor %}
