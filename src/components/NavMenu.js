import React, { useState, useEffect } from 'react';
import ToggleMode from './ToggleMode';
import { Link } from 'gatsby';
import { siteTitle } from '../../data/SiteConfig';
import { Flex, Text, Box, useColorModeValue } from '@chakra-ui/react';

const NavMenu = ({ menuLinks }) => {
  const [isScroll, setIsScroll] = useState(false);
  const bg = useColorModeValue('gray.50', 'gray.700');

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
            <Text color="pink.600">{siteTitle}</Text>
          </Link>
        </Box>
        <Flex alignItems="center">
          {menuLinks.map((link) => {
            return (
              <Box
                mr="4"
                color="pink.600"
                key={link.url}
                as={Link}
                to={link.url}
              >
                {link.name}
              </Box>
            );
          })}
          <ToggleMode />
        </Flex>
      </Flex>
    </>
  );
};

export default NavMenu;
