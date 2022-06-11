import React, { FC } from 'react';
import { Helmet } from 'react-helmet';

import About from '../components/About';
import config from '../data/SiteConfig';
import MainLayout from '../layout';

const AboutPage: FC = () => {
  return (
    <>
      <MainLayout>
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore*/}
        <Helmet>
          <title>{`プロフィール | ${config.siteTitle}`}</title>
        </Helmet>
        <About />
      </MainLayout>
    </>
  );
};

export default AboutPage;
