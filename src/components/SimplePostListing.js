import React, { Fragment } from 'react';
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
        <Fragment key={post.title}>
          <Box mb="6">
            <Heading as="h3" size="md" color="pink.600">
              <Link as={Link} to={post.path}>
                {post.title}
              </Link>
            </Heading>
            <PostHeader post={post} />
          </Box>
        </Fragment>
      ))}
    </div>
  );
};

export default PostListing;
