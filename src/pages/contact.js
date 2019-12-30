import { navigateTo } from "gatsby-link";
import Recaptcha from "react-google-recaptcha";
import React, { Component } from "react";
import Helmet from "react-helmet";
import Layout from "../layout";
import About from "../components/About";
import config from "../../data/SiteConfig";
import AvatarLinks from "../components/Avatar/AvatarLinks";
import { Styled } from 'theme-ui';
import {
  Input,
  Label,
  Textarea,
  Button,
  Box
} from "@theme-ui/components";

const RECAPTCHA_KEY = process.env.SITE_RECAPTCHA_KEY;

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

export default class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleRecaptcha = value => {
    this.setState({ "g-recaptcha-response": value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": form.getAttribute("name"),
        ...this.state
      })
    })
      .then(() => navigateTo(form.getAttribute("action")))
      .catch(error => alert(error));
  };

  render() {
    return (
      <Layout>
        <Helmet title={`Contact | ${config.siteTitle}`} />
        <div>
          <Styled.h1>お問い合わせ</Styled.h1>
          <Box
            as="form"
            name="contact"
            method="post"
            action="/thanks/"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            data-netlify-recaptcha="true"
            onSubmit={this.handleSubmit}
          >
            {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
            <input type="hidden" name="form-name" value="contact" />
            <noscript>
              <p>This form won’t work with Javascript disabled</p>
            </noscript>
            <p hidden>
              <label>
                Don’t fill this out:{" "}
                <input name="bot-field" onChange={this.handleChange} />
              </label>
            </p>
            <Label>名前</Label>
            <Input
              type="text"
              name="name"
              onChange={this.handleChange}
              mb={3}
              bg="white"
            />
            <Label>メールアドレス</Label>
            <Input
              type="email"
              name="email"
              onChange={this.handleChange}
              mb={3}
              bg="white"
            />
            <Label>お問い合わせ内容</Label>
            <Textarea
              name="message"
              onChange={this.handleChange}
              rows="6"
              mb={3}
              bg="white"
            />
            <Recaptcha
              ref="recaptcha"
              sitekey={RECAPTCHA_KEY}
              onChange={this.handleRecaptcha}
            />
            <Button type="submit" mr={2}>
              送信
            </Button>
          </Box>
        </div>
        <AvatarLinks />
      </Layout>
    );
  }
}
