import prism from "@theme-ui/prism/presets/oceanic-next";

const grey90 = `#232129`;
const black80 = `#1B1F23`;
const white = `#fff`;
const lightWhite = `rgba(255, 255, 255, 0.86)`;
const opaqueLightYellow = `rgba(255, 229, 100, 0.2)`;
const opaqueLightWhite = `hsla(0, 0%, 100%, 0.2)`;
const darkPink = `#d23669`;
const pink = `pink`;
const blueGray = `#282c35`;
const lightblue = `#a5a4a6`;
const lightGray = "#eee";
const gray = `#CCCCCC`;
const darkGray = `#3e3c42`;

export default {
  // theme
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  sizes: {
    container: 710
  },
  fonts: {
    body: "system-ui, sans-serif",
    monospace: '"Roboto Mono", Menlo, monospace'
  },
  lineHeights: {
    body: 1.625,
    heading: 1.25
  },
  fontWeights: {
    body: 400,
    heading: 800,
    bold: 700
  },
  fontSizes: [14, 16, 18, 20, 24, 32, 48, 64, 72, 96],
  letterSpacing: {
    body: "normal",
    caps: "0.2em"
  },
  // styles
  styles: {
    root: {
      fontFamily: `body`
    },
    pre: {
      variant: `prism`,
      fontFamily: `monospace`,
      fontSize: `14px`,
      hyphens: `none`,
      marginBottom: 3,
      color: darkPink,
      bg: `prism.background`,
      overflow: `auto`,
      borderRadius: 5,
      p: 3,
      boxShadow: `1px 2px 10px rgba(0, 0, 0, 0.5)`
    },
    code: {
      fontFamily: `monospace`
    },
    inlineCode: {
      borderRadius: `0.3em`,
      bg: `muted`,
      p: `0.3em`
    },
    // from typography overrideThemeStyles
    h1: {
      fontSize: 32,
      fontFamily: "heading",
      fontWeight: "heading",
      color: "primary",
      mt: 4,
      mb: 4
    },
    a: {
      color: `primary`
    },
    p: {
      fontWeight: `body`,
      lineHeight: `body`,
      letterSpacing: `body`
    },
    li: {
      fontSize: `body`,
      fontWeight: `body`,
      lineHeight: `body`,
      letterSpacing: `body`
    },
    blockquote: {
      color: `inherit`,
      borderLeft: `solid 5px`,
      paddingLeft: `10px`,
      borderColor: `primary`,
      opacity: 0.8,
      fontStyle: `italic`
    },
    label: {
      fontWeight: "bold"
    }
  },
  // Colors
  colors: {
    text: blueGray,
    background: lightGray,
    primary: darkPink,
    secondary: black80,
    muted: gray,
    highlight: opaqueLightYellow,
    heading: grey90,
    formBackground: white,
    prism: {
      background: `#011627`
    },
    modes: {
      dark: {
        text: lightWhite,
        background: blueGray,
        primary: pink,
        secondary: lightWhite,
        muted: opaqueLightWhite,
        highlight: lightblue,
        heading: white,
        formBackground: darkGray
      }
    }
  },
  prism,
  buttons: {
    primary: {
      appearance: "none",
      display: "inline-block",
      textAlign: "center",
      lineHeight: "inherit",
      textDecoration: "none",
      fontSize: "inherit",
      fontWeight: "bold",
      m: 2,
      px: 3,
      py: 2,
      border: 0,
      borderRadius: 4,
      color: "text",
      bg: "muted",
      "&:hover": {
        bg: `pink`
      }
    }
  },
  forms: {
    label: {
      fontSize: 1,
      fontWeight: "bold"
    },
    input: {
      boxSizing: "border-box",
      margin: `0 0 16px 0`,
      minWidth: 0,
      display: "block",
      width: "100%",
      padding: `8px`,
      fontSize: `inherit`,
      lineHeight: `inherit`,
      border: `1px, solid`,
      borderRadius: `4px`,
      borderColor: "blue",
      color: `inherit`,
      bg: "formBackground",
      "&:focus": {
        borderColor: "primary",
        boxShadow: t => `0 0 0 2px ${t.colors.primary}`,
        outline: "none"
      }
    },
    select: {
      borderColor: "gray",
      "&:focus": {
        borderColor: "primary",
        boxShadow: t => `0 0 0 2px ${t.colors.primary}`,
        outline: "none"
      }
    },
    textarea: {
      loxSizing: "border-box",
      margin: `0 0 16px 0`,
      minWidth: 0,
      display: "block",
      width: "100%",
      padding: `8px`,
      fontSize: `inherit`,
      lineHeight: `inherit`,
      border: `1px, solid`,
      borderRadius: `4px`,
      borderColor: "blue",
      color: `inherit`,
      bg: "formBackground",
      "&:focus": {
        borderColor: "primary",
        boxShadow: t => `0 0 0 2px ${t.colors.primary}`,
        outline: "none"
      }
    },
    slider: {
      bg: "muted"
    }
  }
};
