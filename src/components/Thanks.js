import React from 'react';
import { Box, Heading } from '@chakra-ui/react';

const Thanks = () => {
  return (
    <div>
      <Heading as="h1" color="pink.600" my={10}>
        お問い合わせが送信されました。
      </Heading>
      <Box my={2}>お問い合わせ頂きありがとうございます。</Box>
      <Box my={2}>
        お問い合わせ内容につきましては、3日程度を目処にご回答させていただきます。
      </Box>
      <Box my={2}>いましばらくお待ちくださいませ。</Box>
    </div>
  );
};

export default Thanks;
