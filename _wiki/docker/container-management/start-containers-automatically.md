---
title: Start Container Automatically
date: 2018-04-15
display-date: Y
categories: [ Docker ]
tags: [ Container Management ]
---

As per the Docker [documentation](https://docs.docker.com/config/containers/start-containers-automatically/):

>_Docker provides restart policies to control whether your containers start automatically when they exit, or when Docker restarts. Restart policies ensure that linked containers are started in the correct order. Docker recommends that you use restart policies, and avoid using process managers to start containers._

To configure a docker container to restart automatically, include the `--restart` flag when using the `docker run` command. For example, the following command will start the hello-world container and will _"configure it to always restart unless it is explicitly stopped or Docker is restarted"_:

```bash
docker run --restart unless-stopped hello-world
```

## Options, options

The value of the `restart` flag can be any of the following:

* `no` - do not automatically restart the container (default)
* `on-failure` - restart the container if it exits due to an error, which manifests as a non-zero exit code
* `unless-stopped` - restart the container unless it is explicitly stopped or Docker itself is stopped or restarted
* `always` - always restart the container if it stops

## Will it restart?

To identify what restart policy applies to a container that is already running, use the `docker inspect <container>` [command](https://docs.docker.com/engine/reference/commandline/inspect/) which _"Returns low-level information on Docker objects."_

A Stack Overflow [answer](https://stackoverflow.com/questions/43108227/is-it-possible-to-show-the-restart-policy-of-a-running-docker-container) provides an example of the JSON output returned by `docker inspect`, for a container which has not be configured to automatically restart:

```json
"HostConfig": {
            "Binds": null,
            "ContainerIDFile": "",
            "LogConfig": {
                "Type": "json-file",
                "Config": {}
            },
            "NetworkMode": "default",
            "PortBindings": {},
            "RestartPolicy": {
                "Name": "no",
                "MaximumRetryCount": 0
            },
            "AutoRemove": true,
```
