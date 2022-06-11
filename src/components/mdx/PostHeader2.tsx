import { Box, Flex, useColorModeValue } from '@chakra-ui/react';
import { Heading } from '@chakra-ui/react';
import { AiOutlineLink } from '@react-icons/all-files/ai/AiOutlineLink';
import React, { FC } from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';

type Props = {
  children: string;
};

const getAnchor = (text: string) => {
  return text.toLowerCase().replace(/[ ]/g, '-');
};

const getPath = (anchorLink: string) => {
  history.pushState('', '', `${location.pathname}${anchorLink}`);
};

const PostHeader2: FC<Props> = (props) => {
  const color = useColorModeValue('light.primary', 'dark.primary');
  const anchor = getAnchor(props.children);
  const anchorLink = `#${anchor}`;
  return (
    <>
      <Heading
        id={props.children}
        as="h2"
        fontSize="xl"
        fontWeight="bold"
        marginBottom={6}
        paddingY={2}
        borderBottomWidth={2}
        borderBottomColor={color}
        paddingTop={16}
        marginTop={-30}
      >
        <Flex alignItems="center">
          <Box mr={2}>{props.children}</Box>
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-ignore*/}
          <AnchorLink
            offset="100"
            href={anchorLink}
            onClick={() => getPath(anchorLink)}
          >
            <AiOutlineLink />
          </AnchorLink>
        </Flex>
      </Heading>
    </>
  );
};

export default PostHeader2;
