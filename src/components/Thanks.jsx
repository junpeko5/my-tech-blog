import { Component } from "react";
/** @jsx jsx */
import { jsx } from "theme-ui";

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
