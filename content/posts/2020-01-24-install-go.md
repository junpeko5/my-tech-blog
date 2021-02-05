---
templateKey: blog-post
title: MacにGoをインストールする方法(anyenv,goenv)
date: 2020-01-24T13:34:15.945Z
description: anyenv経由でGoをインストールしていきます。Homebrewでanyenvをインストールしていない場合は、以下の記事を参考にしてください。
cover: /images/gopher.png
category: Golang
tags:
  - goenv
  - Golang
  - anyenv
  - Homebrew
slug: install-go
---
> 引用：go gophers by Renee French CC BY 3.0

anyenv経由でGoをインストールしていきます。

Homebrewでanyenvをインストールしていない場合は、以下の記事を参考にしてください。

<https://junpeko.tech/install-anyenv>

## goenvでGolangをインストール

```sh
$ anyenv install goenv
$ goenv install -l
$ goenv install 1.13.6
$ goenv global 1.13.6
```

インストールに成功したら、シェルを再起動します。

```sh
$ exec $SHELL -l
$ go version
go version go1.13.6 darwin/amd64
```

## GOPATHの設定

デフォルトで$GOPATHは`userディレクトリ/go`になるようです。

```sh
$ echo $GOPATH
/Users/username/go/1.13.6
```

`.zshrc`にGOPATHを追加しておきます。

僕の場合は、~/dev以下にプロジェクトを置いてくというルールで運用していますが、ここは任意の場所で構いません。

```sh
export GOPATH=$HOME/dev
```

<https://github.com/golang/go/wiki/SettingGOPATH#zsh>

シェルを再起動して、確認します。

```sh
$ echo $GOPATH
/Users/jun/dev
```

以上で完了です。