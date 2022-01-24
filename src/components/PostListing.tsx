import { Box, Heading, useColorModeValue } from '@chakra-ui/react';
import { Link } from 'gatsby';
import React, { FC } from 'react';

import CategoryHeader from './CategoryHeader';
import PostHeader from './PostHeader';
import TagHeader from './TagHeader';

const PostListing: FC = (props) => {
  const { category, tag } = props;
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
  const color = useColorModeValue('light.primary', 'dark.primary');

  return (
    <>
      <Heading as="h1" size="xl" color={color} my="32px">
        記事一覧
      </Heading>
      {category ? (
        <CategoryHeader category={category} />
      ) : (
        <TagHeader tag={tag} />
      )}
      {postList.map((post) => (
        <Box key={post.title} size="md" mt={'30'}>
          <Link to={post.path}>
            <Heading mb="-0.1px" fontSize="24px" color={color}>
              {post.title}
            </Heading>
          </Link>
          <PostHeader post={post} />
        </Box>
      ))}
    </>
  );
};

export default PostListing;
