import React from 'react';
import BigAvatar from './Avatar/BigAvatar.js';
import { Heading } from '@chakra-ui/react';

const About = () => {
  return (
    <>
      <Heading as="h1" size="xl" color={'pink.600'} my="32px">
        プロフィール
      </Heading>
      <section>
        <BigAvatar />
      </section>
    </>
  );
};

export default About;
