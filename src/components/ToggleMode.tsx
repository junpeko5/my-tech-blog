import { Box, useColorMode, Link } from '@chakra-ui/react';
import { FaMoon } from '@react-icons/all-files/fa/FaMoon';
import { FaSun } from '@react-icons/all-files/fa/FaSun';
import React, { FC } from 'react';

const ToggleMode: FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDarkMode = colorMode === `dark`;

  return (
    <>
      <Link onClick={toggleColorMode} title="Toggle Dark Mode">
        {isDarkMode ? (
          <Box color={'gray.50'}>
            <FaMoon />
          </Box>
        ) : (
          <Box color={'gray.600'}>
            <FaSun />
          </Box>
        )}
      </Link>
    </>
  );
};

export default ToggleMode;
