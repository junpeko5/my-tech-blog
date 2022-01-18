import React, { Component } from 'react';
import Helmet from 'react-helmet';
import Layout from '../layout';
import About from '../components/About.js';
import config from '../../data/SiteConfig';

const AboutPage = () => {
  return (
    <Layout>
      <Helmet title={`プロフィール | ${config.siteTitle}`} />
      <About />
    </Layout>
  );
};

export default AboutPage;
