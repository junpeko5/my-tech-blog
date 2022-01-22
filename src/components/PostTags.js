import { Box } from '@chakra-ui/react';
import { Link } from 'gatsby';
import _ from 'lodash';
import React from 'react';

const PostTags = ({ tags }) => {
  return (
    <>
      {tags &&
        tags.map((tag) => (
          <Link key={tag} to={`/tags/${_.kebabCase(tag)}`}>
            <Box
              textDecoration="none"
              shadow="0px 1px 5px rgba(0, 0, 0, 0.5)"
              p="1"
              borderRadius="4px"
              mr="4px"
              fontSize="sm"
            >
              {tag}
            </Box>
          </Link>
        ))}
    </>
  );
};

export default PostTags;
