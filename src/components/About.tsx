import { Heading, useColorModeValue } from '@chakra-ui/react';
import React, { FC } from 'react';

import BigAvatar from './Avatar/BigAvatar';

const About: FC = () => {
  const color = useColorModeValue('light.primary', 'dark.primary');

  return (
    <>
      <Heading as="h1" size="xl" color={color} my="32px">
        プロフィール
      </Heading>
      <section>
        <BigAvatar />
      </section>
    </>
  );
};

export default About;
