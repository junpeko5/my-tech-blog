import React, { Component } from 'react';
import { Heading } from '@chakra-ui/react';

class Thanks extends Component {
  render() {
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
  }
}

export default Thanks;
