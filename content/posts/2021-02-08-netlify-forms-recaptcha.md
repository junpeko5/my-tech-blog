---
templateKey: blog-post
title: Netlify FormsのフォームにreCAPTCHAを設定した際のメモ（Gatsby）
date: 2021-02-08
description: 
cover: /images/gatsbyBlack.png
category: Gatsby
tags:
  - Gatsby
  - Netlify
  - reCAPTCHA
slug: netlify-forms-recaptcha
---

Gatsby製ブログにreCAPTCHAを設定した際のメモを残します。

Githubにも公開しているので、そちらも参考にしてみてください。

## 手順

- `react-google-recaptcha`をインストール
- <https://www.google.com/recaptcha/about/>で新しいサイトを登録
- 作成したサイトキーとシークレットキーをNetlifyに登録
- Netlifyでのフォーム通知設定
- Gatsbyのソースコードを修正

## react-google-recaptchaをインストール

```shell
yarn add react-google-recaptcha
```

## 新しいサイトを登録

Admin Consoleにログインして、新しいサイトを登録します。

<https://www.google.com/recaptcha>

注意点として、reCAPTCHAタイプはv2を指定する必要があります。

また、サイトキーと、シークレットキーはNetlifyに登録するので控えておきます。

## 作成したサイトキーとシークレットキーをNetlifyに登録

Netlifyの Site settings > Build & Deploy > Environment より`SITE_RECAPTCHA_KEY`と`SITE_RECAPTCHA_SECRET`
を登録します。

## Netlifyでのフォーム通知設定

Site settings > Forms > Form notification より、通知設定を行います。

Freeプランでは、emailとSlackが選べます。

emailの設定方法は特に迷うことはないです。

また、Slackとの連携方法は割愛します。（ドキュメントを確認してください。）

## Gatsbyのソースコードを修正

`.env.production`と`contact.js`を修正します。

### .env.production

`.env.production`に以下を記述します。

```ini
SITE_RECAPTCHA_KEY=<reCAPTCHAのサイトキー>
```

## contact.js

```jsx
import Recaptcha from "react-google-recaptcha";

const RECAPTCHA_KEY = process.env.SITE_RECAPTCHA_KEY;

export default class Contact extends Component {

  handleRecaptcha = value => {
    this.setState({ "g-recaptcha-response": value });
  };

  render() {
    return (
      <Layout>
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
            ... 省略　... 
            <Recaptcha
              ref="recaptcha"
              sitekey={RECAPTCHA_KEY}
              onChange={this.handleRecaptcha}
            />
              ... 省略　...
          </Box>
        </div>
        <AvatarLinks />
      </Layout>
    );
  }
}
```

reCAPTCHAの設定部だけ抜き出しています。

実装の詳細は、<https://github.com/junpeko5/my-tech-blog/blob/master/src/pages/contact.js>を確認ください。

