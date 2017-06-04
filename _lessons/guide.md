---
layout: page
permalink: "/guide/"
title: "Guide"
---

{% for toc in site.toc %}
{% for lesson in site.lessons %}
{% if toc.permalink == lesson.permalink %}
<h2><a href="{{toc.permalink | absolute_url}}">{{toc.title}}</a></h2>
<ul>
  {% for item in lesson.questions %}
  <li>{{item}}</li>{% endfor %}
</ul>
{% break %}
{% endif %}
{% endfor %}
{% endfor %}
