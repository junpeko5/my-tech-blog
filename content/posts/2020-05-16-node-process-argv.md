---
templateKey: blog-post
title: Node.js環境でコマンドの引数を取得する方法
date: 2020-05-16
description: Node環境でターミナルからnodeコマンドでファイルを実行する際に、argvで取得できます。
cover: /images/nodejs.png
category: Node.js
tags:
  - Node.js
  - JavaScript
slug: node-process-argv
---

Node環境でターミナルからnodeコマンドでファイルを実行する際に、argvで取得できます。

ファイル内では、`process.argv[0]`、`process.argv[1]`、`process.argv[2]`といった形で取得でき、

例えば、コマンドラインから、`node ./import-dev-data.js --import`を実行した際に、

`--import`という文字列を受け取りたい場合は、

実行ファイル内で、`process.argv[2]`とすれば、OKです。

`process.argv[0]`だと`node`という文字列が取れます。

実行コマンドの半角スペース毎に、インデックスが0、1、2、3と設定されるということです。
