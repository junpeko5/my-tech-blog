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
};

const theme = extendTheme(config);

export default theme;
