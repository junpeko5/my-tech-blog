import SiteConfig from './data/SiteConfig';

import type { GatsbyConfig } from 'gatsby';

const plugins: GatsbyConfig['plugins'] = [
  'gatsby-plugin-react-helmet',
  'gatsby-plugin-lodash',
  '@chakra-ui/gatsby-plugin',
  {
    resolve: '@chakra-ui/gatsby-plugin',
    options: {
      isResettingCSS: true,
      isUsingColorMode: true,
    },
  },
  {
    resolve: `gatsby-plugin-mdx`,
    options: {
      extensions: [`.mdx`, `.md`],
    },
  },
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      name: 'assets',
      path: `${__dirname}/static/`,
    },
  },
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      name: 'posts',
      path: `${__dirname}/content/`,
    },
  },
  {
    resolve: 'gatsby-transformer-remark',
    options: {
      plugins: [
        {
          resolve: 'gatsby-remark-images',
          options: {
            maxWidth: 736,
          },
        },
        { resolve: 'gatsby-remark-responsive-iframe' },
        { resolve: 'gatsby-remark-copy-linked-files' },
        'gatsby-remark-autolink-headers',
      ],
    },
  },
  {
    resolve: 'gatsby-plugin-google-tagmanager',
    options: {
      id: SiteConfig.siteGTMID,
      includeInDevelopment: false,
    },
  },
  {
    resolve: 'gatsby-plugin-nprogress',
    options: {
      color: SiteConfig.themeColor,
    },
  },
  'gatsby-plugin-sharp',
  'gatsby-transformer-sharp',
  'gatsby-plugin-catch-links',
  'gatsby-plugin-sitemap',
  {
    resolve: 'gatsby-plugin-manifest',
    options: {
      name: SiteConfig.siteTitle,
      short_name: SiteConfig.siteTitleShort,
      description: SiteConfig.siteDescription,
      start_url: '/',
      background_color: SiteConfig.backgroundColor,
      theme_color: SiteConfig.themeColor,
      display: 'minimal-ui',
      icons: [
        {
          src: '/logos/logo-192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/logos/logo-512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    },
  },
  'gatsby-plugin-offline',
  'gatsby-plugin-typegen',
];
const siteMetadata: GatsbyConfig['siteMetadata'] = {
  siteUrl: SiteConfig.siteUrl,
  rssMetadata: {
    site_url: SiteConfig.siteUrl,
    feed_url: SiteConfig.siteUrl,
    title: SiteConfig.siteTitle,
    description: SiteConfig.siteDescription,
    image_url: SiteConfig.siteUrl + `/logos/logo-512.png`,
    copyright: SiteConfig.copyright,
  },
};

const config: GatsbyConfig = {
  siteMetadata,
  plugins,
};
export default config;
