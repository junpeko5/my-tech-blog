import { graphql } from 'gatsby';
import React from 'react';
import Helmet from 'react-helmet';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import config from '../../data/SiteConfig';
import PostListing from '../components/PostListing';
import Layout from '../layout';

const CategoryTemplate = (props) => {
  const { category } = props.pageContext;
  const postEdges = props.data.allMdx.edges;
  return (
    <>
      <Layout>
        <Helmet>
          <title>{`Posts in category "${category}" | ${config.siteTitle}`}</title>
        </Helmet>
        <PostListing postEdges={postEdges} category={category} />
      </Layout>
    </>
  );
};

export default CategoryTemplate;

export const pageQuery = graphql`
  query CategoryPage($category: String) {
    allMdx(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { category: { eq: $category } } }
    ) {
      totalCount
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
