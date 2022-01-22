import { extendTheme } from '@chakra-ui/react';

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
    global: ({ colorMode }) => ({
      '.mdx-prose': {
        h2: {
          fontSize: 'xl',
          fontWeight: 'bold',
          marginY: 6,
          paddingY: 2,
          paddingX: 2,
          borderTopWidth: 5,
          borderTopColor:
            colorMode === 'dark' ? 'dark.primary' : 'light.primary',
          borderBottomWidth: 5,
          borderBottomColor:
            colorMode === 'dark' ? 'dark.primary' : 'light.primary',
        },
        h3: {
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
          bg: colorMode === 'dark' ? 'gray.600' : 'orange.100',
          borderRightRadius: 'base',
          borderLeftWidth: 5,
          borderLeftColor: colorMode === 'dark' ? 'orange.300' : 'orange.500',
        },
        p: {
          marginY: 2,
          code: {
            borderRadius: 'base',
            bgColor: colorMode === 'dark' ? 'gray.600' : 'gray.200',
            color: colorMode === 'dark' ? 'white' : 'black',
            marginX: 1,
            paddingX: 1,
            paddingY: 1,
          },
        },
        a: {
          color: colorMode === 'dark' ? 'blue.300' : 'blue',
        },
        code: {
          color: 'white',
          fontFamily: 'font-family: Monaco, monospace',
          fontSize: 'sm',
        },
        pre: {
          backgroundColor: 'black',
          borderRadius: 'base',
          paddingY: 2,
          paddingX: 4,
          marginY: 2,
          overflow: 'auto',
          code: {
            boxSizing: 'border-box',
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
