import React from 'react';
import Helmet from 'react-helmet';

import config from '../../data/SiteConfig';
import About from '../components/About.js';
import Layout from '../layout';

const AboutPage = () => {
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
