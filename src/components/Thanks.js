import React from 'react';
import { Heading } from '@chakra-ui/react';

const Thanks = () => {
  return (
    <div>
      <Heading
        as="h2"
        sx={{
          color: 'primary',
          fontFamily: 'heading',
        }}
      >
        お問い合わせが送信されました。
      </Heading>
    </div>
  );
};

export default Thanks;
