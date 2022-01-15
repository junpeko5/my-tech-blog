import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';

import { avatar } from '../../../data/SiteConfig';

const BigAvatar = () => {
  return (
    <>
      <Box>
        <img src={avatar.photo} alt="profileImage" />
        <Heading as="h2" color="pink.500" my="32px">
          Hello World!!
        </Heading>
      </Box>
      <Text my="16px">{avatar.description}</Text>
    </>
  );
};

export default BigAvatar;
