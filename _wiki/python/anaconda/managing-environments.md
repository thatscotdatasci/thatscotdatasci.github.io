---
title: Managing Anaconda Environmnets
date: 2018-03-18
display-date: Y
categories: [ Python ]
tags: [ Anaconda ]
---

Full information about managing Anaconda environments can be found [here](https://conda.io/docs/user-guide/tasks/manage-environments.html) - the information below has been taken from this source.

## Creating an Environment

Create an new Anaconda environment with the command:

{% highlight bash %}
conda create --name|-n myenv
{% endhighlight %}

The environment can be created to use a specific version of Python by specifying:

{% highlight bash %}
conda create -n myenv python=<desired version>
{% endhighlight %}
<br><br>

## Listing Environments

To list the available environments, run one of the following commands:

{% highlight bash %}
conda info --envs
{% endhighlight %}

OR

{% highlight bash %}
conds list env
{% endhighlight %}
<br><br>

## Activating an Environment

To activate an environment (on Windows), run the following command:

{% highlight bash %}
activate <environment>
{% endhighlight %}
