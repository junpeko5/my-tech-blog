import React from 'react';
import sun from '../images/sun.svg';
import moon from '../images/moon.svg';
import { Box, Image, useColorMode, Link } from '@chakra-ui/react';

const ToggleMode = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDarkMode = colorMode === `dark`;

  const darkModeIcon = (
    <Box boxSize="20px">
      <Image alt="moon indicating dark mode" src={moon} role="presentation" />
    </Box>
  );

  const lightModeIcon = (
    <Box boxSize="20px">
      <Image alt="sun indicating light mode" src={sun} role="presentation" />
    </Box>
  );

  let color = `#eee`;
  if (isDarkMode) {
    color = `#282c35`;
  }

  return (
    <>
      <Link onClick={toggleColorMode} title="Toggle Dark Mode">
        {isDarkMode ? <Box>{darkModeIcon}</Box> : <Box>{lightModeIcon}</Box>}
      </Link>
    </>
  );
};

export default ToggleMode;
