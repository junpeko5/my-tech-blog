import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  List,
  ListIcon,
  ListItem,
  useColorModeValue,
} from '@chakra-ui/react';
import { VscDebugBreakpointLogUnverified } from '@react-icons/all-files/vsc/VscDebugBreakpointLogUnverified';
import { Link } from 'gatsby';
import React, { FC } from 'react';

type Props = {
  headings: GatsbyTypes.Maybe<
    readonly GatsbyTypes.Maybe<Pick<GatsbyTypes.MdxHeadingMdx, 'value'>>[]
  >;
  slug: string;
};

const TableOfContents: FC<Props> = ({ headings, slug }) => {
  const color = useColorModeValue('light.primary', 'dark.primary');
  const regex = /[()（）[\]]+/gi;
  return (
    <>
      <Box my={8}>
        <Accordion allowToggle borderTopColor={color} borderBottomColor={color}>
          <AccordionItem>
            <Box>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  目次
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </Box>
            <AccordionPanel pb={4}>
              <List>
                {headings &&
                  headings?.map((heading) => {
                    return (
                      <ListItem key={heading?.value}>
                        <Link
                          to={`${slug}/#${heading?.value?.replace(regex, '')}`}
                        >
                          <ListIcon
                            as={VscDebugBreakpointLogUnverified}
                            color={color}
                          />
                          {heading?.value}
                        </Link>
                      </ListItem>
                    );
                  })}
              </List>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>
    </>
  );
};

export default TableOfContents;
