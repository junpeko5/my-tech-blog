import React from 'react';
import Helmet from 'react-helmet';
import Layout from '../layout';
import Thanks from '../components/Thanks.js';
import config from '../../data/SiteConfig';

const ThanksPage = () => {
  return (
    <Layout>
      <Helmet>
        <title>{`お問い合わせ完了 | ${config.siteTitle}`}</title>
      </Helmet>
      <Thanks />
    </Layout>
  );
};

export default ThanksPage;
