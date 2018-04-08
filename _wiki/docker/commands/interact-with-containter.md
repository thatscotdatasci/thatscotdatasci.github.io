---
title: Interact with a Running Container
date: 2018-04-08
display-date: Y
categories: [ Docker ]
tags: [ Commands ]
---

It's a common scenario: one of your Docker containers is running, and you need to access its filesystem. Perhaps something has gone wrong and you want to troubleshoot by taking a look at logs, or perhaps there's a config file that you want to query.

The [attach](https://docs.docker.com/engine/reference/commandline/attach/) command will allow you to see the standard input, output and error streams of a running container, but what if you're looking for something that isn't captured by these streams?

{% highlight bash %}
docker attach <options> <container>
{% endhighlight %}

## Breaking in

Individual Docker containers are princiaplly used to run a single process, or set of processes, but can run as many processes as desired. You can start a new process in a container even whilst it's running using the [exec][docker-exec-url] command.

With this in mind, to gain console access to a running container you simply need to use the [exec][docker-exec-url] command to start a new instance of the bash process on the container of interest, providing the **-it** arguments as follows:

{% highlight bash %}
docker exec -it <container> bash
{% endhighlight %}

Explaining the options provided to the [exec][docker-exec-url] command:
- **-i, --interactive**:  Keep STDIN open even if not attached
- **-t, --tty**: Allocate a pseudo-TTY

When done, simply type **exit** and the bash process will be stopped. Barring any modifications you made to the container whilst inside the bash process, it will be as if you were never there.

[docker-exec-url]: https://docs.docker.com/engine/reference/commandline/exec/
