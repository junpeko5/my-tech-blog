import { Box, Heading, useColorModeValue } from '@chakra-ui/react';
import { Link } from 'gatsby';
import React from 'react';

import PostHeader from './PostHeader';

const PostListing = (props) => {
  const color = useColorModeValue('light.primary', 'dark.primary');
  const getPostList = () => {
    const postList = [];
    props.postEdges.forEach((postEdge) => {
      postList.push({
        path: postEdge.node.fields.slug,
        tags: postEdge.node.frontmatter.tags,
        cover: postEdge.node.frontmatter.cover,
        title: postEdge.node.frontmatter.title,
        date: postEdge.node.fields.date,
        excerpt: postEdge.node.excerpt,
        timeToRead: postEdge.node.timeToRead,
        category: postEdge.node.frontmatter.category,
      });
    });
    return postList;
  };

  const postList = getPostList();
  return (
    <>
      {postList.map((post) => (
        <Box mb="6" key={post.title}>
          <Heading as="h3" size="md" color={color}>
            <Link to={post.path}>{post.title}</Link>
          </Heading>
          <PostHeader post={post} />
        </Box>
      ))}
    </>
  );
};

export default PostListing;
