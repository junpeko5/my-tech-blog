import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import Layout from '../layout';
import PostListing from '../components/PostListing';
import CatHeader from '../components/CatHeader';
import config from '../../data/SiteConfig';

const CategoryTemplate = (props) => {
  const { category } = props.pageContext;
  const postEdges = props.data.allMdx.edges;
  return (
    <>
      <Layout>
        <Helmet>
          <title>{`Posts in category "${category}" | ${config.siteTitle}`}</title>
        </Helmet>
        <CatHeader category={category} />
        <PostListing postEdges={postEdges} />
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
