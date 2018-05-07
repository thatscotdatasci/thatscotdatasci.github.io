---
title: Multi-Line Quotes
date: 2018-04-15
display-date: Y
categories: [ Jekyll ]
tags: [ Markdown ]
---

The following blockquote quotes the first paragraph of the [Mardown documentation](https://daringfireball.net/projects/markdown/syntax#blockquote) regarding blockquotes:

> Markdown uses email-style > characters for blockquoting. If you’re familiar with quoting passages of text in an email message, then you know how to create a blockquote in Markdown. It looks best if you hard wrap the text and put a > before every line.

All of the above quote was on a single line, but what if I wanted to break it into three separate paragraphs? For example:

> Markdown uses email-style > characters for blockquoting.
>
> If you’re familiar with quoting passages of text in an email message, then you know how to create a blockquote in Markdown.
>
> It looks best if you hard wrap the text and put a > before every line.

The Markdown for the above is as follows:

```markdown
> Markdown uses email-style > characters for blockquoting.
>
> If you’re familiar with quoting passages of text in an email message, then you know how to create a blockquote in Markdown.\\
>
> It looks best if you hard wrap the text and put a > before every line.
```

Note that if you neglect the `>` in the empty lines, you end-up with three separate blockquotes:

> Markdown uses email-style > characters for blockquoting.

> If you’re familiar with quoting passages of text in an email message, then you know how to create a blockquote in Markdown.

> It looks best if you hard wrap the text and put a > before every line.
