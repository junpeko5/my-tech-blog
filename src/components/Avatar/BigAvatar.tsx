import { Box, Heading, Image, Text, useColorModeValue } from '@chakra-ui/react';
import React, { FC } from 'react';

import config from '../../../data/SiteConfig';

const BigAvatar: FC = () => {
  const color = useColorModeValue('light.primary', 'dark.primary');

  return (
    <>
      <Box>
        <Image src={config.avatar.photo} alt="profile image" />
        <Heading as="h2" color={color} my="32px">
          Hello World!!
        </Heading>
      </Box>
      <Text my="16px">{config.avatar.description}</Text>
    </>
  );
};

export default BigAvatar;
