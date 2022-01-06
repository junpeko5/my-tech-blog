import { Component } from 'react';
import BigAvatar from './Avatar/BigAvatar.jsx';
/** @jsx jsx */
import { jsx } from 'theme-ui';

class About extends Component {
  render() {
    return (
      <div>
        <h1
          sx={{
            color: 'primary',
            fontFamily: 'heading',
          }}
        >
          プロフィール
        </h1>
        <section>
          <BigAvatar />
        </section>
      </div>
    );
  }
}

export default About;
