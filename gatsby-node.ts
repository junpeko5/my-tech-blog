import path from 'path';
import { createFilePath } from 'gatsby-source-filesystem';
import _ from 'lodash';
import moment from 'moment';
import { GatsbyNode } from 'gatsby';
import siteConfig from './data/SiteConfig';
import './src/__generated__/gatsby-types';

export const onCreateNode: GatsbyNode['onCreateNode'] = ({
  node,
  actions,
  getNode,
}) => {
  const { createNodeField } = actions;
  if (node.internal.type === 'Mdx') {
    const value = createFilePath({ node, getNode });
    if (
      Object.prototype.hasOwnProperty.call(node, 'frontmatter') &&
      Object.prototype.hasOwnProperty.call(node.frontmatter, 'title')
    ) {
      createNodeField({
        // Name of the field you are adding
        name: 'slug',
        // Individual MDX node
        node,
        // Generated value based on filepath with "blog" prefix. you
        // don't need a separating "/" before the value because
        // createFilePath returns a path with the leading "/".

        value: `/${_.kebabCase(
          (node.frontmatter as Record<string, string>).title
        )}`,
      });
    } else {
      createNodeField({
        // Name of the field you are adding
        name: 'slug',
        // Individual MDX node
        node,
        // Generated value based on filepath with "blog" prefix. you
        // don't need a separating "/" before the value because
        // createFilePath returns a path with the leading "/".
        value: `/blog${value}`,
      });
    }
  }
  let slug;
  if (node.internal.type === 'Mdx') {
    if (typeof node.parent !== 'string') {
      return;
    }
    const fileNode = getNode(node.parent);
    if (typeof fileNode === 'undefined') {
      return;
    }
    const parsedFilePath = path.parse(fileNode.relativePath as string);
    if (
      Object.prototype.hasOwnProperty.call(node, 'frontmatter') &&
      Object.prototype.hasOwnProperty.call(node.frontmatter, 'title')
    ) {
      slug = `/${_.kebabCase(
        (node.frontmatter as Record<string, string>).title
      )}`;
    } else if (parsedFilePath.name !== 'index' && parsedFilePath.dir !== '') {
      slug = `/${parsedFilePath.dir}/${parsedFilePath.name}/`;
    } else if (parsedFilePath.dir === '') {
      slug = `/${parsedFilePath.name}/`;
    } else {
      slug = `/${parsedFilePath.dir}/`;
    }

    if (Object.prototype.hasOwnProperty.call(node, 'frontmatter')) {
      if (Object.prototype.hasOwnProperty.call(node.frontmatter, 'slug')) {
        slug = `/${_.kebabCase(
          (node.frontmatter as Record<string, string>).slug
        )}`;
      }
      if (Object.prototype.hasOwnProperty.call(node.frontmatter, 'date')) {
        const date = moment(
          (node.frontmatter as Record<string, string>).date,
          siteConfig.dateFromFormat
        );
        if (!date.isValid)
          console.warn(`WARNING: Invalid date.`, node.frontmatter);

        createNodeField({
          node,
          name: 'date',
          value: date.toISOString(),
        });
      }
    }
    createNodeField({ node, name: 'slug', value: slug });
  }
};

export const createPages: GatsbyNode['createPages'] = async ({
  graphql,
  actions,
}) => {
  const { createPage } = actions;
  const postPage = path.resolve('src/templates/post.tsx');
  const tagPage = path.resolve('src/templates/tag.tsx');
  const categoryPage = path.resolve('src/templates/category.tsx');

  const markdownQueryResult = await graphql<GatsbyTypes.IndexQueryQuery>(`
    query IndexQueryQuery {
      allMdx {
        edges {
          node {
            fields {
              slug
              date
            }
            frontmatter {
              title
              tags
              category
              date
            }
          }
        }
      }
    }
  `);
  if (markdownQueryResult.errors) {
    console.error(markdownQueryResult.errors);
    throw markdownQueryResult.errors;
  }

  const tagSet = new Set();
  const categorySet = new Set();

  const postsEdges = markdownQueryResult.data?.allMdx.edges;

  // graphqlの取得時にソートすべき？
  // @ts-ignore
  postsEdges?.sort((postA, postB) => {
    const dateA = moment(
      postA.node.frontmatter.date,
      siteConfig.dateFromFormat
    );

    const dateB = moment(
      postB.node.frontmatter.date,
      siteConfig.dateFromFormat
    );

    if (dateA.isBefore(dateB)) return 1;
    if (dateB.isBefore(dateA)) return -1;

    return 0;
  });

  postsEdges?.forEach((edge, index) => {
    if (edge.node.frontmatter?.tags) {
      edge.node.frontmatter.tags.forEach((tag) => {
        tagSet.add(tag);
      });
    }

    if (edge.node.frontmatter?.category) {
      categorySet.add(edge.node.frontmatter.category);
    }

    const nextID =
      index + 1 < (typeof postsEdges !== 'undefined' && postsEdges.length)
        ? index + 1
        : 0;
    const prevID = index - 1 >= 0 ? index - 1 : 0;
    const nextEdge = postsEdges[nextID];
    const prevEdge = postsEdges[prevID];

    createPage({
      path: edge.node.fields?.slug || 'blog' + index,
      component: postPage,
      context: {
        slug: edge.node.fields?.slug,
        nexttitle: nextEdge.node.frontmatter?.title,
        nextslug: nextEdge.node.fields?.slug,
        prevtitle: prevEdge.node.frontmatter?.title,
        prevslug: prevEdge.node.fields?.slug,
      },
    });
  });

  tagSet.forEach((tag) => {
    createPage({
      path: `/tags/${_.kebabCase(tag as string)}/`,
      component: tagPage,
      context: {
        tag,
      },
    });
  });
  categorySet.forEach((category) => {
    createPage({
      path: `/categories/${_.kebabCase(category as string)}/`,
      component: categoryPage,
      context: {
        category,
      },
    });
  });
};
