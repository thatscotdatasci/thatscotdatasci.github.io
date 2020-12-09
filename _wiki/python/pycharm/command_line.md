---
title: PyCharm on the Command Line
date: 2020-12-09
display-date: Y
categories: [ Python ]
tags: [ PyCharm ]
---

Following the [PyCharm documentation](https://www.jetbrains.com/help/pycharm/working-with-the-ide-features-from-command-line.html),
create `/usr/local/bin/pycharm` and populate it with:

```shell
#!/bin/sh

open -na "PyCharm.app" --args "$@"
```

Make sure to then also run: `chmod +x /usr/local/bin/pycharm`.

PyCharm can then be opened in the current directory by executing: `pycharm .`; see the PyCharm documentation for further
options.
