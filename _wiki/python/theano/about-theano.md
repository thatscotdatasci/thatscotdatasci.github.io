---
title: About Theano
date: 2018-07-09
display-date: Y
categories: [ Python ]
tags: [ Theano ]
---

[Theano](http://deeplearning.net/software/theano/) is a Python library that allows you to define, optimize, and evaluate mathematical expressions involving multi-dimensional arrays efficiently. Theano features:

- tight integration with NumPy – Use numpy.ndarray in Theano-compiled functions.
- transparent use of a GPU – Perform data-intensive computations much faster than on a CPU.
- efficient symbolic differentiation – Theano does your derivatives for functions with one or many inputs.
- speed and stability optimizations – Get the right answer for log(1+x) even when x is really tiny.
- dynamic C code generation – Evaluate expressions faster.
- extensive unit-testing and self-verification – Detect and diagnose many types of errors.

Theano is a Python library that lets you to define, optimize, and evaluate mathematical expressions, especially ones with multi-dimensional arrays (numpy.ndarray). Using Theano it is possible to attain speeds rivaling hand-crafted C implementations for problems involving large amounts of data. It can also surpass C on a CPU by many orders of magnitude by taking advantage of recent GPUs.

Theano combines aspects of a computer algebra system (CAS) with aspects of an optimizing compiler. It can also generate customized C code for many mathematical operations. This combination of CAS with optimizing compilation is particularly useful for tasks in which complicated mathematical expressions are evaluated repeatedly and evaluation speed is critical. For situations where many different expressions are each evaluated once Theano can minimize the amount of compilation/analysis overhead, but still provide symbolic features such as automatic differentiation.

If numpy is to be compared to MATLAB and sympy to Mathematica, Theano is a sort of hybrid of the two which tries to combine the best of both worlds.
