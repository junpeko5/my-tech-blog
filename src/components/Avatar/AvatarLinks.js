import React from 'react';
import { IconContext } from 'react-icons';
import { Flex, Center, useColorModeValue } from '@chakra-ui/react';
import { AiFillGithub, AiFillTwitterCircle, AiFillMail } from 'react-icons/all';
import { Link } from 'gatsby';

const AvatarLinks = () => {
  const color = useColorModeValue('gray.700', 'gray.50');
  return (
    <Center>
      <IconContext.Provider value={{ color: color, size: '30px' }}>
        <Flex mx="2" gap="6">
          <a href={'https://github.com/junpeko5/'}>
            <AiFillGithub />
          </a>
          <a href={'https://twitter.com/junpeko516/'}>
            <AiFillTwitterCircle />
          </a>
          <Link to={'/contact'}>
            <AiFillMail />
          </Link>
        </Flex>
      </IconContext.Provider>
    </Center>
  );
};
export default AvatarLinks;
