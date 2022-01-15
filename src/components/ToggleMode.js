import React from 'react';
import sun from '../images/sun.svg';
import moon from '../images/moon.svg';
import { useColorMode } from '@chakra-ui/react';

const ToggleMode = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === `Dark`;

  const nightMode = (
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

  const dayMode = (
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
  if (isDark) {
    color = `#282c35`;
  }

  return (
    <button
      onClick={toggleColorMode}
      sx={{
        bg: color,
        cursor: `pointer`,
        border: `none`,
        outline: `none`,
      }}
      title="Toggle Dark Mode"
    >
      {' '}
      {isDark ? <div>{nightMode}</div> : <div>{dayMode}</div>}
    </button>
  );
};

export default ToggleMode;
