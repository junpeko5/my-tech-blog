import React from 'react';
import Helmet from 'react-helmet';
import Layout from '../layout';
import { Link } from 'gatsby';
import config from '../../data/SiteConfig';
import { Heading, Text } from '@chakra-ui/react';

const default404 = () => {
  return (
    <Layout>
      <Helmet>
        <title>{`ページが見つかりません | ${config.siteTitle}`}</title>
      </Helmet>
      <Heading as="h1" paddingY="20px">
        ページが見つかりません
      </Heading>
      <Text color="blue">
        <Link to="/"> ← トップに戻る</Link>
      </Text>
    </Layout>
  );
};

export default default404;
