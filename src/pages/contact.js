import React, { useState } from 'react';
import { navigate } from 'gatsby';
import Recaptcha from 'react-google-recaptcha';
import Helmet from 'react-helmet';
import Layout from '../layout';
import config from '../../data/SiteConfig';
import { Box, Heading, Input, Textarea, Button } from '@chakra-ui/react';

const RECAPTCHA_KEY = process.env.SITE_RECAPTCHA_KEY;

function encode(data) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');
}

const Contact = (props) => {
  const [state, setState] = useState({});
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleRecaptcha = (value) => {
    setState({ ...state, 'g-recaptcha-response': value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': form.getAttribute('name'),
        ...state,
      }),
    })
      .then(() => navigate(form.getAttribute('action')))
      .catch((error) => alert(error));
  };

  return (
    <Layout>
      <Helmet>
        <title>{`お問い合わせ | ${config.siteTitle}`}</title>
      </Helmet>
      <div>
        <Heading as="h1" mb="8">
          お問い合わせ
        </Heading>
        <Box
          as="form"
          name="contact"
          method="post"
          action="/thanks/"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          data-netlify-recaptcha="true"
          onSubmit={handleSubmit}
        >
          {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
          <input type="hidden" name="form-name" value="contact" />
          <noscript>
            <p>This form won’t work with Javascript disabled</p>
          </noscript>
          <p hidden>
            <label>
              Don’t fill this out:{' '}
              <input name="bot-field" onChange={handleChange} />
            </label>
          </p>
          <Box fontWeight="bold" as="label" htmlFor="name">
            名前
          </Box>
          <Input
            type="text"
            name="name"
            value={state.name}
            onChange={handleChange}
            mb="4"
          />
          <Box fontWeight="bold" as="label" htmlFor="email">
            メールアドレス
          </Box>
          <Input
            type="email"
            name="email"
            value={state.email}
            onChange={handleChange}
            mb="4"
          />
          <Box fontWeight="bold" as="label" htmlFor="message">
            お問い合わせ内容
          </Box>
          <Textarea
            name="message"
            value={state.message}
            onChange={handleChange}
            rows="6"
            mb="4"
          />
          <Recaptcha sitekey={RECAPTCHA_KEY} onChange={handleRecaptcha} />
          <Button type="submit" colorScheme="blue" my="4">
            送信
          </Button>
        </Box>
      </div>
    </Layout>
  );
};

export default Contact;
