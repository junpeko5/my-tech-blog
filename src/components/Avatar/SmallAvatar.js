import React from 'react';
import siteConfig from '../../../data/SiteConfig';
import AvatarLinks from './AvatarLinks';
import { Heading, Box, Flex, Image, Text } from '@chakra-ui/react';

const SmallAvatar = (props) => {
  const { avatar } = siteConfig;
  const { siteTitle } = siteConfig;

  return (
    <>
      <Heading
        as="h2"
        my="4"
        pt="4"
        color="pink.600"
        borderTop="1px solid"
        textAlign="center"
        size="md"
      >
        {siteTitle}
      </Heading>

      <Flex alignItems="center" my="4">
        <Box mr="4">
          <Image
            alt="small avatar"
            src={avatar.photo}
            width="70px"
            borderRadius="50%"
          />
        </Box>
        <Text as="p" fontSize="sm">
          {avatar.description}
        </Text>
      </Flex>
      <div sx={{ textAlign: `left` }}>
        <AvatarLinks />
      </div>
    </>
  );
};

export default SmallAvatar;
