import React, { FC } from 'react';
import Helmet from 'react-helmet';

import Thanks from '../components/Thanks';
import config from '../data/SiteConfig';
import MainLayout from '../layout';

const ThanksPage: FC = () => {
  return (
    <>
      <MainLayout>
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore*/}
        <Helmet>
          <title>{`お問い合わせ完了 | ${config.siteTitle}`}</title>
        </Helmet>
        <Thanks />
      </MainLayout>
    </>
  );
};

export default ThanksPage;
