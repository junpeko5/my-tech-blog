import React from 'react';
import { FaSun } from '@react-icons/all-files/fa/FaSun';
import { FaMoon } from '@react-icons/all-files/fa/FaMoon';
import { Box, useColorMode, Link } from '@chakra-ui/react';

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
