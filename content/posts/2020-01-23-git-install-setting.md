---
templateKey: blog-post
title: gitをインストール時の初期設定
date: 2020-01-23T12:34:15.945Z
description: gitをインストールしたときの初期設定のメモです。`git config --global` コマンドで`~/.gitconfig`に設定を追加していきます。
cover: /images/git.png
category: Git
tags:
  - zsh
slug: git-install-setting
---

gitをインストールしたときの初期設定のメモです。
`git config --global` コマンドで`~/.gitconfig`に設定を追加していきます。

## ユーザー情報の設定

```sh
$ git config --global user.name "FirstName LastName"
$ git config --global user.email "junpeko@example.com"
```

## デフォルトのエディターはVim

```sh
$ git config --global core.editor 'vim -c "set fenc=utf-8"'
```

## カラーを設定
```sh
$ git config --global color.ui true
```

## エイリアス設定

```sh
$ git config --global alias.st status
$ git config --global alias.co commit
$ git config --global alias.br branch
$ git config --global alias.ch checkout
$ git config --global alias.graph log --pretty=format:'%Cgreen%h %Creset%cd %Cblue%cn %Cred%d %Creset%s':
$ git config --global alias.lol "log --graph --decorate --pretty=oneline --all --abbrev-commit"
```

## 設定確認

```sh
$ git config --list
```
