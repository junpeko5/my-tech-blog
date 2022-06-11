import { Container, useColorModeValue, Flex } from '@chakra-ui/react';
import { ColorModeScript, Box } from '@chakra-ui/react';
import { MDXProvider, MDXProviderComponents } from '@mdx-js/react';
import React, { FC } from 'react';
import Helmet from 'react-helmet';

import theme from '../@chakra-ui/gatsby-plugin/theme';
import Footer from '../components/Footer';
import CodeBlock from '../components/mdx/CodeBlock';
import Paragraph from '../components/mdx/Paragraph';
import PostHeader2 from '../components/mdx/PostHeader2';
import PostHeader3 from '../components/mdx/PostHeader3';
import Pre from '../components/mdx/Pre';
import NavMenu from '../components/NavMenu';
import config from '../data/SiteConfig';

type Props = {
  children: React.ReactNode;
};

const MainLayout: FC<Props> = (props) => {
  const { children } = props;
  const bg = useColorModeValue('gray.50', 'gray.800');
  const color = useColorModeValue('gray.900', 'white');
  const components: MDXProviderComponents = {
    h2: PostHeader2,
    h3: PostHeader3,
    pre: (props) => <Pre {...props} />,
    code: CodeBlock,
    p: Paragraph,
  };

  return (
    <MDXProvider components={components}>
      <Box bg={bg} color={color}>
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore*/}
        <Helmet>
          <meta name="description" content={config.siteDescription} />
          <html lang="ja" />
        </Helmet>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Flex flex="1" width="100vw" minH="100vh" flexDirection="column">
          <NavMenu menuLinks={config.menuLinks} />
          <Container maxWidth="container.md" flex="1" mt="60px" px="8" py="8">
            {children}
          </Container>
          <Footer />
        </Flex>
      </Box>
    </MDXProvider>
  );
};

export default MainLayout;
