---
title: Django Command Reference
date: 2020-12-03
display-date: N
categories: [ Python ]
tags: [ Django ]
---

The purpose of this page is to record some key commands that are used regularly.


## Create a new project

Command to create a new django project:

```python
django-admin startproject <project name>
```

To create the management app inside the current directory (i.e. don't create a new directory):

```python
django-admin startproject <project name> .
```


## Create a new app

Command to create a new django app in a project:

```python
python manage.py startapp <app name>
```
