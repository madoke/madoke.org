---
slug: creating-optimal-pull-requests
title: Creating optimal pull requests
description: What is the role of pull requests in the software development lifecycle, why is it important to create good pull requests, and a simple set of opinionated guidelines to make them easy to read, understand and merge
authors: David Simão
categories: [Software Engineering]
tags: [Software Engineering, Pull Requests, Git, Remote Teams]
date: 2022-08-13T00:00:00+00:00
---

Code reviews are an essential part of the software development lifecycle. Virtually the majority of tech companies, from giants to startups, advocate for code reviews in the pipeline, and it is generally accepted that they contribute to better code quality and more accountability over whatever it is released to production.

While in most open-source projects (thankfully), code reviews were standard practice long ago, it was GitHub popularized the term 'Pull Request' and created the tools that allowed mass adoption across the IT industry. While pull requests and code reviews are not the same thing, they always come together.

## Why is this important ?

As a developer you probably (should) review your peers' code as much as you write your own. That's the main idea behind the code review, to make sure that a given feature was created by at least two different engineers, and pull/merge requests are frequently the only point where these two or more engineers exchange feedback and knowledge about the feature being delivered. 

Although it doesn't always need to be like this, the pull request process is designed to be written and asynchronous, so it is important to make them clear and concise, easy to read, easy to understand.

Bad pull requests lead to misunderstandings, lack of context and ultimately bugs. This becomes even more evident on remote teams with weaker communication habits, or low timezone overlap.

## Optimizing your PR's readability

Science is quite not there yet with human cloning, and we're still all different from each other even if we think otherwise. A lot of dev teams today will include people from different countries, who speak different languages, come from different backgrounds, etc. Communication, interpretation, context and translation issues will happen at some point, so my advice is to always keep that in mind and start preparing to it, from the moment you start writing code.

### Tidy up your commit history

If you're adding/modifying different parts of the code, it is useful to do it step by step, and it will help the reviewer understand the timeline of events, and review the commits individually. Additionally, good commit messages will make the history self-descriptive, and the reviewer will know what to look for. 

Let's suppose we have a user microservice, and our task is to include the user's last name in the get user details endpoint. Here's what I think it would be a good commit history:

```bash
* 54bfc23ab Add lastName to UserEntity and update UserRepository to fetch from db
* 43ba765a5 Add lastName to UserDTO and update UserController fetch from UserRepository
```

The idea is to create small commits where a small portion of the code is changed, as well as the tests it affects. The commit message itself gives a hint of what files were changed. After reviewing that commit, the context is closed and the reviewer jumps to the next step.

To make this point clear, here are some patterns that you probably have come across, which I think aren't review friendly (The names are made up):

#### The do then test
```bash
* 54bfc23ab Add lastName to user
* 43ba765a5 Fix tests
* 32aa54db7 Fix tests
```

I'm not advocating for TDD here, that's a touchy subject, but I just think that on a step-by-step approach it makes sense to change all the files related to a specific context and the tests are usually part of it. If the changes made to `UserRepository` test are in the last commit, it will force the reviewer to context switch again to a step that was already reviewed

#### The Sniper
```bash
* 54bfc23ab Add lastName to user
```

One shot commit histories are also not spectacular to review because they contain too much information, as opposed to a divide and conquer approach where we would review small changes step by step. It's also difficult to know where to start, since all the files were changed in the same commit

#### The #YOLO
```bash
* 54bfc23ab First draft
* 43ba765a5 Fix
* 32aa54db7 Fix
```

This is the typical case where someone didn't test the code locally and only realized they've made a mistake when the pipeline failed or there is a bug in the sandbox environment. While this obviously can happen even if you took all precautions, you should avoid polluting the commit history while trying to fix mistakes. If there is no other way, maybe it can be a good idea to [use rebase and squash commits](https://medium.com/@slamflipstrom/a-beginners-guide-to-squashing-commits-with-git-rebase-8185cf6e62ec) before creating the PR.

If you're able to guide the reviewer with your commit history, half of the work is done because she will be able to keep up with your line of thought. Descriptive messages are  key to this, but organizing commits into logical steps can also be very helpful.

### Fix conflicts ahead of submitting the PR

Merge conflicts are a frequent issue, especially in projects with lots of developers and small code bases. While it might not impact the review itself, it is a good practice to keep your code up to date with the main branch, so that the merge complete smoothly. Depending on your team's process, you might find yourself in a situation where you need to fix the merge conflicts and ask the reviewer to go back and approve the PR again because you couldn't merge it in the first place.

### Use Rebase instead of merge

A very common pattern to fix conflicts and keep a branch updated is to merge the main branch into the feature branch ahead of the review or at some point in time. While this is a very common practice, there is a downside which is the commits it creates (`54bfc23ab Merge master into feature/some-feature`, sounds familiar ?). Rebase on the other side does a slightly different thing which is to apply all the commits from the main branch to the feature branch, without polluting the history with merge commits (one less thing for the reviewer to care). The downside to this approach is that it will force you to use `push --force-with-lease` if your feature branch is already published on the origin and you just did a rebase.

### Don't commit code formatting changes

It can be very annoying to find code formatting changes while reviewing a PR. If it's in the same file, it will make it harder to find the actual method/function to review, and if it's in a bunch of other files, it will make it a nightmare to actually find the changes. There are a bunch of tools like [Prettier](https://prettier.io/) and [EditorConfig](https://editorconfig.org/) that can help to avoid this, but in the end what is important is that everyone in the team uses the same standards and formatting. 

**Side note**: Don't fall into the trap of actually discussing those standards as you and your team will most certainly burn precious amounts of time not reaching an agreement. Most languages have a couple of community accepted ones, usually built by Google, Facebook or Airbnb.

### Comment and document your code

### Include every relevant detail in the PR's description

There are a bunch of guides online on creating the perfect pull request message, and to be honest most of the depends on how your organization works or in the agreement you have with your team. There are however a couple of items that will make sense in most projects:

#### Context

Why are you implementing this feature ? Sometimes this can be an issue tracker ticket, a link to the documentation, wiki, whatever. Although the issue and the requirements are most likely documented somewhere else, I prioritize reading a small paragraph over clicking a JIRA link.




## Recap
- Almost every team does code reviews today, it is part of standard practice
- Pull requests are often the only point where two engineers exchange knowledge about a feature
- Easier to read and understand = Faster to merge and deliver
