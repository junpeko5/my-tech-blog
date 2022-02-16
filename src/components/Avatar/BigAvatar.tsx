import { Box, Heading, Text, useColorModeValue } from '@chakra-ui/react';
import { StaticImage } from 'gatsby-plugin-image';
import React, { FC } from 'react';

import config from '../../../data/SiteConfig';

const BigAvatar: FC = () => {
  const color = useColorModeValue('light.primary', 'dark.primary');

  return (
    <>
      <Box>
        <StaticImage
          src="../../../static/images/profileIcon.jpg"
          alt="profile image"
        />
        <Heading as="h2" color={color} my="32px">
          Hello World!!
        </Heading>
      </Box>
      <Text my="16px">{config.avatar.description}</Text>
    </>
  );
};

export default BigAvatar;
