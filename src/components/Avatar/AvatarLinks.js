import React from 'react';
import github from '../../images/github.svg';
import twitter from '../../images/twitter.svg';
import mail from '../../images/mail.svg';
import siteConfig from '../../../data/SiteConfig';
import { Link } from 'gatsby';
import { Image, Box, Flex, Center } from '@chakra-ui/react';

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
    <Center>
      {newUserLinks.map((element) => {
        return (
          <Flex key={element.url} mx="2">
            <a href={element.url}>
              <Image
                alt="avatar"
                src={element.icon}
                width={iconSize}
                sx={{
                  bg: `muted`,
                  borderRadius: '10px',
                  p: 1,
                  ':hover': { bg: `pink` },
                }}
              />
            </a>
          </Flex>
        );
      })}
    </Center>
  );
};
export default AvatarLinks;
