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
          bg: 'orange.100',
          borderLeftWidth: 5,
          borderLeftColor: 'orange.500',
        },
        p: {
          marginY: 2,
          code: {
            borderRadius: 4,
            color: 'pink.600',
            marginX: 1,
            paddingX: 1,
            paddingY: 1,
          },
        },
        a: {
          color: 'blue',
        },
        code: {
          color: 'white',
          fontFamily: 'font-family: Monaco, monospace',
          fontSize: 'sm',
        },
        pre: {
          backgroundColor: 'black',
          borderRadius: 4,
          paddingY: 2,
          paddingX: 4,
          marginY: 2,
          overflow: 'auto',
          code: {
            boxSizing: 'border-box',
          },
        },
      },
      '.chakra-ui-dark': {
        blockquote: {
          color: 'black',
        },
      },
    },
  },
};

const theme = extendTheme(config);

export default theme;
