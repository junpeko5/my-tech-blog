import React from 'react';
import Helmet from 'react-helmet';
import config from '../../data/SiteConfig';
import NavMenu from '../components/NavMenu';
import { Container } from '@chakra-ui/react';
import { ColorModeScript, Box } from '@chakra-ui/react';
import theme from './../@chakra-ui/gatsby-plugin/theme';

export default class MainLayout extends React.Component {
  render() {
    const { children } = this.props;

    return (
      <Box backgroundColor="gray.50">
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
  }
}
