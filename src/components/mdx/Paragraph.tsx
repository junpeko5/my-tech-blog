import { Box } from '@chakra-ui/react';
import React, { FC } from 'react';

type Props = {
  children?: string;
};

const Pre: FC<Props> = ({ children }) => {
  return (
    <>
      <Box as="p" marginY={2}>
        {children}
      </Box>
    </>
  );
};

export default Pre;
