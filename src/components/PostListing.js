import React from 'react';
import { Link } from 'gatsby';
import PostHeader from './PostHeader.js';
import { Box, Heading } from '@chakra-ui/react';

const PostListing = (props) => {
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
    <div>
      {postList.map((post) => (
        <Box key={post.title} size="md" mt="30">
          <Link as={Link} to={post.path}>
            <Heading mb="-0.1px" fontSize="24px" color="pink.600">
              {post.title}
            </Heading>
          </Link>
          <PostHeader post={post} />
          <Box as="p" mt="4">
            {post.excerpt}
          </Box>
        </Box>
      ))}
    </div>
  );
};

export default PostListing;
