import { Box, Heading, useColorModeValue } from '@chakra-ui/react';
import { Link } from 'gatsby';
import React, { FC } from 'react';

import PostHeader from './PostHeader';

type Props = {
  postEdges: GatsbyTypes.BlogQueryQuery['allMdx']['edges'];
};

const PostListing: FC<Props> = ({ postEdges }) => {
  const color = useColorModeValue('light.primary', 'dark.primary');
  const postList = postEdges.map((postEdge) => {
    return {
      path: postEdge.node.fields?.slug,
      tags: postEdge.node.frontmatter?.tags,
      cover: postEdge.node.frontmatter?.cover,
      title: postEdge.node.frontmatter?.title,
      date: postEdge.node.fields?.date,
      excerpt: postEdge.node.excerpt,
      timeToRead: postEdge.node.timeToRead,
      category: postEdge.node.frontmatter?.category,
    };
  });
  return (
    <>
      {postList.map((post) => (
        <Box mb="6" key={post.title}>
          <Heading as="h3" size="md" color={color}>
            <Link to={post.path ?? '/'}>{post.title}</Link>
          </Heading>
          <PostHeader post={post} />
        </Box>
      ))}
    </>
  );
};

export default PostListing;
