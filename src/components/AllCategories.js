import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import { Box, Flex } from '@chakra-ui/react';
import _ from 'lodash';

const AllCategories = () => {
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
    <Box
      key={cat}
      border="solid 3px"
      borderRadius="5"
      color="pink.500"
      fontSize="24"
      paddingX="2"
      paddingY="1"
      as={Link}
      to={`/categories/${_.kebabCase(cat)}/`}
      m="2"
    >
      {cat}
    </Box>
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
