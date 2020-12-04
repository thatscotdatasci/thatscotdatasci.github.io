---
title: Table of Contents
date: 2020-12-04
display-date: Y
toc: Y
categories: [ Jekyll ]
tags: [ General ]
---

**^^^ A guide to how I got this to appear! ^^^**

Hence the judicious use of headers in this article.

# Introduction

Whilst I usually try to keep my blog and wiki posts fairly succinct, sometimes a longer article is necessary.
To make such pages easier to read, I went in search of a simple way to add a table of contents to my pages.

# Options, options

This site is hosted via GitHub pages, which supports [kramdown](http://kramdown.gettalong.org/) and GitHub's own extended
[CommonMark](https://commonmark.org/) Markdown processors. I currently use kramdown, which supports the insertion of a
table of comments by adding the following to the appropriate point in the markdown page:

```markdown
* TOC
{:toc}
```

However, I also came across the [allejo/jekyll-toc](https://github.com/allejo/jekyll-toc) project, which implements a
pure Liquid table of contents. According to the author, it's being used (or has been at some point in the past) by an
impressive number of projects. Therefore, I thought I'd give it a shot. Advantages are that it can be included in page
templates, doesn't use JS, and it potentially easier to style.

# Jekyll Pure Liquid Table of Contents

The only file required from the repository is [toc.html](https://raw.githubusercontent.com/allejo/jekyll-toc/master/_includes/toc.html).
I placed this in my `_includes` directory.

Then, I added the following to `_layouts/default.html`, directly underneath where I define the header block
(at some point I should probably spit `default.html` into a couple of separate documents, but its not yet got quite 
unwieldy enough!).

```html
{%- raw  -%}
{% if page.toc == 'Y' %}
  <div class="markdown-toc">
    <b>Contents</b>
    {% include toc.html html=content sanitize=true %}
  </div>
{% endif %}
{% endraw %}
```

You'll see that `toc.html` is being incorporated using the `include` statement, and will only appear on a page if the
`toc` variable is present in the variables block, and set to `Y`. For example, the variables block for this page is as
follows:

```markdown
title: Table of Contents
date: 2018-04-02
display-date: Y
toc: Y
categories: [ Jekyll ]
tags: [ General ]
```

You'll also see that `html` and `sanitize` arguments were passed - see the project docs for more information on these.

# Styling

The `markdown-toc` CSS class is defined as follows (in `_sass/includes/_contents.scss` in my site), which I based on
[this StackOverflow](https://stackoverflow.com/questions/9602936/how-to-create-a-table-of-contents-to-jekyll-blog-post)
answer.

```css
.markdown-toc {
    border: 1px solid $border-color;
    padding: 1em;
    list-style: decimal;
    display: inline-block;
}
```
