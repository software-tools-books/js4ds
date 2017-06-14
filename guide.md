---
layout: page
permalink: "/guide/"
---
{% for item in site.toc %}
{% if item.type == "lesson" %}
{% capture heading %}<a href="{{item.permalink | absolute_url}}">{{item.title}}</a>{% endcapture %}
{% include inc/listblock.html title=heading items=item.keypoints class="guide" %}
{% endif %}
{% endfor %}
