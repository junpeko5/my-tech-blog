import { Box, useColorMode, Link } from '@chakra-ui/react';
import { FaMoon } from '@react-icons/all-files/fa/FaMoon';
import { FaSun } from '@react-icons/all-files/fa/FaSun';
import React from 'react';

const ToggleMode = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDarkMode = colorMode === `dark`;

  return (
    <>
      <Link onClick={toggleColorMode} title="Toggle Dark Mode">
        {isDarkMode ? (
          <Box>
            <FaMoon />
          </Box>
        ) : (
          <Box>
            <FaSun />
          </Box>
        )}
      </Link>
    </>
  );
};

export default ToggleMode;
