---
title: Reference-Style Links in Markdown
date: 2018-04-22
display-date: Y
categories: [ Jekyll ]
tags: [ Markdown ]
---

Being very keen to attribute credit where it's due, and provide additonal reading materials, I tend to use a lot of hyperlinks in my blog posts and wiki articles. Occasionally I even see the need to use the same URL multiple times in the same piece.

Rather than actually repeat the URL several times (leading to messy looking code) I tend to define it at the end of my markdown, and then reference the name I assigned to it wherever desired. In the [markdown documentation](https://daringfireball.net/projects/markdown/syntax#link), this is known as a **reference-style link**.

An example of this is shown in the below markdown snippet:

```markdown
I really think that [That Scot Data Sci][url] is one of the best tech resources on the internet. It can be found [here][url], or you can chose to click on the same link [here][url] if you prefer.

[url]:https://thatscotdatasci.com/
```

Which produces the following:

I really think that [That Scot Data Sci][url] is one of the best tech resources on the internet. It can be found [here][url], or you can chose to click on the same link [here][url] if you prefer.

[url]:https://thatscotdatasci.com/
