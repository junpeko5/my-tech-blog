/** @jsx jsx */
import { Styled, jsx } from "theme-ui";

import siteConfig from "../../../data/SiteConfig";

const BigAvatar = () => {
  const { avatar } = siteConfig;

  return (
    <>
      <div sx={{ textAlign: `center` }}>
        <img
          src={avatar.photo}
          alt="profileImage"
          sx={{ width: 100, borderRadius: 999 }}
        />
        <Styled.h1 sx={{ color: `text` }}>
          Hello World!!
        </Styled.h1>
      </div>
      <Styled.p>{avatar.description}</Styled.p>
    </>
  );
};

export default BigAvatar;
