---
title: Multi-Paragraph Lists
date: 2018-04-09
display-date: Y
categories: [ Jekyll ]
tags: [ Markdown ]
---

Whilst I tend to write page layouts and sections of this website in HTML, my wiki articles and blog posts are written in [Markdown](https://daringfireball.net/projects/markdown/). Markdown enables me to write my articles and posts far more quickly than I could in HTML, without loosing any of the functionality I've required (at least not so far).

When putting together [this](https://thatscotdatasci.com/wiki/docker/administration/run-as-non-root-user) wiki article on running Docker commands as a non-root user, I wanted to implement a multi-paragraph list that contained code snippets. An example is shown below.

1. This is my first item:

    ```bash
    Want some code here
    ```

1. This is my second item:

    ```bash
    More code here
    ```

    A comment about the second lot of code.

1. A third item, which doesn't reference any code.

1. A final item

    ```bash
    Yet more code
    ```

## 1 Space, 2 Space, Tabs?

With lots of playing around, a bit of good old Googling, and a Stack Overflow [article](https://stackoverflow.com/questions/18088955/markdown-continue-numbered-list) or [two](https://stackoverflow.com/questions/6235995/markdown-github-syntax-highlighting-of-code-block-as-a-child-of-a-list), I found the solution: indent all markdown to be included in the same list item with **four** spaces.

The markdown which generates the above list is thus as follows:

```markdown
1. This is my first item:

    ```bash
    Want some code here
    ```

1. This is my second item:

    ```bash
    More code here
    ```

    A comment about the second lot of code.

1. A third item, which doesn't reference any code.

1. A final item

    ```bash
    Yet more code
    ```
```

## Lazy lists

In the above Markdown code snippet, note that all of my list items are donoted as **1**. A number followed by a period indicates a list item, and, as long as your indentation is correct, each list item will be incremeneted appropriately. As stated in the markdown [documentation](https://daringfireball.net/projects/markdown/syntax#list):

>_It’s important to note that the actual numbers you use to mark the list have no effect on the HTML output Markdown produces._

This is called **lazy list numbering**. An important note about using lazy list numbering is provided in the documentation:

>_If you do use lazy list numbering, however, you should still start the list with the number 1. At some point in the future, Markdown may support starting ordered lists at an arbitrary number._
