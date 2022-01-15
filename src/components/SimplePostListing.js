import React, { Fragment } from 'react';
import { Link } from 'gatsby';
import PostHeader from './PostHeader.js';
import { Box, Heading } from '@chakra-ui/react';

class PostListing extends React.Component {
  getPostList() {
    const postList = [];
    this.props.postEdges.forEach((postEdge) => {
      postList.push({
        path: postEdge.node.fields.slug,
        tags: postEdge.node.frontmatter.tags,
        cover: postEdge.node.frontmatter.cover,
        title: postEdge.node.frontmatter.title,
        date: postEdge.node.fields.date,
        excerpt: postEdge.node.excerpt,
        timeToRead: postEdge.node.timeToRead,
        category: postEdge.node.frontmatter.category,
      });
    });
    return postList;
  }

  render() {
    const postList = this.getPostList();
    return (
      <div>
        {
          /* Your post list here. */
          postList.map((post) => (
            <Fragment key={post.title}>
              <Box>
                <Heading as="h3" size="md" color="pink.600">
                  <Link as={Link} to={post.path}>
                    {post.title}
                  </Link>
                </Heading>
                <PostHeader post={post} />
              </Box>
            </Fragment>
          ))
        }
      </div>
    );
  }
}

export default PostListing;
