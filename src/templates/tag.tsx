import { graphql, PageProps } from 'gatsby';
import React, { FC } from 'react';
import Helmet from 'react-helmet';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import config from '../../data/SiteConfig';
import PostListing from '../components/PostListing';
import Layout from '../layout';

const TagTemplate: FC = (props) => {
  const { tag } = props.pageContext;
  const postEdges = props.data.allMdx.edges;
  return (
    <>
      <Layout>
        <Helmet>
          <title>{`Posts tagged as "${tag}" | ${config.siteTitle}`}</title>
        </Helmet>
        <PostListing postEdges={postEdges} tag={tag} />
      </Layout>
    </>
  );
};

export default TagTemplate;

export const pageQuery = graphql`
  query TagPage($tag: String) {
    allMdx(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
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
