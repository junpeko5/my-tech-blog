import React from 'react';
import { IconContext } from 'react-icons';
import {
  Flex,
  Center,
  useColorModeValue,
  Link as ChakraLink,
} from '@chakra-ui/react';
import { AiFillGithub, AiFillTwitterCircle, AiFillMail } from 'react-icons/ai';
import { Link } from 'gatsby';

const AvatarLinks = () => {
  const color = useColorModeValue('gray.700', 'gray.50');
  return (
    <>
      <Center>
        <IconContext.Provider value={{ color: color, size: '30px' }}>
          <Flex mx="2" gap="6">
            <ChakraLink href={'https://github.com/junpeko5/'}>
              <AiFillGithub />
            </ChakraLink>
            <ChakraLink href={'https://twitter.com/junpeko516/'}>
              <AiFillTwitterCircle />
            </ChakraLink>
            <Link to={'/contact'}>
              <AiFillMail />
            </Link>
          </Flex>
        </IconContext.Provider>
      </Center>
    </>
  );
};
export default AvatarLinks;
