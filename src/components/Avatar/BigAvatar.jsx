import React from 'react';
import { Themed } from 'theme-ui';

import siteConfig from '../../../data/SiteConfig';

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
        <Themed.h1 sx={{ color: `text` }}>Hello World!!</Themed.h1>
      </div>
      <Themed.p>{avatar.description}</Themed.p>
    </>
  );
};

export default BigAvatar;
