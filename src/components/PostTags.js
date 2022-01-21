import React from 'react';
import _ from 'lodash';
import { Link } from 'gatsby';
import { Box } from '@chakra-ui/react';

const PostTags = ({ tags }) => {
  return (
    <div>
      {tags &&
        tags.map((tag) => (
          <Box
            as={Link}
            key={tag}
            to={`/tags/${_.kebabCase(tag)}`}
            textDecoration="none"
            shadow="0px 1px 5px rgba(0, 0, 0, 0.5)"
            p="1"
            borderRadius="4px"
            mr="4px"
            fontSize="sm"
          >
            {tag}
          </Box>
        ))}
    </div>
  );
};

export default PostTags;
