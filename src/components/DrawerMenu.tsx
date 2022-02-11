import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  Button,
  Box,
  useColorModeValue,
} from '@chakra-ui/react';
import { AiOutlineClose } from '@react-icons/all-files/ai/AiOutlineClose';
import { BiMenuAltRight } from '@react-icons/all-files/bi/BiMenuAltRight';
import { Link } from 'gatsby';
import React from 'react';
import { FC, useRef } from 'react';

type Props = {
  menuLinks: { name: string; url: string }[];
};

const DrawerMenu: FC<Props> = ({ menuLinks }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef(null);
  const color = useColorModeValue('light.primary', 'dark.primary');
  const bg = useColorModeValue('gray.50', 'gray.800');

  return (
    <>
      <Box ml={1}>
        <Button ref={btnRef} bg={bg}>
          {isOpen ? (
            <AiOutlineClose onClick={onClose} size={30} />
          ) : (
            <BiMenuAltRight onClick={onOpen} size={30} />
          )}
        </Button>
      </Box>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent bg={bg}>
          <DrawerHeader mt="60px">Menu</DrawerHeader>
          <DrawerBody>
            {menuLinks.map((link) => {
              return (
                <Link key={link.url} to={link.url}>
                  <Box my="4" color={color}>
                    {link.name}
                  </Box>
                </Link>
              );
            })}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default DrawerMenu;
