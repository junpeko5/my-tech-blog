---
templateKey: blog-post
title: anyenvをHomebrewでインストールする方法
date: 2020-01-23T22:34:15.945Z
description: anyenvをインストールすると、.phpenv、.rbenv、.nodenvなど環境ごとに新たにパッケージをインストールする必要がなくなります。
cover: /images/homebrew.png
category: macOS
tags:
  - anyenv
  - macOS
  - Homebrew
  - zsh
slug: install-anyenv
---

anyenvをインストールすると、.phpenv、.rbenv、.nodenvなど環境ごとに新たにパッケージをインストールする必要がなくなります。
今回はHomebrewでインストールしていきます。

## Homebrewでインストール

```shell
brew install anyenv
```

ターミナルで以下コマンドを実行します。
```shell
anyenv init
```

ターミナルを再起動すると、マニフェストディレクトリがないとの警告が出ます。
```
ANYENV_DEFINITION_ROOT(/Users/riywo/.config/anyenv/anyenv-install) doesn't exist. You can initialize it by:
> anyenv install --init
```

言われた通り以下を実行します。
```shell
anyenv install --init
Manifest directory doesn't exist: /Users/jun/.config/anyenv/anyenv-install
Do you want to checkout ? [y/N]: y
```
yを選択。

以上でインストール完了です。

```shell
anyenv -v
anyenv 1.1.1
```

## 使い方の例
```shell
anyenv install nodenv
exec $SHELL -l
nodenv install 13.7.0
exec $SHELL -l
node -v
v13.7.0
```