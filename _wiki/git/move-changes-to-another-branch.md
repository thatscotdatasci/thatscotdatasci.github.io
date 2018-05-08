---
title: Move Changes to Another Branch
date: 2018-05-08
display-date: Y
categories: [ Git ]
tags: [ General ]
---

A common scenario: you've been working away on some code changes, but then realise that you have the wrong branch checked out! Or, perhaps the code changes have reached such a scope that they really deserve to be in their own branch. How do you move those changes to the correct branch?

**Note:** The reason I was looking for a solution is because Visual Studio can be a bit funny about allowing you to switch branches if there are outstanding changes; often instructing users to either commit or revert their changes before switching. If you experience this issue, I'd advise bypassing Visual Studio and executing git commands directly from the command line. Visual Studio will detect the changes (including if the checked out branch is changed), and may ask you to reload your solution.

## It should be easy...

Multiple questions have been raised on Stack Overflow relating to this (examples can be found [here][stack-overflow-one], [here][stack-overflow-two] and [here][stack-overflow-three])

In theory:

>_If you haven't already committed your changes, just use `git checkout` to move to the new branch and then commit them normally - changes to files are not tied to a particular branch until you commit them._

Therefore, if you want to move your changes to an alternative branch that already exists, all you need to do is run:

```bash
git checkout <existing-branch>
```

If you want to move your changes to a new branch, use the following command:

```bash
git checkout -b <new-branch>
```

As per the `git checkout` [documentation][git-checkout]:

>_Specifying -b causes a new branch to be created as if git-branch were called and then checked out._

## Alternatively...

The above was not the most popular answer given on [this][stack-overflow-one] particular Stack Overflow thread - a solution involving git stash has more than twice the number of upvotes.

From the `git stash` [documentation][git-stash], its purpose is:

>_Use `git stash` when you want to record the current state of the working directory and the index, but want to go back to a clean working directory. The command saves your local modifications away and reverts the working directory to match the `HEAD` commit._
>
>_The modifications stashed away by this command can be listed with `git stash list`, inspected with `git stash show`, and restored (potentially on top of a different commit) with `git stash apply`._

The steps suggested in the [Stack Overflow answer][stack-overflow-one] which used `git stash` are as follows:

```bash
git stash
git checkout <branch>
git stash pop
```

Note, the solution uses `git stash pop`, rather than `git stash apply`. The definition given in the [git documentation][git-stash] for each is:

>_**pop**: **Remove** a single stashed state from the stash list and apply it on top of the current working tree state. When no \<stash\> is given, stash@{0} is assumed, otherwise \<stash\> must be a reference of the form stash@{\<revision\>}_
>
>_**apply**: Like pop, but **do not remove the state from the stash list**. Unlike pop, \<stash\> may be any commit that looks like a commit created by stash push or stash create._

In the answer's comments you'll see that some argue this is unecessary given that the `git checkout` alone should suffice, however it appealed to others who viewed the approach offered greater neatness/control.

## What if I have committed my changes to another branch?
Another answer on the same [Stack Overvflow thread][stack-overflow-one], provides a solution for if you **have already committed your changes to a branch**.

The solution goes as follows:

1. Use `git log` to show the commit logs, and copy the SHA of the commit you want to move.
2. Use `git checkout <branch>` to checkout the branch you want to move the commit to.
3. Type `git cherry-pick <SHA>`, substituting the SHA from above.
4. Switch back to your original branch using `git checkout <branch>` again.
5. Use `git reset HEAD~1` to reset back before your wrong-branch commit.
6. The command `git push -f` will then force the reversion in your remote repository history, if you had already pushed the commit.

As per the [git documentation][git-cherry-pick] for `git cherry-pick`:

>_Given one or more existing commits, apply the change each one introduces, recording a new commit for each._

[git-checkout]: https://git-scm.com/docs/git-checkout
[git-stash]: https://git-scm.com/docs/git-stash
[git-cherry-pick]: https://git-scm.com/docs/git-cherry-pick
[stack-overflow-one]: https://stackoverflow.com/questions/7217894/moving-changed-files-to-another-branch-for-check-in
[stack-overflow-two]: https://stackoverflow.com/questions/1394797/move-existing-uncommitted-work-to-a-new-branch-in-git
[stack-overflow-three]: https://stackoverflow.com/questions/13687334/moving-uncommitted-changes-to-a-new-branch
