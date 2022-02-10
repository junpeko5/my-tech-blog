import type { PluginOptions as TypegenPluginOptions } from 'gatsby-plugin-typegen/types';
import SiteConfig from './data/SiteConfig';
import { GatsbyConfig } from 'gatsby';

type Plugin =
  | string
  | { resolve: string; options: object }
  | { resolve: `gatsby-plugin-typegen`; options: TypegenPluginOptions };

const plugins: Plugin[] = [
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
  'gatsby-remark-images',
  'gatsby-remark-responsive-iframe',
  'gatsby-remark-copy-linked-files',
  'gatsby-remark-autolink-headers',
  'gatsby-remark-prismjs',
  {
    resolve: `gatsby-plugin-mdx`,
    options: {
      extensions: [`.mdx`, `.md`],
      gatsbyRemarkPlugins: [
        {
          resolve: 'gatsby-remark-images',
          options: {
            maxWidth: 736,
          },
        },
        'gatsby-remark-responsive-iframe',
        'gatsby-remark-copy-linked-files',
        {
          resolve: `gatsby-remark-autolink-headers`,
          options: {
            offsetY: 1000,
            icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>`,
            className: `custom-class`,
            maintainCase: true,
            removeAccents: true,
            isIconAfterHeader: true,
            elements: [`h2`],
          },
        },
        {
          resolve: `gatsby-remark-prismjs`,
          options: {
            // Class prefix for <pre> tags containing syntax highlighting;
            // defaults to 'language-' (e.g. <pre class="language-js">).
            // If your site loads Prism into the browser at runtime,
            // (e.g. for use with libraries like react-live),
            // you may use this to prevent Prism from re-processing syntax.
            // This is an uncommon use-case though;
            // If you're unsure, it's best to use the default value.
            classPrefix: 'language-',
            // This is used to allow setting a language for inline code
            // (i.e. single backticks) by creating a separator.
            // This separator is a string and will do no white-space
            // stripping.
            // A suggested value for English speakers is the non-ascii
            // character '›'.
            inlineCodeMarker: null,
            // This lets you set up language aliases.  For example,
            // setting this to '{ sh: "bash" }' will let you use
            // the language "sh" which will highlight using the
            // bash highlighter.
            aliases: {},
            // This toggles the display of line numbers globally alongside the code.
            // To use it, add the following line in gatsby-browser.ts
            // right after importing the prism color scheme:
            //  require("prismjs/plugins/line-numbers/prism-line-numbers.css")
            // Defaults to false.
            // If you wish to only show line numbers on certain code blocks,
            // leave false and use the {numberLines: true} syntax below
            showLineNumbers: false,
            // If setting this to true, the parser won't handle and highlight inline
            // code used in markdown i.e. single backtick code like `this`.
            noInlineHighlight: false,
            // This adds a new language definition to Prism or extend an already
            // existing language definition. More details on this option can be
            // found under the header "Add new language definition or extend an
            // existing language" below.
            languageExtensions: [
              {
                language: 'superscript',
                extend: 'javascript',
                definition: {
                  superscript_types: /(SuperType)/,
                },
                insertBefore: {
                  function: {
                    superscript_keywords: /(superif|superelse)/,
                  },
                },
              },
            ],
            // Customize the prompt used in shell output
            // Values below are default
            prompt: {
              user: 'root',
              host: 'localhost',
              global: false,
            },
            // By default the HTML entities <>&'" are escaped.
            // Add additional HTML escapes by providing a mapping
            // of HTML entities and their escape value IE: { '}': '&#123;' }
            escapeEntities: {},
          },
        },
      ],
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
  {
    resolve: `gatsby-plugin-typegen`,
    options: {
      // ... customize options here
    },
  },
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

module.exports = {
  plugins,
  siteMetadata,
};
