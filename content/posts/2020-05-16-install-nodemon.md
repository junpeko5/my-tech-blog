---
templateKey: blog-post
title: Node.jsアプリ開発に便利なツール、nodemonのインストール
date: 2020-05-16
description: Node.jsの開発環境で、ファイルに変更があったときに自動でサーバーを再起動してくれるツールです。
cover: /images/nodejs.png
category: Node.js
tags:
  - Node.js
  - JavaScript
  - nodemon
slug: install-nodemon
---

Node.jsの開発環境で、ファイルに変更があったときに自動でサーバーを再起動してくれるツールです。

## インストール

```sh
npm install -g nodemon
```

使い方はシンプルで、`node app.js`とするところを、`nodemon app.js`にするだけです。
