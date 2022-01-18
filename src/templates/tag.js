import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import Layout from '../layout';
import PostListing from '../components/PostListing';
import TagHeader from '../components/TagHeader';
import config from '../../data/SiteConfig';

const TagTemplate = (props) => {
  const { tag } = props.pageContext;
  const postEdges = props.data.allMdx.edges;
  return (
    <Layout>
      <Helmet>
        <title>{`Posts tagged as "${tag}" | ${config.siteTitle}`}</title>
      </Helmet>
      <TagHeader tag={tag} />
      <PostListing postEdges={postEdges} />
    </Layout>
  );
};

export default TagTemplate;

export const pageQuery = graphql`
  query TagPage($tag: String) {
    allMdx(
      limit: 1000
      sort: { fields: [fields___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
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
