import { Box, Heading, useColorModeValue } from '@chakra-ui/react';
import { Link } from 'gatsby';
import React, { FC } from 'react';

import CategoryHeader from './CategoryHeader';
import PostHeader from './PostHeader';
import TagHeader from './TagHeader';

type Props = {
  category?: string;
  tag?: string;
  postEdges: GatsbyTypes.BlogQueryQuery['allMdx']['edges'];
};

const PostListing: FC<Props> = ({ category, tag, postEdges }) => {
  const postList = postEdges.map((postEdge) => {
    return {
      path: postEdge.node.fields?.slug as string,
      tags: postEdge.node.frontmatter?.tags as [],
      cover: postEdge.node.frontmatter?.cover,
      title: postEdge.node.frontmatter?.title,
      date: postEdge.node.fields?.date as string,
      category: postEdge.node.frontmatter?.category as string,
    };
  });

  const color = useColorModeValue('light.primary', 'dark.primary');

  return (
    <>
      <Heading as="h1" size="xl" color={color} my="32px">
        記事一覧
      </Heading>
      {category && <CategoryHeader category={category} />}
      {tag && <TagHeader tag={tag} />}
      {postList.map((post) => (
        <Box key={post.title} size="md" mt={'30'}>
          <Link to={post.path ?? '/'}>
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
