import React from 'react';
import { Box, Heading } from '@chakra-ui/react';

const Thanks = () => {
  return (
    <>
      <Heading as="h1" size="xl" color={'pink.600'} my="32px">
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
