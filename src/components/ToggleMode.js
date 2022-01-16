import React from 'react';
import sun from '../images/sun.svg';
import moon from '../images/moon.svg';
import { useColorMode } from '@chakra-ui/react';

const ToggleMode = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDarkMode = colorMode === `dark`;

  const darkModeIcon = (
    <img
      alt="moon indicating dark mode"
      src={moon}
      width="20"
      height="20"
      role="presentation"
      style={{
        pointerEvents: `none`,
        margin: 4,
      }}
    />
  );

  const lightModeIcon = (
    <img
      alt="sun indicating light mode"
      src={sun}
      width="20"
      height="20"
      role="presentation"
      style={{
        pointerEvents: `none`,
        margin: 4,
      }}
    />
  );

  let color = `#eee`;
  if (isDarkMode) {
    color = `#282c35`;
  }

  return (
    <button onClick={toggleColorMode} title="Toggle Dark Mode">
      {isDarkMode ? <div>{darkModeIcon}</div> : <div>{lightModeIcon}</div>}
    </button>
  );
};

export default ToggleMode;
