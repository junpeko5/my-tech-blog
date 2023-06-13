import { Flex, Text, Box, useColorModeValue } from '@chakra-ui/react';
import { Link } from 'gatsby';
import React, { useState, useEffect, FC } from 'react';

import DrawerMenu from './DrawerMenu';
import ToggleMode from './ToggleMode';
import config from '../data/SiteConfig';

type Props = {
  menuLinks: { name: string; url: string }[];
};

const NavMenu: FC<Props> = ({ menuLinks }) => {
  const [isScroll, setIsScroll] = useState(false);
  const bg = useColorModeValue('gray.50', 'gray.800');
  const color = useColorModeValue('light.primary', 'dark.primary');

  useEffect(() => {
    window.addEventListener('scroll', navOnScroll);
    return () => {
      window.removeEventListener('scroll', navOnScroll);
    };
  }, []);

  const navOnScroll = () => {
    if (window.scrollY > 30) {
      setIsScroll(true);
    } else {
      setIsScroll(false);
    }
  };
  let shadow = `none`;
  if (isScroll) {
    shadow = `1px 2px 10px rgba(0, 0, 0, 0.4)`;
  }

  return (
    <>
      <Flex
        pl="4"
        justifyContent="space-between"
        alignItems="center"
        boxShadow={shadow}
        position="fixed"
        top="0"
        height="60px"
        width="100%"
        zIndex="100"
        bg={bg}
      >
        <Box>
          <Link to="/">
            <Text color={color}>{config.siteTitle}</Text>
          </Link>
        </Box>
        <Flex alignItems="center">
          <ToggleMode />
          <DrawerMenu menuLinks={menuLinks} />
        </Flex>
      </Flex>
    </>
  );
};

export default NavMenu;
