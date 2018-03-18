---
layout: default
title: Blog
permalink: /blog
---

# Blog Home

**This is the blog homepage**

Blog articles:

<ul>
  {% for post in site.posts %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul>
