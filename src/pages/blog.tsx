import { graphql, PageProps } from 'gatsby';
import React, { FC } from 'react';
import Helmet from 'react-helmet';

import config from '../../data/SiteConfig';
import PostListing from '../components/PostListing';
import SEO from '../components/SEO/SEO';
import Layout from '../layout';

const Blog: FC<PageProps<GatsbyTypes.BlogQueryQuery>> = (props) => {
  const postEdges = props.data.allMdx.edges;
  return (
    <>
      <Layout>
        <Helmet>
          <title>{`記事一覧 | ${config.siteTitle}`}</title>
        </Helmet>
        <SEO />
        <PostListing postEdges={postEdges} />
      </Layout>
    </>
  );
};

export default Blog;

export const blogQuery = graphql`
  query BlogQuery {
    allMdx(limit: 2000, sort: { fields: [frontmatter___date], order: DESC }) {
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
