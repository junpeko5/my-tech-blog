import React from "react";
/** @jsx jsx */
import { Themed, jsx } from "theme-ui";

const TagHeader = props => {
  const { tag } = props;
  return (
    <Themed
      sx={{
        display: `flex`,
        textAlign: `center`,
        alignItems: `baseline`,
        borderBottom: `1px solid`,
        color: `primary`
      }}
    >
      <Themed.h2 sx={{ color: `primary`, fontSize: `10`, mr: 2 }}>
        Post(s) tagged as
      </Themed.h2>
      <Themed.h3
        sx={{
          color: `text`,
          mr: 1,
          boxShadow: `0px 1px 5px rgba(0, 0, 0, 0.5)`,
          p: `5px`,
          borderRadius: `4px`,
          boxSizing: `content-box`
        }}
      >
        {tag}
      </Themed.h3>
    </Themed>
  );
};

export default TagHeader;
