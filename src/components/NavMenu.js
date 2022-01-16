import React from 'react';
import ToggleMode from './ToggleMode';
import { Link } from 'gatsby';
import siteConfig from '../../data/SiteConfig';
import { Flex, Text, Box } from '@chakra-ui/react';

class NavMenu extends React.Component {
  state = {
    scrolled: false,
  };

  componentDidMount() {
    window.addEventListener('scroll', this.navOnScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.navOnScroll);
  }

  navOnScroll = () => {
    if (window.scrollY > 30) {
      this.setState({ scrolled: true });
    } else {
      this.setState({ scrolled: false });
    }
  };

  render() {
    const { scrolled } = this.state;
    const { menuLinks } = this.props;
    const { siteTitle } = siteConfig;

    let shadow = `none`;
    if (scrolled === true) {
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
    );
  }
}

export default NavMenu;
