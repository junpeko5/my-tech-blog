import { Flex, useColorModeValue } from '@chakra-ui/react';
import { Heading } from '@chakra-ui/react';
import React, { FC } from 'react';

type Props = {
  children: string;
};

const PostHeader3: FC<Props> = (props) => {
  const color = useColorModeValue('light.primary', 'dark.primary');
  return (
    <>
      <Heading
        as="h3"
        fontSize="lg"
        fontWeight="bold"
        marginTop={6}
        marginBottom={4}
        paddingLeft={4}
        borderLeftWidth={5}
        borderLeftColor={color}
      >
        <Flex>
          <span>{props.children}</span>
        </Flex>
      </Heading>
    </>
  );
};

export default PostHeader3;
