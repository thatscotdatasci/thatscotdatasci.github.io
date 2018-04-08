---
layout: default
title: Blog Home
permalink: /blog
---

Blog articles are coming!

<ul>
  {% for post in site.posts %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
      ({{ post.date | date: '%d/%m/%Y' }})
    </li>
  {% endfor %}
</ul>
