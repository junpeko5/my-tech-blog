import {
  Box,
  Heading,
  Input,
  Textarea,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
import { navigate } from 'gatsby';
import React, { ChangeEvent, FC, SyntheticEvent, useState } from 'react';
import { ReCAPTCHA } from 'react-google-recaptcha';
import Helmet from 'react-helmet';

import config from '../data/SiteConfig';
import MainLayout from '../layout';

const RECAPTCHA_KEY = process.env.SITE_RECAPTCHA_KEY as string;

type EncodeType = {
  'form-name': string;
  name: string;
  email: string;
  message: string;
  'g-recaptcha-response': string;
};

function encode(data: EncodeType): string {
  return (Object.keys(data) as (keyof EncodeType)[])
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');
}

const Contact: FC = () => {
  const color = useColorModeValue('light.primary', 'dark.primary');

  const [state, setState] = useState({
    name: '',
    email: '',
    message: '',
    'g-recaptcha-response': '',
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleRecaptcha = (token: string | null) => {
    if (token === null) {
      return;
    }
    setState({ ...state, 'g-recaptcha-response': token });
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      'form-name': { value: string };
      action: { value: string };
    };

    if (target === null) {
      return;
    }

    const formName = target['form-name'].value;
    const action = target['action'].value;

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
          'form-name': formName,
          ...state,
        }),
      });
      await navigate(action);
    } catch (e) {
      alert(e);
    }
  };

  return (
    <>
      <MainLayout>
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore*/}
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
            <Input type="hidden" name="action" value="/thanks/" />
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
              rows={6}
              mb="4"
            />
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-ignore*/}
            <ReCAPTCHA sitekey={RECAPTCHA_KEY} onChange={handleRecaptcha} />
            <Button type="submit" colorScheme="blue" my="4">
              送信
            </Button>
          </Box>
        </Box>
      </MainLayout>
    </>
  );
};

export default Contact;
