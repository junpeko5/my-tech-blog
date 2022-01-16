import React from 'react';
import Helmet from 'react-helmet';
import config from '../../data/SiteConfig';
import NavMenu from '../components/NavMenu';
import { Container, useColorModeValue } from '@chakra-ui/react';
import { ColorModeScript, Box } from '@chakra-ui/react';
import theme from './../@chakra-ui/gatsby-plugin/theme';

const MainLayout = (props) => {
  const { children } = props;
  const bg = useColorModeValue('gray.50', 'black');
  const color = useColorModeValue('black', 'white');

  return (
    <Box backgroundColor={bg} color={color}>
      <Helmet>
        <meta name="description" content={config.siteDescription} />
        <html lang="en" />
      </Helmet>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <NavMenu menuLinks={config.menuLinks} />
      <Container maxWidth="container.md">
        <Box flex="1">{children}</Box>
      </Container>
    </Box>
  );
};

export default MainLayout;
