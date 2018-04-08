---
title: Where's the Branch?
date: 2018-03-25
display-date: Y
categories: [ Git ]
tags: [ General ]
---

You know that a branch exists remotely (on GitHub/TFS Git, etc.) but it isn't appearing locally in your IDE, and running:

{% highlight bash %}
git checkout <branch>
{% endhighlight %}

doesn't return any results. Where has the branch gone?

## Hiding in plain sight

First, run the following command to ensure that the branch in question has been pushed to the remote repo:

{% highlight bash %}
git ls-remote origin
{% endhighlight %}

As per the [Git documentation](https://git-scm.com/docs/git-ls-remote.html), this command displays references available in a remote repository along with the associated commit IDs.

Assuming the branch of interest is present in the list returned, all that is needed is a simple [**git fetch**](https://git-scm.com/docs/git-fetch) to download the references to the new branch. The names of refs that are fetched, together with the object names they point at, are written to **.git/FETCH_HEAD**.
