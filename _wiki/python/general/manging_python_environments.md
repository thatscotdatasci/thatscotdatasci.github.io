---
title: Managing Python Environments
date: 2020-11-27
display-date: Y
categories: [ Python ]
tags: [ General ]
---

Reference doc for some good articles on python virtual environment tools;
along with lists and links for the common version, virtual environment and package management tools.

## Articles

- [Real Python - Python Virtual Environments: A Primer](https://realpython.com/python-virtual-environments-a-primer/)
- [Real Python - An Effective Python Environment](https://realpython.com/effective-python-environment/)
  - Good discussion of shells and terminals, as well as tools for managing python virtual environments
- [Pluralsight Tech Blog - Managing Python Environments](https://www.pluralsight.com/tech-blog/managing-python-environments/)
- [Dev - Python Tools for Managing Virtual Environments](https://dev.to/bowmanjd/python-tools-for-managing-virtual-environments-3bko)

## Python Version Management

- [pyenv](https://github.com/pyenv/pyenv)
- conda - [Anaconda](https://www.anaconda.com/)/[Miniconda](https://docs.conda.io/en/latest/miniconda.html)
  - I initially started developing in Python using the Anaconda distribution, hence tend to use conda to manage environments
  
## Virtual Environments

- [venv](https://docs.python.org/3/library/venv.html)
- [pyenv virtualenv](https://github.com/pyenv/pyenv-virtualenv)
- [virtualenv](https://virtualenv.pypa.io/)
- [conda](https://docs.conda.io/projects/conda/en/latest/user-guide/tasks/manage-environments.html)
- [pipenv](https://docs.pipenv.org/)
  - Has concept of `Pipfile` and `Pipfile.lock`

## Package Management

- [pip](https://realpython.com/courses/what-is-pip/)
- [pipenv](https://docs.pipenv.org/)
- [poetry](https://poetry.eustace.io/)
- [conda](https://docs.conda.io/projects/conda/en/latest/commands/install.html)