---
slug: docusaurus-gatsby-hugo
title: Docusaurus vs Gatsby vs Hugo
description: Comparing Docusaurus, Gatsby and Hugo, and why I chose to use Hugo for implementing this blog
author: David Simão
categories: [Software Engineering, Website Frameworks]
tags: [Development, Docusaurus, Hugo, Gatsby, Blog, Markdown, Static Website]
date: 2022-07-01T00:00:00+00:00
---

I recently changed this website's appearance and moved from using [Docusaurus](https://docusaurus.io/) to [Hugo](https://gohugo.io/) underlying framework on top of which it's built. Initially, the objective was to simply share articles and create a writing habit, not really caring about the appearance or any other elements, but with time more use cases started to appear, and it turns out that right now, Hugo fits those use cases best. In this article, we'll go through a series of vectors, and compare both frameworks, together with [Gatsby](https://www.gatsbyjs.com/), which was also considered and tested during this process.

## Requirements

The main focus is still content publishing, so the most important aspect is that writing and adding articles to the website needs to be simple and frictionless. Being somewhat of a software developer and architect I prefer to use a tool/language that I'm already comfortable with, and that is **markdown**.

Not being that proficient with frontend development, the ideal tool will include **opinionated/prebuilt styles** in the form of themes or something similar, which would allow creating a page with decent modern aspect, compatible with phones without putting to many effort in. On the other side, as more use cases kept coming in (like adding the CV or personal projects), at least some level of **customization** is desirable.

Last but not least, since the idea is to keep the whole setup as simple as possible, there won't be APIs or backend for now, so the whole thing needs to be **static** pages.

## The Frameworks

### Docusaurus

It was the initial just because I was using it to build API documentation at work and knew my way around it, so it seemed an obvious choice at that time since it nearly matches all the requirements presented above. Docusaurus is a JavaScript/Typescript static website framework, built by the facebook team. While there isn't a specific target use case on their website, It excels at wiki style documentation, but also supports blogs, and custom pages using React or Markdown. Not surprisingly, the majority of use cases in their showcases are open source projects, apis, sdks, and all sorts of technical products. runs in node

### Gatsby

The best way to create static websites with React, according to their [documentation](https://reactjs.org/docs/create-a-new-react-app.html#gatsby) themselves. Gatsby is around since 2015 and includes an enormous set of features. It's oriented to content driven applications (like blogs), and it includes integrations with major CMS vendors like Contentful and Wordpress. It also supports Markdown and React, but it doesn't include any major prebuilt styles or themes, so it is the developer's responsibility to put together a decent looking UI/UX. runs in node

### Hugo

The oldest of the three, Hugo is general purpose like Gatsby, but includes a significantly large catalogue of community developed themes, which allow the developer to build portfolio pages, blogs, wikis, even stores through configuration and customization of those themes. It supports Markdown and HTML (not React) and it is built in Golang while the previous two use JavaScript/TypeScript. runs in golang

## Community and Maintenance

Good support and active maintenance are always desirable when picking up a web framework, especially if we intend to continuously evolve and maintain our own project. In this case, it is not a problem since all three projects are still active, and have fairly sized communities, despite some differences in the support model:

- Docusaurus is part of the [Meta Open Source Community](https://opensource.fb.com/) (former Facebook Open Source) and has over [30k stars and 900 contributors on github](https://github.com/facebook/docusaurus). Having one of the world's tech giants behind it was enough to build a large community. It also hints at being somewhat coupled to the React framework at its core. Despite being a big opensource projects, there aren't many community contributed plugins, themes or add-ons yet;

- Gatsby is fully open source, but has a commercial purpose and a company, [Gatsby Inc](https://www.gatsbyjs.com/about/), behind it which supports the development, and monetizes a suite of related cloud products and premium support for building websites with gatsby. Their github project seems to be even more popular with over [50k stars and 3k contributors](https://github.com/gatsbyjs/gatsby). There's also a lot of [plugins and themes listed on their docs](https://www.gatsbyjs.com/plugins), most of them officially supported either by gatsby inc or third parties;

- Hugo is a bit of an underdog in comparison to the others, but it's probably the closest to being a true open-source project. It's sponsored by a couple of well known companies but there aren't obvious commercial motives behind it. There's [almost 60k stars and over 700 contributors](https://github.com/gohugoio/hugo), and there are a bunch of [community built themes](https://themes.gohugo.io/), and a lot of commercial ones. It's like the Wordpress of modern days;

## Documentation

There's two types of documentation that I typically look for: on-boarding and customization/advanced features. On-boarding is usually the first thing we look at when getting started with a new framework, stuff like getting started, how to use the product and what features are available. All three frameworks have great on-boarding documentation, and it takes roughly 10 minutes to get started with each of them.

When it comes to customization, things are a little different with Docusaurus' docs, which only teach you how to change styles, replacing components and developing custom pages. Higher levels of customization are possible but usually come at the cost of navigating through the code in order to find out how it can be done. Gatsby is by far the most complete, and this is probably because it's the only one that's classified as a web development framework, so necessarily their documents are filled with development and customization guides, as well as api references, so that their target audience, developers, experience the less friction possible using their product. Hugo's docs are pretty much comprehensive in what comes to customization, offering all api references, components rendering strategy and even some customization guides. These are also built by the community like Docusaurus, but are a bit more mature. 

## Customization

Still on the subject of customization, all three of them offer high levels of customization, which slightly differ from each other in terms of approach and difficulty:

### Docusaurus

#### Custom Pages

Docusaurus understands any `js/ts`, `jsx/tsx` or `md/mdx` file. All of them (apart from `md`) support react components natively, and it is possible to do pretty much anything since you're building the page yourself. There is a [limited set of data](https://docusaurus.io/docs/docusaurus-core#hooks) available in the custom page's context, enabling stuff like reading the configuration, documents or blogposts.

#### Styling

The [Infima](https://infima.dev/) framework is being shipped with Docusaurus, and pretty much all available components already have proper styles defined, which will be coherent with the design of the remaining pages. If you choose to not use Infima's building blocks, then CSS for these components is required, which adds a bit more work to the process. It is also possible to override global styles by providing additional stylesheets.

#### Built-in Templates

The built-in templates ([Plugins](plugins)) like the docs wiki and the blog are a little harder to customize, because there's just no documentation on how to do it. Each of the plugins is extensively configurable, and the React components they use can be overridden using a technique called [Swizzling](https://docusaurus.io/docs/swizzling). The plugins themselves can also be overridden, but they provide very limited guidance on how to do so.

### Gatsby

#### Custom Pages

Pretty much everything is custom in Gatsby, since it's closer to general purpose web development than to blogging. Pages can be developed in React using `js/ts`, `jsx/tsx` files and markdown, with the [mdx plugin](https://www.gatsbyjs.com/plugins/gatsby-plugin-mdx/) which enables support for `md/mdx` files. The officially supported method of loading data relies on a globally available graphql interface that enables executing to complex queries over content and configurations.

#### Styling

The basic starter doesn't provide you with built-in styling, so it's a bit greenfield in here, pretty much like normal web development. It supports adding everything that can be installed with React, and they provide [official support for a bunch of frameworks](https://www.gatsbyjs.com/docs/how-to/styling/) like Theme UI, Styled Components, SASS, etc. Through the plugin mechanism, there's also support for some prebuilt/opinionated themes like [gatsby-theme-ui-preset](https://www.gatsbyjs.com/plugins/gatsby-theme-ui-preset), but it doesn't seem that there are many alternatives or support in there.

#### Built-in Templates

Once again, through the use of plugins it's also possible to not start from scratch, and in the case of blogging there's a [very simple starter](https://github.com/gatsbyjs/gatsby-starter-blog-theme), which is officially supported and can be used to start a very simple blog. It generates a new gatsby project (or adds into an existing one) with the required files to create a ready to use blog with built-in styles and navigation.

### Hugo

#### Custom Pages

The concept of custom pages in hugo is a bit different, since every page needs to be an `md` file, making markdown (`mdx` is not supported, but we can use HTML inside `md` files) the only option to create content. However, pages are rendered using [Go Templates](https://gohugo.io/templates/introduction/), which basically allow writing the actual HTML (no React support) where the markdown is printed. For each new page we can specify the template, so it is actually pretty simple to add new templates for whatever purpose we need.

#### Styling

Styling highly depends on the theme that's being used and the support it has. Because themes may contain both CSS and HTML templates, what can be done, really depends on those files. However, Hugo provides an asset bundling mechanism, which will fetch any custom CSS or SASS that was added to the project, and add it to the final assets bundle.

#### Built-in Templates

Hugo provides a couple of templates for simple, blank pages, articles and article listings, which were sufficient for the purpose of this blog. These templates are made up of a bunch of HTML/Go Template files and all of them can be overridden by mimicking the same folder structure in the current project. Themes can also contain additional templates, so basically we can [install themes](https://themes.gohugo.io/) for other purposes like, wikis, documentation pages, portfolios, stores etc..


## Performance

This is a very simple comparison of build and page load times across the three frameworks. All tests were performed on the same machine (my laptop), and the numbers are relative to its hardware specs. Below is a comparison of build times for generating production and development builds, as well as hot reloading in development mode.

![Build Performance](./img/build-performance.png "Build times comparison for production, development and hot reload")

Notice that I needed to change the Y axis to logarithmic scale such is the difference between Hugo and the rest. This is likely to be related with the fact of running natively (golang) rather than in the nodejs runtime, but mostly because Hugo does much less than the other two at build time, since it doesn't need to perform all the heavy lifting required to build a React application.

The generated builds are very close to each other in terms of performance, in this case I just measured the time to load the blog listing page on all three frameworks, and the results are similar, so the Y axis has a linear scale in here.

![Runtime Performance](./img/runtime-performance.png)

Because Hugo's generated pages are tightly couple with the theme, this values might have been different if I were using a different theme. Nevertheless, it's possible to conclude that in terms of performance, the end result is more or less the same, but with Hugo, development cycles and iterations are necessarily slower. Not that this had much impact in the final decision but is still worth mentioning.

## Final Remarks

I started looking for alternatives to Docusaurus, ultimately because I wanted to move away from their theme, and also to customize a little more the main page layout (i.e. add a list of recent posts). While all of this is possible in Docusaurus, it's not straightforward, and definitely not well covered in the docs. I'd probably still use it for building API, SDK or open source project documentation because it is exactly what it was built for, and these are use cases where typically we're good with standard styles and layout.

Gatsby excels where Docusaurus fails, allowing all the customization I needed and much more. It's a very complete web development framework, but on the other hand, it requires much more development effort to get something out of it (it fails were Docusaurus excels). I'd probably go with gatsby if I wanted to build a static website with its own design, and specific functionality, from the ground up, without built-in styles and components.

Ultimately I ended up sticking to Hugo because it was the framework that offered less friction to set up the blog/webpage that I had in mind. It's obviously less flexible than gatsby, but the component override system is really simple and well documented. Did I already mention that development cycles are blazing fast ? I'm using the [PaperMod](https://adityatelange.github.io/hugo-PaperMod/) theme, one of the most common, and while I probably won't be able to move away from these styles and somehow dramatically change it, I can override html templates and reuse CSS classes or add new ones, without much trouble. If you're looking into Hugo and want to try it out, be sure to check [@nunocoracao's getting started guide](https://nunocoracao.com/posts/202206-homepage-guide/), which is an awesome place to start playing around with it.
