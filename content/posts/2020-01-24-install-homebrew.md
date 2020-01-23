---
templateKey: blog-post
title: MacにHomebrewをインストールする方法
date: 2020-01-24T12:34:15.945Z
description: 
cover: /images/apple-logo.png
category: Mac
tags:
  - zsh
slug: change-mac-zsh
---

手順は３ステップです。

1. App StoreでXcodeをインストール
2. XCode Command Line Tools をターミナルよりインストール
3. Homebrew公式からスクリプトをコピペしターミナルを実行

## App Store でXcodeをインストールします

ファイルサイズが大きいのでダウンロードに時間が結構かかります。

## XCode Command Line Toolsをインストール

App StoreでXcodeをインストールした後に以下を実行します。
```sh
$ xcode-select --install
```
## Homebrewをインストール

https://brew.sh/index_ja

Homebrewの公式にあるインストールスクリプトを実行します。

```sh
$ brew -v
Homebrew 2.2.4
```


```
$ brew -h
Example usage:
  brew search [TEXT|/REGEX/]
  brew info [FORMULA...]
  brew install FORMULA...
  brew update
  brew upgrade [FORMULA...]
  brew uninstall FORMULA...
  brew list [FORMULA...]

Troubleshooting:
  brew config
  brew doctor
  brew install --verbose --debug FORMULA

Contributing:
  brew create [URL [--no-fetch]]
  brew edit [FORMULA...]

Further help:
  brew commands
  brew help [COMMAND]
  man brew
  https://docs.brew.sh
```

```sh
$ brew install git
```

```sh
$ brew list
gettext	git	pcre2
```

```sh
$ which git
/usr/local/bin/git
```









saikido

echo $SHELL