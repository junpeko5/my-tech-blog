import {
  Heading,
  Box,
  Flex,
  Image,
  Text,
  Container,
  Center,
  useColorModeValue,
} from '@chakra-ui/react';
import React, { FC } from 'react';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
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
              <Image
                alt="avatar"
                src={avatar.photo}
                width="140px"
                borderRadius="50%"
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
