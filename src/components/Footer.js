import React from 'react';
import siteConfig from '../../data/SiteConfig';
import AvatarLinks from './Avatar/AvatarLinks';
import {
  Heading,
  Box,
  Flex,
  Image,
  Text,
  Container,
  Center,
} from '@chakra-ui/react';

const Footer = (props) => {
  const { avatar } = siteConfig;
  const { siteTitle, copyright } = siteConfig;

  return (
    <>
      <Box py="10">
        <Container maxW="container.md">
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
          <Box my="4">
            <AvatarLinks />
          </Box>
          <Center color="pink.600">{copyright}</Center>
        </Container>
      </Box>
    </>
  );
};

export default Footer;
