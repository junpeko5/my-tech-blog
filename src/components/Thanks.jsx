import { Component } from "react";
/** @jsx jsx */
import { Styled, jsx } from "theme-ui";
import { Box } from "@theme-ui/components";

class Thanks extends Component {
  render() {
    return (
      <div>
        <h2
          sx={{
            color: "primary",
            fontFamily: "heading"
          }}
        >
          お問い合わせが送信されました。
        </h2>
      </div>
    );
  }
}

export default Thanks;
