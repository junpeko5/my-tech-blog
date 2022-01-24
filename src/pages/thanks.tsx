import React from 'react';
import Helmet from 'react-helmet';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import config from '../../data/SiteConfig';
import Thanks from '../components/Thanks';
import Layout from '../layout';

const ThanksPage = () => {
  return (
    <>
      <Layout>
        <Helmet>
          <title>{`お問い合わせ完了 | ${config.siteTitle}`}</title>
        </Helmet>
        <Thanks />
      </Layout>
    </>
  );
};

export default ThanksPage;
