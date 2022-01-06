import React from 'react';
import github from '../../images/github.svg';
import twitter from '../../images/twitter.svg';
import mail from '../../images/mail.svg';
import siteConfig from '../../../data/SiteConfig';
/** @jsx jsx */
import { jsx } from 'theme-ui';

const icons = [
  { label: 'twitter', icon: twitter },
  { label: 'github', icon: github },
  { label: 'email', icon: mail },
];

const AvatarLinks = (props) => {
  const { userLinks } = siteConfig;
  const { size } = props;

  const newUserLinks = [];
  icons.forEach((element) => {
    const { icon } = element;
    userLinks.forEach((link) => {
      const { label } = link;
      const { url } = link;
      if (label === element.label) {
        newUserLinks.push({
          label: label,
          url: url,
          icon: icon,
        });
      }
    });
  });

  let iconSize = '30px';
  if (size === 'small') {
    iconSize = '20px';
  }

  return (
    <div sx={{ margin: `auto`, textAlign: `center`, display: `table` }}>
      <div sx={{ display: `flex` }}>
        {newUserLinks.map((element) => {
          return (
            <div key={element.url} sx={{ mx: 2 }}>
              <a href={element.url}>
                <img
                  alt="avatar"
                  src={element.icon}
                  sx={{
                    width: iconSize,
                    bg: `muted`,
                    borderRadius: '10px',
                    p: 1,
                    ':hover': { bg: `pink` },
                  }}
                />
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default AvatarLinks;
