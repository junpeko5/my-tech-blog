---
templateKey: blog-post
title: anyenvをupdateする
date: 2020-08-30
description:
cover: /images/apple-logo.png
category: Mac
tags:
  - anyenv
slug: anyenv-update
---


node.jsのLTS版である12.18.3を入れたかったのでanyenvをアップデートしました。
その際のanyenvのアップデート手順となります。

## 現状のインストール可能なバージョンを確認

```sh
nodenv install -l
...
12.10.0
12.11.0
12.11.1
12.12.0
12.13.0
12.13.1
12.14.0
12.14.1
...
```

12.14.1までしか現状ではインストールできない。。

## 方針

anyenvのプラグインである`anyenv update`を入れると`anyenv update`コマンドによりアップデートできるようになるとのこと。

## anyenv updateをインストール

```sh
mkdir -p ~/.anyenv/plugins
git clone https://github.com/znz/anyenv-update.git ~/.anyenv/plugins/anyenv-update
```

## アップデート方法

`anyenv update`コマンドが利用できるようになったため早速実行。

```sh
anyenv update
```

## 確認

```sh
nodenv install -l
...
12.14.0
12.14.1
12.15.0
12.16.0
12.16.1
12.16.2
12.16.3
12.17.0
12.18.0
12.18.1
12.18.2
12.18.3
...
```

12.18.3がインストール可能となりました。
また、その他phpenvなども更新されていますね。

## 参考

- <https://github.com/znz/anyenv-update>
