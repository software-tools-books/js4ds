---
layout: appendix
permalink: "/bib/"
title: Bibliography
---

## Books

{% capture keys %}
{% for bib in site.data.bib %}
  {{ bib[0] }}
{% endfor %}
{% endcapture %}
{% assign sorted = keys | split:' ' | sort %}
{% for key in sorted %}
{% assign entry=site.data.bib[key] %}
[<span id="{{key}}">{{key}}</span>] {{entry.credit}}: <em><a href="{{entry.url}}">{{entry.title}}</a></em>. {{entry.details}}.
{% endfor %}

