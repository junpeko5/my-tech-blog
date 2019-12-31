import { Component,  } from "react";
import { navigateTo } from "gatsby-link";
import Recaptcha from "react-google-recaptcha";
import Helmet from "react-helmet";
import {
  Label,
  Box
} from "@theme-ui/components";
import Layout from "../layout";
import config from "../../data/SiteConfig";
import AvatarLinks from "../components/Avatar/AvatarLinks";

/** @jsx jsx */
import { Styled, jsx } from "theme-ui";

const RECAPTCHA_KEY = process.env.SITE_RECAPTCHA_KEY;

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

export default class Contact extends Component {
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
            <Label
              htmlFor="name"
              sx={{
                color: "text"
              }}
            >
              名前
            </Label>
            <input
              sx={{
                variant: "forms.input"
              }}
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
            <Label
              htmlFor="email"
              sx={{
                color: "text"
              }}
            >
              メールアドレス
            </Label>
            <input
              sx={{
                variant: "forms.input"
              }}
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
            <Label
              htmlFor="message"
              sx={{
                color: "text"
              }}
            >
              お問い合わせ内容
            </Label>
            <textarea
              sx={{
                variant: "forms.textarea"
              }}
              name="message"
              value={this.state.message}
              onChange={this.handleChange}
              rows="6"
            />
            <Recaptcha
              ref="recaptcha"
              sitekey={RECAPTCHA_KEY}
              onChange={this.handleRecaptcha}
            />
            <button
              type="submit"
              sx={{
                variant: "buttons.primary"
              }}
            >
              送信
            </button>
          </Box>
        </div>
        <AvatarLinks />
      </Layout>
    );
  }
}
