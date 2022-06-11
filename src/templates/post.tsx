import { Heading, Box, Image, useColorModeValue } from '@chakra-ui/react';
import { graphql, PageProps } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import React, { FC } from 'react';
import Helmet from 'react-helmet';

import PostHeader from '../components/PostHeader';
import SEO from '../components/SEO/SEO';
import TableOfContents from '../components/TableOfContents';
import config from '../data/SiteConfig';
import MainLayout from '../layout';

type Context = {
  slug: string;
  nexttitle: string;
  nextslug: string;
  prevtitle: string;
  prevslug: string;
};
const MDXWrapper: FC = (props) => <div className="mdx-prose" {...props} />;

const PostTemplate: FC<PageProps<GatsbyTypes.BlogPostBySlugQuery>> = (
  props
) => {
  const { pageContext, data } = props;
  const color = useColorModeValue('light.primary', 'dark.primary');
  const { slug } = pageContext as Context;
  const postNode = data.mdx;
  const headings = postNode?.headings;
  const post = postNode?.frontmatter;

  const postNodeWip = [];
  postNodeWip.push(postNode);

  const postWip = postNodeWip.map((post) => {
    return {
      category: post?.frontmatter?.category as string,
      tags: post?.frontmatter?.tags as [],
      date: post?.fields?.date as string,
    };
  });

  return (
    <>
      <MainLayout>
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore*/}
        <Helmet>
          <title>{`${post?.title} | ${config.siteTitle}`}</title>
        </Helmet>
        <SEO postPath={slug} postNode={postNode} postSEO />
        <Box>
          <Heading mt="30" as="h2" color={color}>
            {post?.title}
          </Heading>
          <PostHeader post={postWip[0]} />
          <Box>
            <Image src={post?.cover} />
          </Box>
          <TableOfContents slug={slug} headings={headings} />
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-ignore*/}
          <MDXWrapper>
            {postNode?.body && <MDXRenderer>{postNode.body}</MDXRenderer>}
          </MDXWrapper>
        </Box>
      </MainLayout>
    </>
  );
};

export default PostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      rawBody
      body
      timeToRead
      excerpt
      frontmatter {
        title
        cover
        date
        category
        tags
      }
      headings(depth: h2) {
        value
      }
      fields {
        slug
        date(formatString: "YYYY-MM-DD")
      }
    }
  }
`;
