import { Flex, Text, Box, useColorModeValue } from '@chakra-ui/react';
import { Link } from 'gatsby';
import React, { useState, useEffect } from 'react';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import config from '../../data/SiteConfig';
import ToggleMode from './ToggleMode';

const NavMenu = ({ menuLinks }) => {
  const [isScroll, setIsScroll] = useState(false);
  const bg = useColorModeValue('gray.50', 'gray.700');
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
        px="8"
        justifyContent="space-between"
        alignItems="center"
        boxShadow={shadow}
        position="sticky"
        top="0"
        height="60px"
        zIndex="10000"
        bg={bg}
      >
        <Box>
          <Link to="/">
            <Text color={color}>{config.siteTitle}</Text>
          </Link>
        </Box>
        <Flex alignItems="center">
          {menuLinks.map((link) => {
            return (
              <Link key={link.url} to={link.url}>
                <Box mr="4" color={color}>
                  {link.name}
                </Box>
              </Link>
            );
          })}
          <ToggleMode />
        </Flex>
      </Flex>
    </>
  );
};

export default NavMenu;
