import { Heading, Box, Image, useColorModeValue } from '@chakra-ui/react';
import { graphql, PageProps } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import React, { FC } from 'react';
import Helmet from 'react-helmet';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import config from '../../data/SiteConfig';
import PostHeader from '../components/PostHeader';
import SEO from '../components/SEO/SEO';
import Layout from '../layout';

import BlogPostBySlugQuery = GatsbyTypes.BlogPostBySlugQuery;

const PostTemplate: FC<PageProps<BlogPostBySlugQuery>> = (props) => {
  const color = useColorModeValue('light.primary', 'dark.primary');

  const { data, pageContext } = props;
  const { slug } = pageContext;
  const postNode = data.mdx;
  const post = postNode.frontmatter;
  if (!post.id) {
    post.id = slug;
  }
  if (!post.category_id) {
    post.category_id = config.postDefaultCategoryID;
  }

  //transforming my data from post into and Array so that I can loop through it
  const postNodeWip = [];
  postNodeWip.push(postNode);

  const postWip = [];
  postNodeWip.forEach((post) => {
    postWip.push({
      category: post.frontmatter.category,
      timeToRead: post.timeToRead,
      tags: post.frontmatter.tags,
      date: post.fields.date,
    });
  });

  const MDXWrapper = (props) => <div className="mdx-prose" {...props} />;

  return (
    <>
      <Layout>
        <Helmet>
          <title>{`${post.title} | ${config.siteTitle}`}</title>
        </Helmet>
        <SEO postPath={slug} postNode={postNode} postSEO />
        <div>
          <Heading mt="30" as="h2" color={color}>
            {post.title}
          </Heading>
          <PostHeader post={postWip[0]} />
          <Box>
            <Image src={post.cover} />
          </Box>
          <MDXWrapper>
            <MDXRenderer>{postNode.body}</MDXRenderer>
          </MDXWrapper>
        </div>
      </Layout>
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
      fields {
        slug
        date(formatString: "YYYY-MM-DD")
      }
    }
  }
`;
