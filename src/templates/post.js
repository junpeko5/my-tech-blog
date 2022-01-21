import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import Layout from '../layout';
import PostHeader from '../components/PostHeader.js';
import SEO from '../components/SEO/SEO.js';
import config from '../../data/SiteConfig';
import { Heading, Box, Image } from '@chakra-ui/react';

const PostTemplate = (props) => {
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
    <Layout>
      <Helmet>
        <title>{`${post.title} | ${config.siteTitle}`}</title>
      </Helmet>
      <SEO postPath={slug} postNode={postNode} postSEO />
      <div>
        <Heading mt="30" color="pink.600">
          {post.title}
        </Heading>
        <PostHeader post={postWip[0]} />
        <Box>
          <Image src={post.cover} valiant="eyecatch" />
        </Box>
        <MDXWrapper>
          <MDXRenderer>{postNode.body}</MDXRenderer>
        </MDXWrapper>
      </div>
    </Layout>
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