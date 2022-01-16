import React from 'react';
import Helmet from 'react-helmet';
import { graphql, Link } from 'gatsby';
import Layout from '../layout';
import SimplePostListing from '../components/SimplePostListing';
import SEO from '../components/SEO/SEO.js';
import BigAvatar from '../components/Avatar/BigAvatar.js';
import AvatarLinks from '../components/Avatar/AvatarLinks';
import config from '../../data/SiteConfig';
import AllCategories from '../components/AllCategories.js';
import { Heading, Box } from '@chakra-ui/react';

class Index extends React.Component {
  render() {
    const postEdges = this.props.data.allMdx.edges;
    const { userLinks } = config;

    return (
      <Layout>
        <Helmet title={config.siteTitle} />
        <SEO />
        <Box my="30px">
          <BigAvatar />
          <AvatarLinks />
        </Box>
        <Box my="30px">
          <AllCategories />
        </Box>
        <section>
          <Heading as="h2" size="lg" my="30" color="pink.600">
            最近の投稿
          </Heading>
          <SimplePostListing postEdges={postEdges} />
        </section>
        <Box size="md" color="pink.600" mt="30">
          <Link
            as={Link}
            to={'/blog'}
            sx={{
              margin: `auto`,
              textAlign: `center`,
              color: `primary`,
              borderBottom: `solid 3px`,
              ':hover': {
                bg: `muted`,
                p: 1,
                borderRadius: `5px`,
              },
            }}
          >
            記事をもっと見る →
          </Link>
        </Box>
      </Layout>
    );
  }
}

export default Index;

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query IndexQuery {
    allMdx(limit: 5, sort: { fields: [fields___date], order: DESC }) {
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
