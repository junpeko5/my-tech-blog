import React from 'react';
import { Box, Flex, useColorModeValue } from '@chakra-ui/react';

const TagHeader = ({ tag }) => {
  const color = useColorModeValue('light.primary', 'dark.primary');
  return (
    <>
      <Flex textAlign="center" alignItems="baseline">
        <Box mr="1">Post(s) tagged as</Box>
        <Box
          py="1px"
          px="2px"
          color={color}
          borderRadius="4px"
          boxShadow="0px 1px 5px rgba(0, 0, 0, 0.5)"
          fontWeight="bold"
        >
          {tag}
        </Box>
      </Flex>
    </>
  );
};

export default TagHeader;
