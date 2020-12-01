---
title: Blog Home
layout: default
permalink: /blog
title-settings: hide
---

As you'll see from the below, I'm not a big blogger - but a resolution for 2021 is to make this more of a habit!

I'll use blogs to discuss things I've discovered and found interesting, or projects I'm working on/have completed.
Wikis will be used to record things I want to bookmark for future reference.

<!---
Below is based on https://stackoverflow.com/questions/19086284/jekyll-liquid-templating-how-to-group-blog-posts-by-year/20777475#20777475
-->
<div>
  {% for post in site.posts %}
    {% assign currentyear = post.date | date: "%Y" %}
    {% if currentyear != year %}
      {% unless forloop.first %}</ul>{% endunless %}
      <h2 id="y{{currentyear}}">{{ currentyear }}</h2>
      <ul>
      {% assign year = currentyear %}
    {% endif %}
      <li><a href="{{ post.url }}">{{ post.title }}</a> ({{ post.date | date: '%d/%m/%Y' }})</li>
    {% if forloop.last %}</ul>{% endif %}
  {% endfor %}
</div>
