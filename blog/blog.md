---
layout: default
title: Blog Home
permalink: /blog
---

As you'll be able to see from the below; I'm not a big blogger - more to come in the future!

<ul>
  {% for post in site.posts %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
      ({{ post.date | date: '%d/%m/%Y' }})
    </li>
  {% endfor %}
</ul>
