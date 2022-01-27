import React, { FC } from 'react';
import Helmet from 'react-helmet';
import urljoin from 'url-join';

import config from '../../../data/SiteConfig';

type Props = {
  postNode?: GatsbyTypes.BlogPostBySlugQuery['mdx'];
  postPath?: string;
  postSEO?: boolean;
};

const SEO: FC<Props> = (props) => {
  const { postNode, postPath, postSEO } = props;
  let title;
  let description;
  let image;
  let postURL;

  if (postSEO) {
    const postMeta = postNode?.frontmatter;
    title = postMeta?.title;
    image = postMeta?.cover;
    if (postPath) {
      postURL = urljoin(config.siteUrl, postPath, '/');
    } else {
      postURL = urljoin(config.siteUrl, '/');
    }
  } else {
    title = config.siteTitle;
    description = config.siteDescription;
    image = config.siteLogo;
  }

  if (
    !image?.match(
      `(https?|ftp|file)://[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]`
    ) &&
    image
  ) {
    image = urljoin(config.siteUrl, image);
  }

  return (
    <>
      <Helmet>
        {/* General tags */}
        <meta name="description" content={description} />
        <meta name="image" content={image} />

        {/* OpenGraph tags */}
        <meta property="og:url" content={postSEO ? postURL : config.siteUrl} />
        {postSEO ? <meta property="og:type" content="article" /> : null}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta
          property="fb:app_id"
          content={config.siteFBAppID ? config.siteFBAppID : ''}
        />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:creator"
          content={config.userTwitter ? config.userTwitter : ''}
        />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />

        <link rel="icon" href="/images/favicon/favicon.ico" />
      </Helmet>
    </>
  );
};

export default SEO;
