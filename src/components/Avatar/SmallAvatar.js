import React from "react";
import siteConfig from "../../../data/SiteConfig";
import AvatarLinks from "./AvatarLinks";

/** @jsx jsx */
import { jsx, Themed } from "theme-ui";

const SmallAvatar = props => {
  const { avatar } = siteConfig;
  const { siteTitle } = siteConfig;

  return (
    <>
      <Themed.h2
        sx={{
          mt: 5,
          color: `primary`,
          mb: 0,
          borderTop: `1px solid`,
          pt: "15px",
          textAlign: `center`
        }}
      >
        {siteTitle}
      </Themed.h2>

      <div sx={{ display: `flex`, alignItems: `center`, mb: 2, mt: 2 }}>
        <div>
          <img
            alt="small avatar"
            src={avatar.photo}
            sx={{ width: 70, height: 70, borderRadius: 999, mr: `15px` }}
          />
        </div>
        <Themed.p>{avatar.description}</Themed.p>
      </div>
      <div sx={{ textAlign: `left` }}>
        <AvatarLinks size={"small"} />
      </div>
    </>
  );
};

export default SmallAvatar;
