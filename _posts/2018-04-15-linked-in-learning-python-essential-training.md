---
layout: default
title: LinkedIn Learning - Essentials
date: 2018-04-15
display-date: Y
categories: [ Learning ]
tags: [ Python, LinkedIn Learning ]
---

Whilst I've written many Python scripts, and have completed various types of Python training courses before, I find it's useful to occasionally go back and recap on the basics.

For this reason, this weekend I spent a few hours completing the LinkedIn Learning [Python Essentials](https://www.linkedin.com/learning/python-essential-training-2?u=2031476) course by [Bill Weinman](https://bw.org/), which teaches Python3.

This blog consists of the notes I wrote down whilst taking this course, and some links to additional reading I completed. A lot of the notes are very basic, but are good to remember, and be reminded of (especially as technical interview questions are often based on key principles of a language).

## Notes:

* Everything is an object in Python3, hence we can call a function directly of a string as follows:

	```python
  hello world'.upper()
  ```
* **Shebang** (`#!`)
	- Use `#!/usr/bin/env python3`
	- This will identify the location of python3, regardless of the Linux distribution being used
* **Statement**: unit of execution
	- A line of code, not requiring a semi-colon in python
	- Can use semi-colons to implement more than one statement on a single line
* **Expression**: unit of evaluation; anything which returns a value
	- All function calls return a value; although this may often be none
* If `__name__ == '__main__': main()` is implemented at the very end the script, and all statements are contained within functions, no code will run until the entire script has been loaded, which prevents null assignment issues
* No such thing as a multiline comment in Python, need to use # at the start of each commented line
* Print formatting:
	- Use curly brackets as placeholder
  ```python
  x = 42
  print('Hello, World {}'.format(x))
  ```
* In Python2, string was not an object and print was not a function:

  ```python
  x = 42
  print 'Hello, World %d' % x
  ```
	- THIS IS NOW DEPRECATED AND SHOULD NOT BE USED; it will be removed eventually
	- Always use the format method
* New in Python 3.6; can use what’s called **f string** (where f stands for format):

  ```python
  x = 42
  print(f'Hello, World {x}')
  ```
  - Introduced in [PEP 498](https://www.python.org/dev/peps/pep-0498/)
* Blocks do not define the scope of variables:
	- Hence this is fine:
  ```python
    if true:
    	x = 3

    print(f'x is {x}')
  ```
* It's frowned upon to have statement on the same line as a condition:
	- i.e. `if True: print('Hello, World')`
* No switch statement in Python
* A class is a definition, and an object is an instance of a class
	- The first argument for a method inside of a class is always self. This is a reference to the object when the class is used to create an object.
* Python uses a form of dynamic typing sometimes called dynamic typing: the type of a value is determined by the value itself
  - If it walks like a duck, it's a duck
  - Useful [blog post](https://hackernoon.com/i-finally-understand-static-vs-dynamic-typing-and-you-will-too-ad0c2bd0acc7) on static vs. dynamic typing.
* Single quotes and double quotes are interchangeable
* Triple quotes are used to define multiline strings
* Specified positional arguments in string formatting:
  ```python
  '{1} is the {0} day of the week'.format('first', 'Monday')
  ```
  - Will produce `Monday is the first day of the week`
  - Probably want to use f strings though
* Don't use floats when dealing with money
  - Something like `0.1 + 0.1 + 0.1 - 0.3` can return `5.551...e-17`
  - This is a [documented](https://docs.python.org/3/tutorial/floatingpoint.html) limitation of the Float type
  - It's a problem of precision vs. accuracy, as detailed in the Floating-point Arithmetic [Wikipedia page](https://en.wikipedia.org/wiki/Floating-point_arithmetic)
  - Instead, we want to use something like the decimal library:
  ```python
    from decimal import Decimal

    # We pass in a string, rather than a float
    # Otherwise, we would end up with the same problem as if we'd just used a float
    a = Decimal('0.10')
    b = Decimal('0.30')
    x = a + a + a - b
  ```
  - The value of x will be `0.00`, and its type will be `decimal.Decimal`
  - Don't always need to be concerned with this, but it is worth bearing in mind
* The following evaluate as False:
  - The NoneType
  - An empty string
  - The number 0
* A **mutable** object can be changed after it is created, an **immutable** object can't
  - Good [blog post](https://medium.com/@meghamohan/mutable-and-immutable-side-of-python-c2145cf72747) on mutability in Python
  >_Objects of built-in types like (int, float, bool, str, tuple, unicode) are immutable. Objects of built-in types like (list, set, dict) are mutable. Custom classes are generally mutable. To simulate immutability in a class, one should override attribute setting and deletion to raise exceptions._
  - Should remember that the contents of immutable containers are often themselves mutable:
  >_Python containers liked tuples are immutable. That means value of a tuple can't be changed after it is created. But the "value" of a tuple is infact a sequence of names with unchangeable bindings to objects. The key thing to note is that the bindings are unchangeable, not the objects they are bound to._
  - For example:
  ```python
    a = 1
    b = 2
    c = ['a', 'b', 'c']

    # The following tuple would print as (1, 2, ['a', 'b', 'c'])
    t = (a, b, c)

    # This cannot be done as tuples are immutable; a TypeError would be returned
    t[1] = c

    # This will not change the value of the first item in the tuple, as int objects are immutable
    a = 4

    # Lists are mutable, and so the first value of the list in the tuple will be changed
    c[0] = 'd'

    # The tuple would now print as (1, 2, ['d', 'b', 'c'])
  ```
* Preferable to favour immutable type tuple over mutable type list, unless you know you are going to re-assign the items in the list
* Range objects are immutable
* Can iterate over the keys and values of a dictionary as follows:
  ```python
  # x is a dictionary
  for k, v in x.items():
    print(f'k: {k}, v: {v}')
  ```
- The built-in Python function `id` (documented [here](https://docs.python.org/3/library/functions.html#id)):
  >_Returns the “identity” of an object. This is an integer which is guaranteed to be unique and constant for this object during its lifetime. Two objects with non-overlapping lifetimes may have the same id() value._
  - The significance is as follows:
  ```python
    x = 1
    y = 1

    # These would both have the same value
    print(id(x))
    print(id(y))

    # The variable a would be a Boolean type with value True
    # There is only  one literal object that is the number 1
    # There's no reason for Python to create separate objects as the int 1 is immutable
    a = x is y
  ```
* In the same way that all variables which point to an immutable int of value 1 will have the same id (because they are the same object), the same is true for all other immutable types. For instance if both `x = 'thatscotdatasci'` and `y = 'thatscotdatasci'` then `x is y` will return true, and `id(x)` and `id(y)` will have the same value.
* Check type using `isinstance`:
  ```python
    a = [1, 2, 3]

    # t would be a Boolean type with value True
    t = isinstance(a, list)
  ```
  - Useful when you know a variable may have different types, and you want to handle each possible type
* According to the [Wikipedia](https://en.wikipedia.org/wiki/Ternary_operation) definition of a **ternary operator**:
  >_In computer science, a ternary operator is an operator that takes three arguments.[1] The arguments and result can be of different types. Many programming languages that use C-like syntax[2] feature a ternary operator, ?:, which defines a conditional expression._
  - In [Python](http://book.pythontips.com/en/latest/ternary_operators.html):
  >_Ternary operators are more commonly known as conditional expressions in Python. These operators evaluate something based on a condition being true or not._
  - For example:
  ```python
    x = True if 2 > 1 else False
  ```
* In Python3, when you perform division the result will always be a float object, even if you started with two integers and there is no remainder
* Python does not have an [XOR](https://en.wikipedia.org/wiki/XOR_gate) operator
  - One way of acheiving this is as follows ([Stack Overflow](https://stackoverflow.com/questions/432842/how-do-you-get-the-logical-xor-of-two-variables-in-python)):
    ```python
      (a and not b) or (not a and b)
    ```
    Which comes from the definition of XOR.
  - Alternatively, the following also works:
    ```python
      bool(a) ^ bool(b)
    ```
    The reason for this is:
    >_The xor operator on two booleans is logical xor (unlike on ints, where it's bitwise). Which makes sense, since bool is just a subclass of int, but is implemented to only have the values 0 and 1. And logical xor is equivalent to bitwise xor when the domain is restricted to 0 and 1._
    For instance:
    ```python
      a = 1
      b = 2

      print(a < 0 ^ b < 5) # Returns True, as b < 5 is True and a < 0 is False

      print(a < 0 ^ b > 5) # Returns False, as both are False

      print(a > 0 ^ b < 5) # Returns False, as both are True
*
