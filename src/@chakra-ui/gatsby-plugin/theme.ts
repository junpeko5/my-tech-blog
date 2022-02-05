import { ColorMode, extendTheme, Theme } from '@chakra-ui/react';

type Props = {
  colorMode: ColorMode;
  theme: Theme;
};

const config = {
  colors: {
    light: {
      primary: 'var(--chakra-colors-pink-600)',
    },
    dark: {
      primary: 'var(--chakra-colors-pink-200)',
    },
    // primary: props.colorMode === 'dark' ? 'var(--chakra-colors-pink-600)' : 'var(--chakra-colors-pink-100)',
    primary: 'var(--chakra-colors-pink-600)',
  },
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  styles: {
    global: (props: Props) => ({
      '.mdx-prose': {
        h2: {
          fontSize: 'xl',
          fontWeight: 'bold',
          marginTop: 8,
          marginBottom: 6,
          paddingY: 2,
          borderBottomWidth: 2,
          borderBottomColor:
            props.colorMode === 'dark' ? 'dark.primary' : 'light.primary',
        },
        h3: {
          marginTop: 6,
          marginBottom: 4,
          paddingLeft: 4,
          borderLeftWidth: 5,
          borderLeftColor:
            props.colorMode === 'dark' ? 'dark.primary' : 'light.primary',
          fontWeight: 'bold',
          fontSize: 'lg',
        },
        h4: {
          fontWeight: 'bold',
          fontSize: 'md',
        },
        ul: {
          marginY: 4,
          paddingLeft: 5,
        },
        blockquote: {
          marginY: 4,
          paddingY: 2,
          paddingX: 4,
          bg: props.colorMode === 'dark' ? 'gray.600' : 'orange.100',
          borderRightRadius: 'base',
          borderLeftWidth: 5,
          borderLeftColor:
            props.colorMode === 'dark' ? 'orange.300' : 'orange.500',
        },
        p: {
          marginY: 2,
          code: {
            borderRadius: 'base',
            bgColor: props.colorMode === 'dark' ? 'gray.600' : 'gray.200',
            color: props.colorMode === 'dark' ? 'white' : 'black',
            marginX: 1,
          },
        },
        a: {
          color: props.colorMode === 'dark' ? 'blue.300' : 'blue',
        },
        code: {
          color: 'white',
          fontSize: 'sm',
        },
        pre: {
          backgroundColor: 'black',
          borderRadius: 'base',
        },
        '.gatsby-highlight': {
          "pre[class*='language-']": {
            position: 'relative',
            paddingY: 8,
            '&::before': {
              color: 'black',
              bg: 'gray',
              position: 'absolute',
              borderBottomRadius: 4,
              paddingX: 1,
              paddingY: 0.5,
              top: 0,
              left: 4,
              fontSize: 'sm',
            },
          },
          "pre[class*='language-shell']::before": {
            content: '"Zsh"',
            bg: 'gray.300',
          },
          "pre[class*='language-yaml']::before": {
            content: '"yaml"',
            bg: 'green.300',
          },
          "pre[class*='language-css']::before": {
            content: '"CSS"',
            bg: 'orange.300',
          },
          "pre[class*='language-php']::before": {
            content: '"PHP"',
            bg: 'blue.300',
          },
          " pre[class*='language-js']::before": {
            content: '"JavaScript"',
            bg: 'yellow.300',
          },
        },
      },
      // '.chakra-ui-dark': {
      //   blockquote: {
      //     color: 'black',
      //   },
      // },
    }),
  },
};

const theme = extendTheme(config);

export default theme;
