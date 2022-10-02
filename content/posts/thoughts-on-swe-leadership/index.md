---
slug: thoughts-on-swe-leadership
title: Thoughts on software engineering leadership
description: An overview of some personal experiences on the engineering leadership track and opinionated advice that derived from them
authors: David Simão
categories: [Software Engineering, Technical Leadership]
tags: [Software Engineering, Leadership, Management, Architecture, Company Culture]
date: 2021-03-15T00:00:00+00:00
showSummary: true
---

Roughly 3 years have passed since I became a lead software engineer (or tech lead) and it's been an exciting run with many achievements and pitfalls. In this article, I try to synthesise the most important lessons I've learned so far on my journey, hoping that they can be useful to other leads who are trying to develop their craft. Having headed a couple of teams until now, I still have a lot to learn, but I certainly do approach things in a different way than I did some years ago, and the results present themselves in the most unexpected ways. There’s no secret formula for leadership, It's a learning process pretty much like working with a new language or framework. I started off by reading some blogs and books, but the greatest lessons actually came from trial and error, and constructive feedback from others.

> “A leader is best when people barely know he exists, when his work is done, his aim fulfilled, they will say: we did it ourselves.” - Lao Tzu


## Accepting that we're human

Coming from a computer engineering background, it took me a while to understand that leading people is different from writing software programs. As human beings we are unpredictable and each of us is likely to react differently to the same stimulus. Modern product teams often include people from different cultures and countries, and they're not exclusively made of software engineers anymore: UX, design and product are essential skills that the team needs in order to be complete. Teams are more diverse, each of us has different expectations, and for the tech lead, the challenge is to establish a common culture and mindset that allows everyone to be coherent and aligned. Conflict is part of human nature but on the other side, history proves that given the proper conditions and motivation, we can adapt to pretty much everything. I struggled to improve my social skills, and I still do, but it was probably the best investment that I did on my career up until now. Being able to connect and communicate with my teams, both individually and collectively carried me a long way through the journey.

## Building respect and credibility

![Respect](./img/respect-lego.jpg "'Respect' by Stillness InMotion on Unsplash")

Nobody gives a sh*t about your CV. Literally. And to why should they ? Haven't you been defensive or skeptic about a new manager or teammate before ? It's the human factor coming into play. Experience is important, but it’s not going to make you an authority by itself. Referring to your past achievements will add very low, if not negative value to the team dynamics because it’s something you did outside the group. It’s the way you relate to your current team and the experience you gain by building stuff together that counts, so even if you're arriving from google or nasa, you should always be humble with your problems and tackle them with proper collective analysis and conclusions. Every start is a brand new one, so don't ignore the importance of building trust within a group that doesn't know you. This has been my approach on every team that I've joined so far, both as tech lead and developer, and it is one of the hardest things to get because it will take time, experience, and a significant deal of humility.
This should be one of your main goals as a lead engineer, and in my opinion, one that will make the difference. Teams with respected leaders are always the the most motivated and consequently the most productive.


## Making decisions

This is something that will come across very often, and it's probably what other people think that is your job. It might seem a no brainer, as assessment requests start to land in your hands.

![It's a Trap](./img/itsatrap.gif "'It's a Trap' by @starwars on Giphy")

Don't forget that those decisions will result in tasks to be executed by the team. When asked to plan/design a new feature, I usually find myself tangled with some challenges:

* People not feeling included in technical decisions: Software architecture is not just black and white and the more you learn, the more opinions you have. Again, because we are all humans, there will be different opinions. I struggled a lot with this throughout my career as a tech lead, but I had also been on the other side, so most of the times I offload the ownership of the decision from myself to the group. This becomes impractical to execute on every single decision, given that you will have other people around like product and engineering managers poking you with dates, but it is something that you should always do whenever possible. Spikes in the SCRUM framework are exactly for this, and the team members will not only feel included when doing them, but also improve technically and understand your side of things. If you get everybody to agree and understand what needs to be done, sprints are more likely to be successful.

* Technical decisions being challenged: This probably goes back to the previous point, but understandably, not everything can be decided as a group, for the sake of simplicity. Whether you make those decisions yourself or delegate to other team members, they should be properly justified and documented. Doing so will not only help out others understand why those decisions were made, but also not challenging them in future situations. It will give you credibility and make your team feel that they are learning new things.

* Your teammates and peers cannot make a decision together: This is where you'll need to be practical, because at the end of the day, the ownership will be yours, so if you feel that the conversation is not headed towards a healthy situation you probably need to do something. What to do totally depends on the situation itself, but it usually is to reduce scope, clarify requirements, reduce the number of people in the conversation or bringing a more senior teammate into the discussion to untie the situation.

* You're not entirely sure of what to do: There is nothing wrong with this. Tech leads don't need to be experts on every single matter, so make sure that you always bring people with the required skillset to the discussion. If there are too many unknowns, probably the situation justifies creating a spike for research and  getting input from other teams or more senior engineers.

* You or your team made a wrong decision: It will happen, and when it does, because the ownership is yours, you'll need to deal with it, so be prepared to rollback and get back to the drawing board with your team. It is a good practice to always draft a quick rollback plan for most decisions, because well, you might need it.

* Your decision impacts other teams: As the tech lead, you'll probably be the one with the highest understanding on how the company and the technology is structured. Product teams often depend on other teams (services, sdks, apis etc..) to deliver their own product, so this might be a common scenario. Ideally you should try to avoid dependencies as much as possible, but if that isn't possible then you should reach out to your peers and make sure the roadmaps are aligned and there is an SLA between both teams.

In the end, It all boils down to finding the right balance between group and individual decisions. Making decisions as a team is vital, and will give everyone a sense of ownership and motivation that they will not have if you design everything alone. However, group decisions are more expensive, so it is impossible to decide everything together. I didn't yet succeed in finding the perfect setup for decision making in a team, and currently the approach I find correct is to make team decisions as much as possible using the sprint spikes, and delegate individual decisions to appointed team members depending on the project. Using this approach, the role of the leader is just to assist others in the decision making process, and making sure that every decision is presented to the team and documented


## Mentoring by delegation

![Mentoring](./img/mentoring.jpg "'Mentoring' by Nadir sYzYgY on Unsplash")

Following the line of thought in the previous conclusion, this is probably the second most important goal that you should chase as a tech lead. It didn't strike me at first, and as a consequence, on early days, my teams were heavily dependent on me because I simply filled in the gaps for everyone. If the team is presenting results and meeting deadlines you probably won't notice immediately, but the signs are there, productivity drops when you're off or unavailable, complex tasks start to pile up, and the team is not able to scale nor respond to pressure.
It can be very tempting to step in and help out the team to give that final push and deliver the project, but when this starts to be the norm, then you're already in trouble. The team needs to be able to work without you, and the main focus of your work should not be to deliver an assessment for everything or building the perfect architecture, but giving your team the tools to be able to do it without you. From the moment you start your role as a tech lead, you should try to make yourself obsolete. And you do that by mentoring, organising, documenting, delegating.
Building an autonomous team is a hard process, and it will take you a lot of time, repetition and perseverance. My current approach is to do small improvements to the team's autonomy on every task that comes to me by asking the same question every time: How would the team do this if I was not here ? And the answer pretty much depends on the situation. It might be writing a tutorial/documentation, it might be pair programming with someone, it might be reviewing someone's code and pointing out the details, or ultimately it might be delegating smaller bits of leadership to other team members (by project for example) while overseeing everything from above. In order for you to be successful, the engineering manager should share this mindset with you and help you out on a daily basis, so make sure that you always keep him onboard.


## Leaving no man behind

From the moment we understood that we needed to hunt in groups in order to survive, we developed a tribal culture that is present pretty much everywhere in today's society like for example in football, religion, music genres, countries or, not surprisingly, engineering teams.
When taken with moderation, a bit of rivalry and competition between teams is good for the organisation, but what's really important is that your team members feel a part of the team, and are willing to do the best job possible to represent it. This goes back to the motivation subject, but my point here is that you should make everyone feel represented and comfortable enough to make mistakes. It's not a question of if, but rather a question of when will your team make a mistake (we're humans, remember ?) which will have consequences for the outside environment, which can potentially be a customer or other team.
These are the moments where good organisations will demand an explanation of what happened, why it happened and how will your team fix it. This kind of scrutiny is crucial for improving the company, and the team, but if not done properly it can be damaging to the team members and consequently to the team. In my opinion, the tech lead or a senior team member should be able to take responsibility in these situations and take actions towards avoiding the same error in the future:

* The error was caused by something inside the team domain: This is the moment then to gather everyone round, and as a team understanding what went wrong, what should have been done to avoid, and develop a mitigation plan. It is also the place to make it very clear that the responsibility belongs to the whole team, not so a single member, or anyone outside the team.

* The error was caused by something outside the team domain: Another common situation in micro-service architectures. In this kind of situations, it is very important that you, or a senior team member reach out to the other team responsible for this service, and do the root cause analysis, develop an action plan that can potentially involve both teams.

By taking accountability as a group and making other teams accountable (when it's the case) you will make your team mates feel represented and hopefully engaged and proud to be a part of the team. Consequently, as said before this is what makes the team strong and productive.


## Getting Feedback

Be honest with yourself, be humble with others. The more you read, and the more you fail, the better you will be in your role, but nothing replaces direct feedback from those who work with you. The engineering manager can give you very useful feedback as someone who is also on a leadership role, he is also the one who works closest to you and can capture feedback from the 1:1 meetings with the remaining team. However, I also actively try to get feedback from other sources. First with my teammates, but also with other tech leads, staff or principal engineers, product managers or even the CTO.

Feedback is important and it should be the starting point when trying to perform better. The more serious and methodical you are about it, the more useful it will be to you. There is always something to improve, if you don't feel that way, you're probably wrong.


