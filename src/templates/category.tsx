import { graphql, PageProps } from 'gatsby';
import React, { FC } from 'react';
import Helmet from 'react-helmet';

import PostListing from '../components/PostListing';
import config from '../data/SiteConfig';
import MainLayout from '../layout';

type Category = {
  category: string;
};

const CategoryTemplate: FC<PageProps<GatsbyTypes.CategoryPageQuery>> = ({
  pageContext,
  data,
}) => {
  const { category } = pageContext as Category;
  const postEdges = data.allMdx.edges;
  return (
    <>
      <MainLayout>
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore*/}
        <Helmet>
          <title>{`Posts in category "${category}" | ${config.siteTitle}`}</title>
        </Helmet>
        <PostListing postEdges={postEdges} category={category} />
      </MainLayout>
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
