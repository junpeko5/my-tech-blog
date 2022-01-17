import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import Layout from '../layout';
import PostListing from '../components/PostListing';
import SEO from '../components/SEO/SEO.js';
import config from '../../data/SiteConfig';

const Blog = (props) => {
  const postEdges = props.data.allMdx.edges;
  return (
    <Layout>
      <Helmet title={config.siteTitle} />
      <SEO />
      <PostListing postEdges={postEdges} />
    </Layout>
  );
};

export default Blog;

export const blogQuery = graphql`
  query BlogQuery {
    allMdx(limit: 2000, sort: { fields: [fields___date], order: DESC }) {
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
