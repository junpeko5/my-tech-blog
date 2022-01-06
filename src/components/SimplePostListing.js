/** @jsx jsx */
import { Themed, jsx } from 'theme-ui';
import React, { Fragment } from 'react';
import { Link } from 'gatsby';
import PostHeader from './PostHeader.jsx';

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
              <Themed>
                <Themed.h2 sx={{ mb: `-1px` }}>
                  <Themed.a
                    as={Link}
                    to={post.path}
                    sx={{ textDecoration: `none` }}
                  >
                    {post.title}
                  </Themed.a>
                </Themed.h2>
                <PostHeader post={post} />
              </Themed>
            </Fragment>
          ))
        }
      </div>
    );
  }
}

export default PostListing;
