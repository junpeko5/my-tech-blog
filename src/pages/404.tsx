import { Heading, Text } from '@chakra-ui/react';
import { Link } from 'gatsby';
import React, { FC } from 'react';
import Helmet from 'react-helmet';

import config from '../data/SiteConfig';
import Layout from '../layout';

const default404: FC = () => {
  return (
    <>
      <Layout>
        <Helmet>
          <title>{`ページが見つかりません | ${config.siteTitle}`}</title>
        </Helmet>
        <Heading as="h1" size="xl" color={'primary'} my="32px">
          ページが見つかりません。
        </Heading>
        <Text color="blue">
          <Link to="/"> ← トップに戻る</Link>
        </Text>
      </Layout>
    </>
  );
};

export default default404;
