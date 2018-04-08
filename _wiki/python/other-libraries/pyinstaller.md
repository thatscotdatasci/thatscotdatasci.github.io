---
title: PyInstaller
date: 2018-03-25
display-date: Y
categories: [ Python ]
tags: [ Other Libraries ]
---

[PyInstaller](https://github.com/pyinstaller/pyinstaller) is a great tool for generating standalone exe files from Python scripts. The exe generated can be configured to not only contain all the necessary Python libraries to run the script, but also the necessary Python runtime environment itself. Whilst this does result in a fairly sizeable exe, it extremely handy for quickly allowing non-tech users to run your script themself, without any setup being required.

I've used this a couple of times before; usually providing a zip file which contains the exe, along with a config file that users can easily modify to provide their arguments.

## Generate the Exe

One PyInstaller has been installed, the basic command for generating the exe package is:

{% highlight bash %}
pyinstaller myscript.py
{% endhighlight %}

However, this will generate the exe **plus** various addition directories and files which must be kept with it.

To produce a standalone exe (which contains all of the necessary gubbins), run the same command with the **--onefile** argument:

{% highlight bash %}
pyinstaller --onefile myscript.py
{% endhighlight %}

More information about using PyInstaller can be found in their [documentation](https://pyinstaller.readthedocs.io/en/stable/usage.html).
