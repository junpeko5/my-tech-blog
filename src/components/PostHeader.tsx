import { Box, Flex, useColorModeValue } from '@chakra-ui/react';
import { Link } from 'gatsby';
import _ from 'lodash';
import React, { FC } from 'react';

import PostTags from './PostTags';

type Props = {
  post: {
    tags: [];
    date: string;
    category: string;
  };
};

const PostHeader: FC<Props> = (props) => {
  const { post } = props;
  const color = useColorModeValue('light.primary', 'dark.primary');
  return (
    <>
      <Box fontSize="md" my="1">
        {post.date}
      </Box>
      <Flex alignItems="center" mb="2">
        <Link to={`/categories/${_.kebabCase(post.category)}/`}>
          <Box
            color={color}
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
