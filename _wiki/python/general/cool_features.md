---
title: Cool Features and Snippets
date: 2020-12-01
display-date: N
categories: [ Python ]
tags: [ General ]
---

Repo of various cool features and code snippets I've come across, which are too small to have their own page.

## REPL: Access return value of previous expression (Dec 2020)

[Source: Real Python](https://realpython.com/lessons/importlibmetadata/)

It's possible to access the return value of the previous expression in a REPL session using an underscore:

```python
[i for i in range(5)]  # List has been created, but not assigned to a variable
_[3]  # This will return the third element in the list, which is 
```
