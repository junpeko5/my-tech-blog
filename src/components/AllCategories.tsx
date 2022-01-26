import { Box, Flex, useColorModeValue } from '@chakra-ui/react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import _ from 'lodash';
import React, { FC } from 'react';

const AllCategories: FC = () => {
  const color = useColorModeValue('light.primary', 'dark.primary');
  const { allMdx } = useStaticQuery<GatsbyTypes.AllSiteCategoriesQuery>(
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
  const categorySet = new Set<string>();

  // 重複したカテゴリがある場合、重複を除くためにSetオブジェクトに追加する
  edges.forEach((element) => {
    const category = element.node.frontmatter;
    if (category?.category) {
      categorySet.add(category.category);
    }
  });

  const array: string[] = [];
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
