---
slug: surviving-at-the-bottom-of-the-iceberg
title: Surviving at the bottom of the iceberg
summary: A classic tale of a team that deluded themselves with the mirage of breaking a monolith into shiny new microservices on a limited budget, understaffed and fast-paced environment
categories: [Engineering]
tags:
  [
    Technical Debt,
    Scalability,
    New Features,
    Micro Services,
    Refactor,
    Maintenance,
    Monolith,
    Legacy,
  ]
date: 2021-08-06T00:00:00+00:00
authors:
  - davidsimao
---

Maintenance and evolution of legacy systems is a popular challenge in software engineering. Every time we produce a line of code, and it reaches production, we’re already creating legacy for our future selves or somebody else to look after. If not properly maintained, most systems won’t age well, and therefore most of us will eventually at some point in our careers face a rusty old behemoth that’s important to the business and simply cannot be shut down. Circumstances are different in every company, but there are some common milestones and pitfalls during the recovery or replacement of an old system. In this article we'll go through some situations and try to understand the reasons that motivate them, as well as their potential solutions.

## The business cannot stop

Generally, most people in a company will be unaware of the systems stability and scalability assuming the products are working normally until actual issues are visible. Apart from small businesses, engineers and other participants in the business tend to be organized in different reporting structures with different agendas, so if there isn't a good communication and alignment strategy in place, this kind of issues escalates with the company's size.

As soon as the product is out, the company will naturally try to acquire customers and make money to pay whatever investment was made to build the product. At this point, the engineering team should already be prepared with a maintenance and evolution strategy that allows them to allocate time to refactor the infrastructure at the same time (not speed) that they're building new features. Following this strategy, the team minimizes the chances of losing control over the system.

Losing control, however is also frequent and can happen for different reasons like for example the absence of a long term strategy, limited team resources or lack of communication between areas of the business. If this goes for long enough, it's easy to imagine unhappy customers demanding stability (or their money back), unhappy management demanding solutions, and an unhappy engineering team that wants to delete the project and start over. Stopping that bleeding will only be possible if there's a coordinated response from all the participants. Not only is this possible, but it's also a good opportunity to reflect on how the product is delivered and operated, as well as the underlying organization of the people doing it.

## I lost control, what now?

What to do entirely depends on the circumstances of the product and the company. In some rare cases, the engineering team receives the "Get out of jail free card", which allows them to start over from scratch (every developer's dream), while on other cases there's the mythical "stop everything until this is fixed", but the most common scenario is the realistic one: There are live customers, there are new customers in the pipeline, and we need to fix all of this at the same time.

While it's possible to reach a safe harbor without radical moves, it will take a coordinated effort, so the first thing an engineer should do in such situations is to immediately assess the damage and raise awareness for it, so that the business as a whole is able to make a plan, and weigh each new decision in the light of these new conditions.

## Nobody knows what's in there

Engineers are always moving between companies, leaving a trail of software behind which makes working on something that already exists far more common than building something new. If you inherited a giant whale of code, developed by a team of unknown heroes who left nothing but a couple of empty documentation pages and good luck wishes behind, it’s time to get acquainted with it.

It's not a simple process and certainly not fun, but you need to do it before you can actually have a plan. Otherwise, you will be changing your plan every time a new variable comes up.
Gather everyone that was involved with the project, do workshops, ask questions and start building the documentation that never existed. Some points that might guide you in this quest:

- What does your app do?
- What is it used for?
- Who are your customers?
- What features do they use, and what don't?
- What are the core/critical features?
- How can you operate (deploy, test, troubleshoot) it?
- What is the domain/architecture, and how coupled is it?

With greater knowledge about the platform/application you will be better equipped to decide how to act over the system and build a technical/strategical plan that’s more realistic and useful to the business.

## No space left for maintenance

The ‘legacy’ label is just around the corner for any system and can be applied shortly after a new product release. The company has already moved on to the next big project before you even notice, and nobody outside the team will think about maintenance. This is the point where we tend to make mistakes and also forget about maintenance, because the next big thing is now the top priority. You can (and should) build the most resilient and scalable software, but if there isn't a maintenance process in place, chances are that after a while you or someone else will be forcefully remembered of this software's existence because something started to fail. The problem now is that its framework and runtimes are outdated, or your CI/CD has changed, and you can no longer operate it like the other services because there’s a big technical debt to clear.
For most systems, this is inevitable and most certainly will happen because a company’s workforce is limited. However, it is definitely possible to mitigate the impacts in the components that we believe that are core to the business and will be around for a while.

There are two important things to understand here:

- Maintenance is not a feature, so if you really need your system to be reliable and scalable, there is a permanent stream of work that should be kept going in parallel with everything else. The less effort you put into it, the bigger the debt to pay further ahead;
- The responsibility belongs to the whole company, rather than the engineering team alone. I’ve tried to handle maintenance and scalability in the past by “self organizing” the team or overestimating other projects, and it didn’t last long because the business would eventually reclaim the time we spent clearing tech debt with more aggressive dates or workload. It really needs to be part of the team’s public roadmap, so that everyone understands what’s going on.

As a software engineer, leader or not, it is your responsibility to make it very clear to everyone why maintenance is needed and how much will it cost, as well as what are the consequences of not doing it. Because this goes against all that “fail fast” and “time to market” startup jargon, people outside engineering will be more reluctant to accept trading speed for stability if you don't give them a clear reason to do it. A good strategy that’s helped me so far is to produce a document with the overall technical strategy and discuss the risks and benefits with everyone that can have an impact on the team's agenda, including the team itself. Keep in mind that you shouldn't do a typical sales pitch that people forget after 5 minutes. You want all the relevant stakeholders to participate and contribute as much as possible, so that this document is not only part of their work, but also a commitment to support you in later stages of the roadmap. Also make sure that it's available to everyone, so that new joiners or people that didn't participate can quickly catch up with what was decided. If the need is clear and everyone (that matters) buys in, then you can officially allocate capacity for maintenance and scalability on every system owned by your teams.

## Nobody wants to touch it

As developers, we always prefer to start from scratch, rather than picking up somebody else’s code, even if it’s brilliantly designed. Improving or refactoring an application built ages ago, in a language or technology that’s not sexy anymore is something that won’t naturally motivate young teams, especially if they need to clean up messy code and processes. The following approach can help you maximize the team's experience:

- Always have a visible plan and keep reminding everyone about the end game. Pretty much like the technical roadmap is needed to justify your team’s allocation, you need to establish a mission and a contract with your team, so that those boring and unappealing tasks can be seen as a necessary evil to a greater good.
- Include senior developers in the project. More experienced people will be able to understand your vision more quickly and help you out spreading it. We’re all social creatures, and tend to follow good examples.
- Look out for refactoring opportunities that may come up during feature requests or bug fixes. It's hard to refactor everything in one go, but if you are able to split your monolith in small domains, there may be an opportunity to build a new service for feature A and migrate some existing functionality too.

The reasons for a legacy system to become uninteresting are typically related to bad technology choices, bad code or, as previously mentioned, lack of maintenance. The more of those factors you have in the mix, the harder it is for people to like it, so the idea here is to try and remove the most friction you can (making the system easy to operate), and create an environment where your engineers are able to understand the end game and the opportunities to develop themselves.

## Can I refactor this?

If you think your software is up-to-date, just wait a couple of months. It’s fairly easy to build stable and long-lasting software that can remain untouched and reliable for years in production. However, it's a different story to keep it updated, and it usually cannot be done without proper maintenance.
As you read this article, there are probably people working on improving the JVM internals, a new release of the golang compiler, bugfixes in kubernetes, 15 new JavaScript frameworks, and the list goes on. The tech ecosystem evolves at a much faster pace because there are thousands of people working on it, whereas your app, only depends on you or your team.
Having that said, outdated tech stacks are the most common scenario for legacy software and this is a problem for your team because it will keep on increasing the technical debt and the maintenance overhead. When paired with bad code practices, the mixture is explosive. So what to do? Refactor or reimplement the whole thing in `<NEW_TRENDY_TECH>` right? It's tempting to do a File > New Project straight away (I've done it hundreds of times), however things can get quickly out of hand because there is a very high cost associated with redoing something for scratch (Just think about everything that's not the actual code: tests, logs, monitoring, CI/CD, etc.). If the system is critical, and you can't operate it, you probably want to invest some time in fixing it first, or at least making it easier to use/get acquainted. There are some popular actions that usually apply to most cases:

- Integrating the existing CI/CD pipeline system for automated builds, testing and deploys. It will speed up the development cycles and reduce confusion if every project shares the same CI/CD infrastructure;
- Using the same runtime and infrastructure as your modern services (E.g: Kubernetes). Like the point above, it's easier if there is only one kind of infrastructure to operate;
- Upgrading frameworks and runtimes to the latest LTS version. For keeping the system out of potential security threats, and eventually enable some features that you might need for refactoring later;
- Write documentation for every maintenance process that needs to take place more than once, even if it's just once a year. This will give everybody a way to find out how to operate the system;

If you can clear some of these, the legacy is at least as hard to operate as any other service. It will lower the maintenance overhead and create better conditions for refactoring and reimplementing should the opportunity present itself.

## Final remarks

When starting at a new company, role or project, usually we think about painting on a blank canvas because it's associated with starting fresh. While this can be true in many cases, it is more frequent to pick up on already existing systems. If not properly maintained, a software system can get out of control pretty quickly, which will generate an increasing technical debt and eventually customer failures. Whether dealing with any kind of system, legacy or not, as engineers, we should always raise awareness towards the importance of staying at safe technical debt levels, and getting space for maintenance in the team's calendar.

Systems in bad shape can be a big technical challenge, but also an ungrateful one. In order to properly be able to evolve a legacy system the whole team needs to be on board, and that's usually a hard thing to get because maintaining legacy is not something that everybody would be happy to do. In situations like this, it's tempting to imagine a new system, starting fresh and sell that idea to the team, but it can also be a dangerous path, if not impossible, especially if we're talking about an already productive system with live customers. Before making any kind of decision it is very important to due diligence the whole system and domain, so that nothing is left out of the maintenance and re-qualification plan.

Whatever is the strategy for evolving the technical platform, it should be discussed and accessible to everyone, so that there is a clear goal and people don't start pushing in opposite directions. It will also give a purpose to the team and help with motivation.

Depending on what is the current state of the product, the team might have periods with more space for refactoring and rebuilding components, but there may also the need to prioritize critical bugs that are affecting customers, costing money and need to be fixed before they are reimplemented. Whatever is the case, it is very important that the team is able to operate the platform (deploy, test, troubleshoot), and that will probably require some effort to get in place. However, it's probably the first thing that should be done because it's about creating conditions for every team member to work, and reducing friction from the overall process. With knowledge about the full domain, and the coupling between its components, some feature requests or bug fixes might be a good opportunity to refactor/reimplement some parts of the system.

All in all, dealing with legacy monoliths can be hard, and it will require more than just technical efforts to get right. The standard "delete and start over" approach is an illusion in most cases, because you can't stop a business that's already operating so, in addition to juggling the team and the company's interest on maintaining and modernize legacy, the customers need to have a smooth experience while the transformation happens in the backend. With all these variables at play, I'd say that participating in such a kind of operation is far more challenging and rewarding than building a new system from scratch.
