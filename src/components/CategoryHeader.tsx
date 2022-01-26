import { Box, Flex, useColorModeValue } from '@chakra-ui/react';
import React, { FC } from 'react';

type Props = {
  category: string;
};

const CategoryHeader: FC<Props> = ({ category }) => {
  const color = useColorModeValue('light.primary', 'dark.primary');
  return (
    <>
      <Flex textAlign="center" alignItems="center">
        <Box mr="1">カテゴリー</Box>
        <Box
          py="1px"
          px="2px"
          color={color}
          borderRadius="4px"
          boxShadow="0px 1px 5px rgba(0, 0, 0, 0.5)"
          fontWeight="bold"
        >
          {category}
        </Box>
        <Box>の記事一覧</Box>
      </Flex>
    </>
  );
};

export default CategoryHeader;
