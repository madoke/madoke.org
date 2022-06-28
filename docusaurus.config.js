/** @type {import('@docusaurus/types').DocusaurusConfig} */

const blogPath = '/blog'
const blogTitle = 'Welcome to the Jungle'
const blogDescription = 'A collection of thoughts and personal opinions about software engineering and life in general'
const copyright = 'No copyright ever, No rights reserved'

module.exports = {
  title: 'David Simão',
  tagline: 'What there is to know about David Simao',
  url: 'https://madoke.org',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'madoke', // Usually your GitHub org/user name.
  projectName: 'madoke.github.io', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'David Simão',
      items: [{
        to: blogPath,
        prependBaseUrlToHref: true,
        label: 'Blog',
        position: 'left', // or 'right'
      }]
    },
    footer: {
      style: 'dark',
      copyright: `Nobody uses footers anymore. Yet, here we stand.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: false,
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
