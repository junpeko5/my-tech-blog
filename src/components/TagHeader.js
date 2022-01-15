import React from 'react';
import { Box, Heading } from '@chakra-ui/react';

const TagHeader = (props) => {
  const { tag } = props;
  return (
    <Box
      sx={{
        display: `flex`,
        textAlign: `center`,
        alignItems: `baseline`,
        borderBottom: `1px solid`,
        color: `primary`,
      }}
    >
      <Heading as="h2" sx={{ color: `primary`, fontSize: `10`, mr: 2 }}>
        Post(s) tagged as
      </Heading>
      <Heading
        as="h2"
        sx={{
          color: `text`,
          mr: 1,
          boxShadow: `0px 1px 5px rgba(0, 0, 0, 0.5)`,
          p: `5px`,
          borderRadius: `4px`,
          boxSizing: `content-box`,
        }}
      >
        {tag}
      </Heading>
    </Box>
  );
};

export default TagHeader;
