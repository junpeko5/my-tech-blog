import React from 'react';
import _ from 'lodash';
import { Link } from 'gatsby';
import { Box, Flex } from '@chakra-ui/react';

import PostTags from './PostTags';

const PostHeader = (props) => {
  const { post } = props;

  return (
    <>
      <Box fontSize="md" my="1">
        {post.date}
      </Box>
      <Flex alignItems="center" mb="2">
        <Link to={`/categories/${_.kebabCase(post.category)}/`}>
          <Box
            color="pink.600"
            py="1"
            px="2"
            mr="2"
            border="solid 1px"
            borderRadius="5px"
            boxSizing="content-box"
            display="inline-block"
          >
            {post.category}
          </Box>
        </Link>
        <PostTags tags={post.tags} />
      </Flex>
    </>
  );
};

export default PostHeader;
