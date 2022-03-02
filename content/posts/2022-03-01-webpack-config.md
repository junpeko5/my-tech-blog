---
templateKey: blog-post
title: webpackの設定についてのメモ
date: 2022-03-01
description:
cover: /images/npm.png
category: webpack
tags:
  - webpack
  - npm
slug: webpack-config
---

webpack.config.jsの設定メモです。

## インストール

```shell
npm install --save-dev webpack webpack-cli
```

`webpack`、`webpack-cli`をインストールすることで、webpackのコマンドが実行可能となります。

## webpackの実行

下記のコマンドでwebpack自体は実行出来ます。

```shell
node_modules/.bin/webpack --entry ./src/index.js -o dist
```

エントリーポイントのjsファイルと、生成するファイルのディレクトリを指定しています。

## Webpackの設定

また、コマンド引数ではなく、`webpack.config.js`に設定を記述することができます。

```javascript
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  devtool: 'eval-source-map',
};
```

### entry

その名の通り、entrypointを設定出来ます。

### output

生成するファイル、アウトプットするファイルのディレクトリ(path)と、ファイル名(filename)を設定しています。

### devtool

必須ではありませんが、`devtool: 'eval-source-map'`　とすることで、ソースマップファイルを生成することができます。

ビルドしたコードをオリジナルのソースのフォーマットに戻すことで、ブラウザのデバックツールを使えるようにしてくれます。

## その他

以下は例ですが、`package.json`にwebpackの実行コマンドを設定しておくと、ビルドコマンドを簡略化できます。

```json
{
  "name": "get-started-firebase",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack --mode=development"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "firebase": "^9.6.7"
  },
  "devDependencies": {
    "webpack": "^5.69.1",
    "webpack-cli": "^4.9.2"
  }
}
```

webpackの知見が溜まり次第、追記していきます。Comming Soon!!
