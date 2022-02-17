import {
  Heading,
  Box,
  Flex,
  Text,
  Container,
  Center,
  useColorModeValue,
} from '@chakra-ui/react';
import { StaticImage } from 'gatsby-plugin-image';
import React, { FC } from 'react';

import siteConfig from '../../data/SiteConfig';
import AvatarLinks from './Avatar/AvatarLinks';

const Footer: FC = () => {
  const { avatar } = siteConfig;
  const { siteTitle, copyright } = siteConfig;
  const color = useColorModeValue('light.primary', 'dark.primary');

  return (
    <>
      <Box py="10">
        <Container maxW="container.md">
          <Heading
            as="h2"
            my="4"
            pt="4"
            color={color}
            borderTop="1px solid"
            textAlign="center"
            size="md"
          >
            {siteTitle}
          </Heading>

          <Flex alignItems="center" my="4">
            <Box mr="4">
              <StaticImage
                alt="avatar"
                src="../../static/images/profileIcon.jpg"
                imgStyle={{ borderRadius: '50%' }}
              />
            </Box>
            <Text as="p" fontSize="xs">
              {avatar.description}
            </Text>
          </Flex>
          <Box my="4">
            <AvatarLinks />
          </Box>
          <Center color={color}>{copyright}</Center>
        </Container>
      </Box>
    </>
  );
};

export default Footer;
