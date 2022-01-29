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
          marginY: 6,
          paddingY: 2,
          paddingLeft: 4,
          borderLeftWidth: 5,
          borderLeftColor:
            props.colorMode === 'dark' ? 'dark.primary' : 'light.primary',
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
