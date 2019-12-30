import { Component } from "react";
/** @jsx jsx */
import { Styled, jsx } from "theme-ui";
import { Box } from "@theme-ui/components";

class About extends Component {
  render() {
    return (
      <div>
        <Styled.h2 as="div">Hello!</Styled.h2>
        <Box p={4} color="white" bg="blue">
          Beep
        </Box>
        <h1
          sx={{
            color: "primary",
            fontFamily: "heading"
          }}
        >
          Hello
        </h1>
      </div>
    );
  }
}

export default About;
