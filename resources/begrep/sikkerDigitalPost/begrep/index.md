---
title: Begreper  
permalink: begrep_index.html
sidebar:
---

## {{page.title}}

Beskrivelsene av datatypene gir detaljer om validering og formatregler
for hver datatype. Følgende datatyper er definert:

<ul>

{% assign sortedPages = site.pages | sort: ‘title’ %}

{% for page in sortedPages %}  
{% if page.group == “complexType” %}

<li>

\<a href=“{{page.url | remove:”.html“}}”\>{{page.title}}</a>

</li>

{% endif %}  
{% endfor %}

</ul>
