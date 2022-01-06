import React, { Component } from 'react';
import _ from 'lodash';
import { Link } from 'gatsby';
/** @jsx jsx */
import { Themed, jsx } from 'theme-ui';

class PostTags extends Component {
  render() {
    const { tags } = this.props;
    return (
      <div>
        {tags &&
          tags.map((tag) => (
            <Themed
              as={Link}
              key={tag}
              to={`/tags/${_.kebabCase(tag)}`}
              sx={{ textDecoration: `none` }}
            >
              <small
                sx={{
                  color: `text`,
                  mr: 1,
                  mb: 4,
                  boxShadow: `0px 1px 5px rgba(0, 0, 0, 0.5)`,
                  p: `3px`,
                  borderRadius: `4px`,
                }}
              >
                {tag}
              </small>
            </Themed>
          ))}
      </div>
    );
  }
}

export default PostTags;
