---
layout: default
title: Managing Anaconda Environmnets
permalink: /wiki/Python/Anaconda/Managing_Environments
---

# Managing Anaconda Environments

Full information about managing Anaconda environments can be found [here](https://conda.io/docs/user-guide/tasks/manage-environments.html) - the information below has been taken from this source.
<br><br>

## Creating an Environment

Create an new Anaconda environment with the command:

**conda create --name\|-n myenv**

The environment can be created to use a specific version of Python by specifying:

**conda create -n myenv python=\<desired version\>**
<br><br>

## Listing Environments

To list the available environments, run one of the following commands:

**conda info --envs**

OR

**conds list env**
<br><br>

## Activating an Environment

To activate an environment (on Windows), run the following command:

**activate \<environment\>**
