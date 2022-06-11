import { Heading, Text } from '@chakra-ui/react';
import { Link } from 'gatsby';
import React, { FC } from 'react';
import Helmet from 'react-helmet';

import config from '../data/SiteConfig';
import MainLayout from '../layout';

const default404: FC = () => {
  return (
    <>
      <MainLayout>
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore*/}
        <Helmet>
          <title>{`ページが見つかりません | ${config.siteTitle}`}</title>
        </Helmet>
        <Heading as="h1" size="xl" color={'primary'} my="32px">
          ページが見つかりません。
        </Heading>
        <Text color="blue">
          <Link to="/"> ← トップに戻る</Link>
        </Text>
      </MainLayout>
    </>
  );
};

export default default404;
