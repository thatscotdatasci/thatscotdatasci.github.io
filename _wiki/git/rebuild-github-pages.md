---
title: Rebuild GitHub Pages
date: 2020-01-02
display-date: Y
categories: [ Git ]
tags: [ General ]
---

I use [GitHub Pages](https://pages.github.com/) to host this website, which supports the [Jekyll](https://jekyllrb.com/) static site generator framework, that in turn supports writing pages in Markdown or HTML with the [Liquid](https://shopify.github.io/liquid/) template language. 

The following templated code in my footer HTML ensures that my copyright information always displays the latest year - meaning I shouldn't have to remember to do it manually each January.

{% highlight html %}
<span class="footer-notes">&copy; 2018-{{ site.time | date: '%Y' }} ThatScotDataSci</span>
{% endhighlight %}

However, even though we've just entered 2020 my footer still showed 2019 - so what gives? As the website is static, I need the build and deploy process to run so that my templated HTML file is re-rendered with the latest year.
However, GitHub does not expose the backend action (see [GitHub Actions](https://github.com/features/actions)), or triggering it manually/on a schedule.

At present, the only way to trigger the website CI/CD process is by committing to master (see the [docs](https://help.github.com/en/github/working-with-github-pages/about-github-pages#publishing-sources-for-github-pages-sites)).

## Push an empty commit to master

As ever, Stack Overflow comes to the rescue - see [this thread](https://stackoverflow.com/questions/24098792/how-to-force-github-pages-build).

The trick is to push an empty commit to master, using the `--allow-empty` argument on the `git commit` command:

{% highlight bash %}
git commit -m 'rebuild pages' --allow-empty
git push origin master
{% endhighlight %}

Alternatively, I could of course just be patient and wait until I actually have something to commit.

## Automating

This gets around the issue of being unable to manually trigger the website build and release, however it would still require me to remember to do this at the start of each year - at which point I may as well just update the year in the footer manually (which would also remove the need for the empty commit).

However, whilst the action to build and deploy GitHub Pages isn't exposed, you can add your own actions to the website repository - and these can be [scheduled](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/events-that-trigger-workflows#scheduled-events-schedule).

I created the following scheduled action to push an empty commit on the first of every month (file in repo [here](https://github.com/thatscotdatasci/thatscotdatasci.github.io/blob/fe6daf13868be38206b384d9d8bf02a3be46f8b4/.github/workflows/monthly_build.yaml)).
Note that a GitHub action for performing pushes does exist (see [github-push-action](https://github.com/ad-m/github-push-action)), however what I needed was very simple, and easily implemented manually.
Not only does this action mean that my footer will be updated at the start of January each year, but I'll also get an email if there are any issues with the build and deployment of my website - flagging any problems which I might run into when I next make updates.

{% highlight yaml %}
name: Monthly Build

on:
  schedule:
    - cron: '0 0 1 * *'

jobs:
  build:
    name: Create and push empty commit
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@master
    - name: Create an empty commit
      run: |
        git config --local user.email "action@github.com"
        git config --local user.name "GitHub Action"
        echo "Committing with comment: Automated Monthly Build"
        git commit -m "Monthly build - ${{ github.event.comment.created_at }}" --allow-empty
    - name: Push empty commit
      run: |
        echo "Pushing to: github.com/${{ github.repository }}.git"
        git push "https://${{ github.actor }}:${{ secrets.GITHUB_REPO_TOKEN }}@github.com/${{ github.repository }}.git" master
{% endhighlight %}

***However***, this unfortunately does not work with the current version of GitHub Actions as chaining workflows is prohibited (see [docs](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/events-that-trigger-workflows#about-workflow-events) and [thread](https://github.community/t5/GitHub-Actions/Triggering-a-new-workflow-from-another-workflow/td-p/31676)):

> An action in a workflow run can't trigger a new workflow run. For example, if an action pushes code using the repository's GITHUB_TOKEN, a new workflow will not run even when the repository contains a workflow configured to run when push events occur.

For now I've kept this action in place (it does no harm), and will wait to see when GitHub introduces functionality that would allow it to work. 