import { extendTheme } from '@chakra-ui/react';

const config = {
  colors: {
    pink: {
      50: '#FFF5F7',
      600: '#B83280',
    },
  },
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  styles: {
    global: {
      '.mdx-prose': {
        h2: {
          fontSize: 'xl',
          fontWeight: 'bold',
          marginY: 6,
          paddingY: 2,
          paddingX: 2,
          borderTopWidth: 5,
          borderTopColor: 'pink.100',
          borderBottomWidth: 5,
          borderBottomColor: 'pink.100',
        },
        ul: {
          marginY: 4,
          paddingLeft: 5,
        },
        blockquote: {
          marginY: 4,
          paddingY: 2,
          paddingX: 4,
          borderLeftWidth: 5,
          borderLeftColor: 'pink.600',
        },
        p: {
          marginY: 2,
          code: {
            borderRadius: 4,
            color: 'yellow.200',
            backgroundColor: 'black',
            marginX: 1,
            paddingX: 1,
          },
        },
        a: {
          color: 'blue',
        },
        code: {
          color: 'yellow.200',
          fontFamily: 'font-family: Monaco, monospace',
          fontSize: 'sm',
        },
        pre: {
          backgroundColor: 'black',
          borderRadius: 4,
          padding: 2,
        },
      },
    },
  },
};

const theme = extendTheme(config);

export default theme;
