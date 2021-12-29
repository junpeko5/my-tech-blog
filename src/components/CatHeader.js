import React from "react";
/** @jsx jsx */
import { Themed, jsx } from "theme-ui";

const CatHeader = props => {
  const { category } = props;
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
        Post(s) category as
      </Themed.h2>
      <Themed.h3
        sx={{
          color: `primary`,
          textDecoration: `none`,
          border: `solid 1px`,
          boxSizing: `content-box`,
          display: `inline-block`,
          px: `4px`,
          borderRadius: `5px`,
          p: 1,
          mr: 2
        }}
      >
        {category}
      </Themed.h3>
    </Themed>
  );
};

export default CatHeader;
