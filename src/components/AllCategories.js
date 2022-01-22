import { Box, Flex, useColorModeValue } from '@chakra-ui/react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import _ from 'lodash';
import React from 'react';

const AllCategories = () => {
  const color = useColorModeValue('light.primary', 'dark.primary');
  const { allMdx } = useStaticQuery(
    graphql`
      query AllSiteCategories {
        allMdx {
          edges {
            node {
              frontmatter {
                category
              }
            }
          }
        }
      }
    `
  );

  const { edges } = allMdx;

  const categorySet = new Set();
  // this erases the duplicates of categories that I have
  edges.forEach((element) => {
    const category = element.node.frontmatter;
    if (category.category) {
      categorySet.add(category.category);
    }
  });
  // this will pass that into an array so that I can loop
  const array = [];
  categorySet.forEach((cat) => {
    array.push(cat);
  });
  const renderCategories = array.map((cat) => (
    <Link to={`/categories/${_.kebabCase(cat)}/`} key={cat}>
      <Box
        border="solid 3px"
        borderRadius="5"
        color={color}
        fontSize="24"
        paddingX="2"
        paddingY="1"
        m="2"
      >
        {cat}
      </Box>
    </Link>
  ));

  return (
    <>
      <Flex flexWrap="wrap" justifyContent="center">
        {renderCategories}
      </Flex>
    </>
  );
};

export default AllCategories;
