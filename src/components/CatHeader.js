import React from 'react';
import { Box, Heading } from '@chakra-ui/react';

const CatHeader = (props) => {
  const { category } = props;
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
        Post(s) category as
      </Heading>
      <Heading
        as="h3"
        sx={{
          color: `primary`,
          textDecoration: `none`,
          border: `solid 1px`,
          boxSizing: `content-box`,
          display: `inline-block`,
          px: `4px`,
          borderRadius: `5px`,
          p: 1,
          mr: 2,
        }}
      >
        {category}
      </Heading>
    </Box>
  );
};

export default CatHeader;
