---
layout: default
title: Wiki
permalink: /wiki/index.html
---

# Wiki Home

**This is the wiki homepage**

Wiki of the useful things I come across

{% assign rawtags = "" %}
{% for wiki in site.wiki %}
  {% assign ttags = wiki.tags | join:'|' | append:'|' %}
  {% assign rawtags = rawtags | append:ttags %}
{% endfor %}
{% assign rawtags = rawtags | split:'|' | sort %}

{% assign tags = "" %}
{% for tag in rawtags %}
  {% if tag != "" %}
    {% if tags == "" %}
      {% assign tags = tag | split:'|' %}
      {% endif %}
      {% unless tags contains tag %}
      {% assign tags = tags | join:'|' | append:'|' | append:tag | split:'|' %}
    {% endunless %}
  {% endif %}
{% endfor %}

{% for tag in tags %}
  <h2 id="{{ tag | slugify }}">{{ tag }}</h2>
  <ul>
  {% for wiki in site.wiki %}
    {% if wiki.tags contains tag %}
      <li>
      <h3>
      <a href="{{ wiki.url }}">
      {{ wiki.title }}
      </a>
      {% for tag in wiki.tags %}
        <a class="tag" href="/wiki/tag/#{{ tag | slugify }}">({{ tag }})</a>
      {% endfor %}
      </h3>
      </li>
    {% endif %}
  {% endfor %}
  </ul>
{% endfor %}
