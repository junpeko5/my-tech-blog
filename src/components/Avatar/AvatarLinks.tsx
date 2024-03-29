import {
  Flex,
  Center,
  useColorModeValue,
  Link as ChakraLink,
} from '@chakra-ui/react';
import { IconContext } from '@react-icons/all-files';
import { AiFillGithub } from '@react-icons/all-files/ai/AiFillGithub';
import { AiFillMail } from '@react-icons/all-files/ai/AiFillMail';
import { AiFillTwitterCircle } from '@react-icons/all-files/ai/AiFillTwitterCircle';
import { Link } from 'gatsby';
import React from 'react';

const AvatarLinks = () => {
  const color = useColorModeValue('gray.600', 'gray.50');
  return (
    <>
      <Center>
        <IconContext.Provider value={{ color: color, size: '30px' }}>
          <Flex mx="2" gap="6" color={color}>
            <ChakraLink
              href={'https://github.com/junpeko5/'}
              title="Github icon"
              area-label="Github icon"
            >
              <AiFillGithub />
            </ChakraLink>
            <ChakraLink
              href={'https://twitter.com/junpeko516/'}
              title="Twitter icon"
              area-label="Twitter icon"
            >
              <AiFillTwitterCircle />
            </ChakraLink>
            <Link to={'/contact'} title="Mail icon" area-label="Mail icon">
              <AiFillMail />
            </Link>
          </Flex>
        </IconContext.Provider>
      </Center>
    </>
  );
};
export default AvatarLinks;
