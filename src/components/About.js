import React, { Component } from 'react';
import BigAvatar from './Avatar/BigAvatar.js';
import { Heading } from '@chakra-ui/react';

class About extends Component {
  render() {
    return (
      <div>
        <Heading as="h1" size="xl" color={'pink.500'} my="32px">
          プロフィール
        </Heading>
        <section>
          <BigAvatar />
        </section>
      </div>
    );
  }
}

export default About;
