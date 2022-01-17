import React from 'react';
import BigAvatar from './Avatar/BigAvatar.js';
import { Heading } from '@chakra-ui/react';

const About = () => {
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
};

export default About;
