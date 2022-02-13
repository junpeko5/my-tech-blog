import { Flex, useColorModeValue } from '@chakra-ui/react';
import { Heading } from '@chakra-ui/react';
import React, { FC } from 'react';

type Props = {
  children: string;
};

const PostHeader2: FC<Props> = (props) => {
  const color = useColorModeValue('light.primary', 'dark.primary');
  return (
    <>
      <Heading
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
        <Flex>
          <span>{props.children}</span>
          {/*<Link to={'/'}>*/}
          {/*  <AiOutlineLink />*/}
          {/*</Link>*/}
        </Flex>
      </Heading>
    </>
  );
};

export default PostHeader2;
