---
title: Run as Non-Root User
date: 2018-04-08
display-date: Y
categories: [ Docker ]
tags: [ Administration ]
---

As per the Docker [post-install documentation][docker-post-install-url]:

> _The docker daemon binds to a Unix socket instead of a TCP port. By default that Unix socket is **owned by the user root and other users can only access it using sudo**. The docker daemon always runs as the root user._

Having to continuously prepend your docker commands with **sudo** can be tedius, but thankfully there is an alternative.

## Become a Docker groupie

Again from the Docker [post-install documentation][docker-post-install-url]:

> _If you don’t want to use sudo when you use the docker command, **create a Unix group called docker and add users to it**. When the docker daemon starts, it makes the ownership of the Unix socket read/writable by the docker group._

Thus, run the following commands:

1. Create the docker group:

    ```bash
    sudo groupadd docker
    ```

1. Add users to the newly created docker group:

    ```bash
    sudo usermod -aG docker <username>
    ```

    Make sure to use an uppercase **G** (to add Docker as a supplementary group for the user), rather than a lowercase **g** (which will change the user's primary group to Docker)

1. Log out and log back in to re-evaluate your group membership

1. Verify that docker commands can be run without sudo. Running a new instances of the [hello-world](https://hub.docker.com/_/hello-world/) container would be one way to test this:

    ```bash
    docker run hello-world
    ```

## Stay safe

Returning to the Docker [post-install documentation][docker-post-install-url] one last time:

> **Warning**: The docker group grants privileges equivalent to the root user.

Docker provides details on how this impacts security in your system [here](https://docs.docker.com/engine/security/security/#docker-daemon-attack-surface).

[docker-post-install-url]: https://docs.docker.com/install/linux/linux-postinstall/
