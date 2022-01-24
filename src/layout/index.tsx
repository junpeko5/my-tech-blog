import { Container, useColorModeValue, Flex } from '@chakra-ui/react';
import { ColorModeScript, Box } from '@chakra-ui/react';
import React, { FC } from 'react';
import Helmet from 'react-helmet';

import config from '../../data/SiteConfig';
import theme from '../@chakra-ui/gatsby-plugin/theme';
import Footer from '../components/Footer';
import NavMenu from '../components/NavMenu';

const MainLayout: FC = (props) => {
  const { children } = props;
  const bg = useColorModeValue('gray.50', 'gray.700');
  const color = useColorModeValue('gray.900', 'white');

  return (
    <Box bg={bg} color={color}>
      <Helmet>
        <meta name="description" content={config.siteDescription} />
        <html lang="en" />
      </Helmet>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Flex flex="1" width="100vw" minH="100vh" flexDirection="column">
        <NavMenu menuLinks={config.menuLinks} />
        <Container maxWidth="container.md" flex="1">
          {children}
        </Container>
        <Footer />
      </Flex>
    </Box>
  );
};

export default MainLayout;
