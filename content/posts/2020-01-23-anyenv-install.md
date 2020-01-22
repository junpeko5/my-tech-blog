---
templateKey: blog-post
title: anyenvをHomebrewでインストールする方法
date: 2020-01-23T22:34:15.945Z
description: anyenvをインストールすると、.phpenv、.rbenv、.nodenvなど環境ごとに新たにパッケージをインストールする必要がなくなります。
cover: /images/homebrew.png
category: Mac
tags:
  - Homebrew
  - zsh
slug: install-anyenv
---

anyenvをインストールすると、.phpenv、.rbenv、.nodenvなど環境ごとに新たにパッケージをインストールする必要がなくなります。
今回はHomebrewでインストールしていきます。

## Homebrewでインストール

```sh
$ brew install anyenv
```

ターミナルで以下コマンドを実行します。
```sh
$ anyenv init
```

ターミナルを再起動すると、マニフェストディレクトリがないとの警告が出る場合、以下を実行します。
```sh
$ anyenv install --init
```

## パスを追加

`~/.anyenv/bin`をパスを追加します。

```sh
$ echo 'export PATH="$HOME/.anyenv/bin:$PATH"' >> ~/.zshrc
```


## 使い方
```sh
$ anyenv install rbenv
$ anyenv install pyenv
$ anyenv install nodenv
$ exec $SHELL -l
```