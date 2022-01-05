/** @type {import('@docusaurus/types').DocusaurusConfig} */

const blogPath = '/blog'
const blogTitle = 'Welcome to the Jungle'
const blogDescription = 'A collection of thoughts and personal opinions about software engineering and life in general'
const copyright = 'No copyright ever, No rights reserved'

module.exports = {
  title: 'David Simao',
  tagline: 'Software Engineer',
  url: 'https://madoke.org',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'madoke', // Usually your GitHub org/user name.
  projectName: 'madoke.github.io', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'David Simao',
      items: [{
        to: blogPath,
        prependBaseUrlToHref: 'true',
        label: 'Blog',
        position: 'left', // or 'right'
      }]
    },
    footer: {
      style: 'dark',
      copyright: `${copyright}. Built with <a href="https://docusaurus.io/">Docusaurus</a>, hosted on <a href="https://ipfs.io">IPFS</a>`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        blog: {
          remarkPlugins: [require('mdx-mermaid')],
          routeBasePath: blogPath,
          blogTitle,
          blogDescription,
          blogSidebarCount: 'ALL',
          blogSidebarTitle: 'Articles',
          showReadingTime: true,
          feedOptions: {
            type: 'all',
            title: blogTitle,
            description: blogDescription,
            copyright,
            language: 'en-GB',
          },
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
