import { graphql, PageProps } from 'gatsby';
import React, { FC } from 'react';
import Helmet from 'react-helmet';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import config from '../../data/SiteConfig';
import PostListing from '../components/PostListing';
import SEO from '../components/SEO/SEO';
import Layout from '../layout';

import BlogQueryQuery = GatsbyTypes.BlogQueryQuery;

const Blog: FC<PageProps<BlogQueryQuery>> = (props) => {
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
