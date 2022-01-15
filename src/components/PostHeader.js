import React from 'react';
import _ from 'lodash';
import { Link } from 'gatsby';
import { Box, Flex } from '@chakra-ui/react';

import PostTags from './PostTags';

const PostHeader = (props) => {
  const { post } = props;

  return (
    <div>
      <small>{post.date}</small>
      <Flex alignItems="center">
        <Box
          as={Link}
          color="pink.600"
          py="1"
          px="2"
          mr="2"
          sx={{
            textDecoration: `none`,
            border: `solid 1px`,
            boxSizing: `content-box`,
            display: `inline-block`,
            px: `4px`,
            borderRadius: `5px`,
          }}
          to={`/categories/${_.kebabCase(post.category)}/`}
        >
          {post.category}
        </Box>
        <PostTags tags={post.tags} />
      </Flex>
    </div>
  );
};

export default PostHeader;
