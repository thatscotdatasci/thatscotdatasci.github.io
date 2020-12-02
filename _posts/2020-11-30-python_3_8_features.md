---
layout: default
title: Python 3.8 Features
date: 2020-11-30
display-date: Y
categories: [ Learning ]
tags: [ Python ]
---

Recap of some of the features introduced in Python 3.8, primarily from [Real Python](https://realpython.com/courses/cool-new-features-python-38/)
and the [Python documentation](https://docs.python.org/3/whatsnew/3.8.html).

## The Walrus Operator/Assignment Expression

Introduction of the syntax `:=`, which assigns the outcome of an expression to a variable and also returns the outcome.
In many cases, this enables logic to be implemented in fewer lines, and in a more readable way:

```python
while not end_loop := False:
    ...
```

Example from Real Python:

```python
inputs = list()
while (current := input("Write something: ")) != "quit":
    inputs.append(current)
```

## Positional Only Arguments

It's now possible to enforce that certain arguments to functions are positional-only (i.e. cannot be specified by keyword).
Previously, only built-in functions had this feature (like `float`).

To denote that all preceding arguments must be specified by position only, use the `/` character:

```python
def my_function(a, b, /, c, d):
    """a and b can be passed by position only, whereas c and d can be passed by position or keyword"""    
    pass
```

Note that defaults can still be provided for some/all arguments, whether they be positional only or accept keyword definition:

```python
def my_function(a, b=2, /, c=3, d=3):    
    pass
```

Real Python gives some examples of when it might make sense to use positional-only arguments:

- the arguments to a function have a natural order, but are hard to give good, descriptive names to
- easier to refactor functions: can change the names of parameters without worrying that other code was passing kwargs

Note that it's also possible to specify keyword only arguments using the `*` character:

```python
def my_function(a, b=2, *, c=3, d=3):
    """a and b can be passed by position or keyword, whereas c and d must be passed by keyword"""    
    pass
```

Example of a function definition from Real Python combining positional-only and keyword-only arguments:

```python
def headline(text, /, border="~", *, width=50):
    return f" {text} ".center(width, border)
```

## More Precise Types

### Literal Type

Introduces the `Literal` type: value is expected to belong to a specified collection of values; e.g. `Literal["horizontal", "vertical"]`.

Whilst talking about the literal type and using `mypy` to perform type checking, Real Python discusses function/method [overloading](https://docs.python.org/3/library/typing.html#typing.overload).

> The @overload decorator allows describing functions and methods that support multiple different combinations of argument types.

Example:

```python
@overload
def process(response: None) -> None: ...
@overload
def process(response: int) -> tuple[int, str]: ...
@overload
def process(response: bytes) -> str: ...
def process(response):
    <actual implementation>
```

Note the multiple decorated definitions, which must then be proceeded by a non-decorated definition containing the atual code.
The ellipses (`...`) are required; they stand for the function body in the overloaded signature.

### Final Type

From Real Python:

> This qualifier specifies that a variable or attribute should not be reassigned, redefined, or overridden.

For example, a type checker (e.g. `mypy`) will return an error for the following:

```python
from typing import Final
ID: Final = 1
ID += 1
```

This is useful for ensuring constants are not overridden. Furthermore:

> There is also a @final decorator that can be applied to classes and methods. Classes decorated with @final can’t be subclassed, while @final methods can’t be overridden by subclasses.

Meaning a type checker would return an error for the following, given that `Base` should not be subclassed:

```python
@final
class Base:
    ...

class Sub(Base):
    ...
```

### TypedDict

Previously, it had only been possible to define a single type for each of the keys and values of a dict:

```python
Dict[str, str]  # {"hello": "world"}
Dict[str, int]  # {"hello": 1}
Dict[str, Any]  # {"hello": "world", "good": 2}
```

`Any` (as seen in the final example) was commonly used to get around the limitation.

Using `TypedDict` the following is now possible (taken from Real Python):

```python
from typing import TypedDict

class PythonVersion(TypedDict):
    version: str
    release_year: int

py38 = PythonVersion(version="3.8", release_year=2019)
```

### Protocols

This is a very interesting one. From [PEP 544 -- Protocols: Structural subtyping](https://www.python.org/dev/peps/pep-0544/):

> Type hints introduced in PEP 484 can be used to specify type metadata for static type checkers and other third party tools. 
> However, PEP 484 only specifies the semantics of nominal subtyping. In this PEP we specify static and runtime semantics of protocol classes that will provide a support for structural subtyping (static duck typing).

Real Python discusses nominal vs structural type systems, and protocols, [here](https://realpython.com/python-type-checking/#duck-types-and-protocols):

> - In a **nominal** system, comparisons between types are based on names and declarations. The Python type system is mostly nominal, where an int can be used in place of a float because of their subtype relationship.
> - In a **structural** system, comparisons between types are based on structure. You could define a structural type Sized that includes all instances that define .__len__(), irrespective of their nominal type.

PEP 544 adds the concept of protocols, which introduces a full-fledged structural type system to Python.
A protocol specifies one or more methods that must be implemented, and are a way of formalizing Python’s support for duck typing:

> When I see a bird that walks like a duck and swims like a duck and quacks like a duck, I call that bird a duck. 

The example given by Real Python defines a protocol called Named that can identify all objets with a `.name` attribute:

```python
from typing import Protocol

class Named(Protocol):
    name: str

def greet(obj: Named) -> None:
    print(f"Hi {obj.name}")

class Dog:
    pass

x = Dog()
```

`mypy` would return an error for the above, as the `Dog` class does not have a `name` attribute.

Numerous [predefined protocols](https://mypy.readthedocs.io/en/latest/protocols.html#predefined-protocols) exist in in 
the `typing` module, including: `Sized` (expects a `__len()__` method); and `Iterable` (expects an `__iter()__` method). 

### f-String Debugging

Adding `=` at the end of an expression will print both the expression and its value, making it simpler to debug f-strings.

Real Python example:

```python
python = 3.8

f"{python=}"
# Will return: 'python=3.8'

name = "Eric"
f"{name.upper()[::-1] = }"
# Will return: "name.upper()[::-1] = 'CIRE'"
```

Example from [Python documentation](https://docs.python.org/3/whatsnew/3.8.html#f-strings-support-for-self-documenting-expressions-and-debugging):

```python
user = 'eric_idle'
member_since = date(1975, 7, 31)
f'{user=} {member_since=}'
# Will return: "user='eric_idle' member_since=datetime.date(1975, 7, 31)"
```

## importlib.metadata

The new `importlib.metadata` module provides support for reading metadata from third-party packages,
improving on `pgk_resources` provided with `setuptools` (see [here](https://setuptools.readthedocs.io/en/latest/pkg_resources.html)).

Examples from Real Python of its use:

```python
from importlib import metadata
# Get the version of the pip library installed in the environment
metadata.version("pip")

# Get metadata about the installed pip library
pip_metadata = metadata.metadata("pip")

# Various properties can be accessed from this
pip_metadata["Home-page"]
pip_metadata["Requires-Python"]
len(metadata.files("pip"))
``` 
