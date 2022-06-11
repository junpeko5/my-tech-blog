import { graphql, PageProps } from 'gatsby';
import React, { FC } from 'react';
import Helmet from 'react-helmet';

import PostListing from '../components/PostListing';
import config from '../data/SiteConfig';
import MainLayout from '../layout';

type Context = {
  tag: string;
};

const TagTemplate: FC<PageProps<GatsbyTypes.TagPageQuery>> = ({
  pageContext,
  data,
}) => {
  const postEdges = data.allMdx.edges;
  const { tag } = pageContext as Context;
  return (
    <>
      <MainLayout>
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore*/}
        <Helmet>
          <title>{`Posts tagged as "${tag}" | ${config.siteTitle}`}</title>
        </Helmet>
        <PostListing postEdges={postEdges} tag={tag} />
      </MainLayout>
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
