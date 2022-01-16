import React, { useState, useEffect } from 'react';
import ToggleMode from './ToggleMode';
import { Link } from 'gatsby';
import { siteTitle } from '../../data/SiteConfig';
import { Flex, Text, Box } from '@chakra-ui/react';

const NavMenu = ({ menuLinks }) => {
  const [isScroll, setIsScroll] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', navOnScroll);
  });

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
    <Flex
      height="60px"
      px="4"
      justifyContent="space-between"
      alignItems="center"
      boxShadow={shadow}
      position="sticky"
      top="0"
      zIndex="10000"
      backgroundColor="gray.50"
    >
      <Box>
        <Link to="/">
          <Text color="pink.600">{siteTitle}</Text>
        </Link>
      </Box>
      <Flex alignItems="center">
        {menuLinks.map((link) => {
          return (
            <Box mr="4" color="pink.600" key={link.url} as={Link} to={link.url}>
              {link.name}
            </Box>
          );
        })}
        <ToggleMode />
      </Flex>
    </Flex>
  );
};

export default NavMenu;
