import React, { Component } from "react";
import Helmet from "react-helmet";
import Layout from "../layout/index.jsx";
import Thanks from "../components/Thanks.jsx";
import config from "../../data/SiteConfig";
import AvatarLinks from "../components/Avatar/AvatarLinks";

class ThanksPage extends Component {
  render() {
    return (
      <Layout>
        <Helmet title={`お問い合わせ完了 | ${config.siteTitle}`} />
          <Thanks />
        <AvatarLinks />
      </Layout>
    );
  }
}

export default ThanksPage;