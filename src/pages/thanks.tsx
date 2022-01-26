import React, { FC } from 'react';
import Helmet from 'react-helmet';

import config from '../../data/SiteConfig';
import Thanks from '../components/Thanks';
import Layout from '../layout';

const ThanksPage: FC = () => {
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
