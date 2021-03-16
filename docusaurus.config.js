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
    },
    footer: {
      style: 'dark',
      links: [
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Madoke. Built with Docusaurus, hosted on Github`,
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
