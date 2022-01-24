import {
  Box,
  Heading,
  Input,
  Textarea,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
import { navigate } from 'gatsby';
import React, { useState } from 'react';
import Recaptcha from 'react-google-recaptcha';
import Helmet from 'react-helmet';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import config from '../../data/SiteConfig';
import Layout from '../layout';

const RECAPTCHA_KEY = process.env.SITE_RECAPTCHA_KEY;

function encode(data) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');
}

const Contact = () => {
  const color = useColorModeValue('light.primary', 'dark.primary');

  const [state, setState] = useState({
    name: '',
    email: '',
    message: '',
    'g-recaptcha-response': '',
  });
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleRecaptcha = (value) => {
    setState({ ...state, 'g-recaptcha-response': value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    if (state.name === '') {
      alert('お名前を入力してください。');
      return;
    }
    if (state.email === '') {
      alert('メールアドレスを入力してください。');
      return;
    }
    if (state.message === '') {
      alert('お問い合わせ内容を入力してください。');
      return;
    }
    if (state['g-recaptcha-response'] === '') {
      alert(
        '「私はロボットではありません」のチェックボックスにチェックを入れてください。'
      );
      return;
    }
    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({
          'form-name': form.getAttribute('name'),
          ...state,
        }),
      });
      await navigate(form.getAttribute('action'));
    } catch (e) {
      alert(e);
    }
  };

  return (
    <>
      <Layout>
        <Helmet>
          <title>{`お問い合わせ | ${config.siteTitle}`}</title>
        </Helmet>
        <Box>
          <Heading as="h1" size="xl" color={color} my="32px">
            お問い合わせフォーム
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
            <Input type="hidden" name="form-name" value="contact" />
            <noscript>
              <p>This form won’t work with Javascript disabled</p>
            </noscript>
            <Box hidden>
              <label>
                Don’t fill this out:{' '}
                <Input name="bot-field" onChange={handleChange} />
              </label>
            </Box>
            <Box fontWeight="bold" as="label" htmlFor="name">
              お名前
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
        </Box>
      </Layout>
    </>
  );
};

export default Contact;
