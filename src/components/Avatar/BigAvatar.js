import React from 'react';
import { Box, Heading, Image, Text } from '@chakra-ui/react';

import { avatar } from '../../../data/SiteConfig';

const BigAvatar = () => {
  return (
    <>
      <Box>
        <Image src={avatar.photo} alt="profile image" />
        <Heading as="h2" color="pink.600" my="32px">
          Hello World!!
        </Heading>
      </Box>
      <Text my="16px">{avatar.description}</Text>
    </>
  );
};

export default BigAvatar;
