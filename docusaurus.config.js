/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'David Simão',
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
      title: 'Madoke',
      items: [{
        to: 'blog',
        prependBaseUrlToHref: "true",
        label: 'Articles',
        position: 'left', // or 'right'
      }]
    },
    footer: {
      style: 'dark',
      copyright: `No copyright ever, No rights reserved. Built with <a href="https://docusaurus.io/">Docusaurus</a>, hosted on <a href="https://github.com">Github</a>`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        blog: {
          showReadingTime: true,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
