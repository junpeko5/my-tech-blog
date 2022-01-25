import React, { FC } from 'react';
import Helmet from 'react-helmet';

import config from '../../data/SiteConfig';
import About from '../components/About';
import Layout from '../layout';

const AboutPage: FC = () => {
  return (
    <>
      <Layout>
        <Helmet>
          <title>{`プロフィール | ${config.siteTitle}`}</title>
        </Helmet>
        <About />
      </Layout>
    </>
  );
};

export default AboutPage;
