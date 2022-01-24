import { Heading, Box, useColorModeValue } from '@chakra-ui/react';
import { graphql, Link } from 'gatsby';
import React from 'react';
import Helmet from 'react-helmet';

import config from '../../data/SiteConfig';
import AllCategories from '../components/AllCategories';
import AvatarLinks from '../components/Avatar/AvatarLinks';
import BigAvatar from '../components/Avatar/BigAvatar';
import SEO from '../components/SEO/SEO.js';
import SimplePostListing from '../components/SimplePostListing';
import Layout from '../layout';

const Index = (props) => {
  const postEdges = props.data.allMdx.edges;
  const color = useColorModeValue('light.primary', 'dark.primary');

  return (
    <>
      <Layout>
        <Helmet>
          <title>{config.siteTitle}</title>
        </Helmet>
        <SEO />
        <Box my="30px">
          <BigAvatar />
          <AvatarLinks />
        </Box>
        <Box my="30px">
          <AllCategories />
        </Box>
        <section>
          <Heading as="h2" size="lg" my="30" color={color}>
            最近の投稿
          </Heading>
          <SimplePostListing postEdges={postEdges} />
        </section>
        <Box size="md" color={color} mt="30">
          <Link to={'/blog'} margin="auto">
            記事をもっと見る →
          </Link>
        </Box>
      </Layout>
    </>
  );
};

export default Index;

export const pageQuery = graphql`
  query IndexQuery {
    allMdx(limit: 5, sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          fields {
            slug
            date(formatString: "YYYY-MM-DD")
          }
          excerpt
          timeToRead
          frontmatter {
            category
            title
            tags
            cover
            date
          }
        }
      }
    }
  }
`;
