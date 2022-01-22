import React from 'react';
import { Box, Heading, useColorModeValue } from '@chakra-ui/react';

const Thanks = () => {
  const color = useColorModeValue('light.primary', 'dark.primary');

  return (
    <>
      <Heading as="h1" size="xl" color={color} my="32px">
        お問い合わせが送信されました。
      </Heading>
      <Box my={2}>お問い合わせ頂きありがとうございます。</Box>
      <Box my={2}>
        お問い合わせ内容につきましては、3日程度を目処にご回答させていただきます。
      </Box>
      <Box my={2}>いましばらくお待ちくださいませ。</Box>
    </>
  );
};

export default Thanks;
