import React, { Component } from 'react';
import { navigate } from 'gatsby';
import Recaptcha from 'react-google-recaptcha';
import Helmet from 'react-helmet';
import Layout from '../layout';
import config from '../../data/SiteConfig';
import AvatarLinks from '../components/Avatar/AvatarLinks';
import { Box, Heading, Input, Textarea, Button } from '@chakra-ui/react';

const RECAPTCHA_KEY = process.env.SITE_RECAPTCHA_KEY;

function encode(data) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');
}

export default class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleRecaptcha = (value) => {
    this.setState({ 'g-recaptcha-response': value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': form.getAttribute('name'),
        ...this.state,
      }),
    })
      .then(() => navigate(form.getAttribute('action')))
      .catch((error) => alert(error));
  };

  render() {
    return (
      <Layout>
        <Helmet title={`Contact | ${config.siteTitle}`} />
        <div>
          <Heading as="h1">お問い合わせ</Heading>
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
                Don’t fill this out:{' '}
                <input name="bot-field" onChange={this.handleChange} />
              </label>
            </p>
            <Box
              fontWeight="bold"
              as="label"
              htmlFor="name"
              sx={{
                color: 'text',
              }}
            >
              名前
            </Box>
            <Input
              sx={{
                variant: 'forms.input',
              }}
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
              mb="4"
            />
            <Box
              fontWeight="bold"
              as="label"
              htmlFor="email"
              sx={{
                color: 'text',
              }}
            >
              メールアドレス
            </Box>
            <Input
              sx={{
                variant: 'forms.input',
              }}
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
              mb="4"
            />
            <Box
              fontWeight="bold"
              as="label"
              htmlFor="message"
              sx={{
                color: 'text',
              }}
            >
              お問い合わせ内容
            </Box>
            <Textarea
              sx={{
                variant: 'forms.textarea',
              }}
              name="message"
              value={this.state.message}
              onChange={this.handleChange}
              rows="6"
              mb="4"
            />
            <Recaptcha
              sitekey={RECAPTCHA_KEY}
              onChange={this.handleRecaptcha}
            />
            <Button type="submit" colorScheme="blue" my="4">
              送信
            </Button>
          </Box>
        </div>
        <AvatarLinks />
      </Layout>
    );
  }
}
