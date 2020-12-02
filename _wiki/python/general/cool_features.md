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

## Dictionary Updates Using Tuples (Dec 2020)

[Source: Real Python](https://realpython.com/lessons/simpler-updating-dictionaries/)

Note that this uses the dictionary update operator `|=` introduced in Python 3.9.

```python
libraries = {
    "collections": "Container datatypes",
    "math": "Mathematical functions",
}

# Add a new entry using a key-value tuple
libraries |= [("graphlib", "Functionality for graph-like structures")]

libraries
# {'collections': 'Container datatypes', 'math': 'Mathematical functions',
# 'zoneinfo': 'IANA time zone support',
# 'graphlib': 'Functionality for graph-like structures'}

# The same could be achieved using the update method
libraries.update([("graphlib", "Functionality for graph-like structures")])
```

## Typing Annotation Factory

[Source: Real Python](https://realpython.com/python39-new-features/#annotated-type-hints)

Example of a typing annotation factory. Note that this uses the `typing.Annoted` class introduced in Python 3.9,
is an interesting example of how to standardise typing:

```python
from typing import Annotated

class AnnotationFactory:
    def __init__(self, type_hint):
        self.type_hint = type_hint

    def __getitem__(self, key):
        if isinstance(key, tuple):
            return Annotated[(self.type_hint, ) + key]
        else:
            return Annotated[self.type_hint, key]

    def __repr__(self):
        return f"{self.__class__.__name__}({self.type_hint})"

Float = AnnotationFactory(float)

def speed(
    distance: Float["feet"], time: Float["seconds"]
) -> Float["miles per hour"]:
    """Calculate speed as distance over time"""
    ...
```
