---
slug: self-organizing-misconception
title: Self-organizing teams misconception
summary: Reflecting on the common problem of leadership across multiple teams in scale-up organizations
categories: [Engineering]
tags:
  [
    Leadership,
    Teams,
    Organizations,
    Self Organizing,
    Amazon,
    Spotify,
    Google,
    Two Pizza Teams,
    Site Reliability Engineering,
  ]
date: 2022-10-09T00:00:00+00:00
authors:
  - davidsimao
---

Tech startups are good examples of productivity. With small teams on limited resources, every member usually exercises multiple competencies from engineering to product and leadership. While this is in most cases not an option, it creates a positive outcome of high accountability and alignment with the company's mission. The ones that succeed and need to scale will most likely at some point struggle to maintain this cohesion and control the chaos that naturally comes with more people onboard.

![Self Organizing Teams](./img/self-organizing-team.jpg "Image by Jason Goodman on Unsplash")

Scaling up is a painful and uncertain process, which is why, with no surprise, most organization models we see in scale-ups try to mimic the best practices and success stories from other companies that already walked the same runway. [Spotify squads](https://engineering.atspotify.com/2014/03/spotify-engineering-culture-part-1/) and [Amazon 2-Pizza teams](https://docs.aws.amazon.com/whitepapers/latest/introduction-devops-aws/two-pizza-teams.html?utm_source=madoke.org), two of the most popular role models, were discussed in every place I've worked at for the past 6-7 years, alongside with [Google SRE book](https://sre.google/workbook/how-sre-relates/) and [Airbnb engineering culture](https://medium.com/airbnb-engineering/engineering-culture-at-airbnb-345797c17cbe?utm_source=madoke.org). These 4 companies alone were likely to have influenced most engineering organizations around the world, which is probably one of the reasons we're solving similar problems everywhere.

In a very (very) simplistic way, all of these models advocate for autonomous, self-organized small teams, partly to avoid them getting into each other's way, but also because they are usually more [productive and accountable than larger groups](https://blog.doist.com/small-team-collaboration/?utm_source=madoke.org).

However, each company is different and the conditions to thrive too, which why in a lot of cases we see them falling short, not working as expected. Speaking of self-organizing teams only, what seems to be the most common problem, is that even though they might be structured into clear different domains, autonomy is not always possible either because the product requires deliverables by multiple teams (e.g. app team and api team) or it relies on cross team services (e.g. infrastructure or billing), that need changes to meet the requirements for a specific feature.

Big companies like Google and Amazon built their way to support hundreds of products with standalone teams on a state of maturity that is an generally an exception. Most companies will reach the scale up stage with only one product to support and an in-development technical stack that “will one day” allow teams to build their own products in a self-service fashioned way.

Even those that eventually get there, will at some point build products or features that require two or more teams to work together, and that's usually where [the model fails](https://studiorupt.com/the-self-organizing-leadership-paradox/?utm_source=madoke.org) because the sum of several <u>self-organizing teams isn't usually a self-organizing group of teams</u>. And if we think about it, the typical agile teams are built in a way that prioritizes their own process and roadmap over external interference. While this might not always be true, I believe that the hive mind expectation that self-organized teams will make the best decisions for the organization won't work here, because as humans in a group, we tend to wait for someone else to take the first steps and assume the lead. When combined with the teams' individual roadmap, the collective initiative is likely to get second priority. Quoting Amazon SVP Dave Limp: _“The best way to fail at inventing something is by making it somebody's part-time job."_

One thing that is not discussed as often as autonomous team organization models is [their failures](https://www.chameleon.io/blog/spotify-squads?utm_source=madoke.org) and what some companies have done [to fix them](https://www.inc.com/jeff-haden/when-jeff-bezoss-two-pizza-teams-fell-short-he-turned-to-brilliant-model-amazon-uses-today.html?utm_source=madoke.org), when they realized that their teams were pulling the rope on all sorts of different directions because there was a leadership gap across the board.

Getting multiple teams to work together and deliver these initiatives successfully comes with an impact on every team's roadmap, so without filling the gap it is unlikely that any of the teams will feel accountable for the whole project and take the lead. Some companies create temporary "project squads", others hire specific project management staff to lead these products but the important here is to make sure that there someone will be in charge of getting the project done, and that someone has the power and ability to drive all the required teams and accommodate the project deliverables in their agendas.

Standalone teams are still in my opinion a good way to scale tech organizations, and work perfectly for contained initiatives, but when it comes to dependencies, the model needs to be flexible enough to allow direction overrides without affecting the team's boundaries and self-organization on business as usual activities. Finding the right trade off between autonomy and collaboration is the key to succeed at a collective level and still be able to achieve good levels of productivity.
