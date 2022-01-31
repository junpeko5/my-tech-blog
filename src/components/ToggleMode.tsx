import { Box, useColorMode, Button, useColorModeValue } from '@chakra-ui/react';
import { FaMoon } from '@react-icons/all-files/fa/FaMoon';
import { FiSun } from '@react-icons/all-files/fi/FiSun';
import React, { FC } from 'react';

const ToggleMode: FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDarkMode = colorMode === `dark`;
  const bg = useColorModeValue('gray.50', 'gray.700');

  return (
    <>
      <Button onClick={toggleColorMode} title="Toggle Dark Mode" bg={bg}>
        {isDarkMode ? (
          <Box color={'gray.50'}>
            <FaMoon size={20} />
          </Box>
        ) : (
          <Box color={'gray.600'}>
            <FiSun size={20} />
          </Box>
        )}
      </Button>
    </>
  );
};

export default ToggleMode;
