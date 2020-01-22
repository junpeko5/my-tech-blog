---
templateKey: blog-post
title: Preztoでzshのプロンプトの見た目を変更する
date: 2020-01-22T12:34:15.945Z
description: Preztoは、zshの設定のためのフレームワークです。Preztoを利用することで簡単にターミナル環境の見た目をいい感じに変更出来ます。
cover: /images/prezto-install.png
category: Shell Script
tags:
  - zsh
slug: zsh-prezto-install
---

Preztoは、zshの設定のためのフレームワークです。Preztoを利用することで簡単にターミナル環境の見た目をいい感じに変更出来ます。

## 前提条件

デフォルトシェルはzshである必要があります。

（2020年現在macのデフォルトのシェルはzshのようです）

デフォルトシェルを「zsh」であるか確認する方法は以下。

```sh
$ echo $SHELL
/bin/zsh
```

`/bin/zsh`が帰ってくればOKです。

デフォルトシェルをzshに変更するコマンドは以下。

```sh
$ chsh -s /bin/zsh
```

## インストール方法

こちらが公式の情報です。

https://github.com/sorin-ionescu/prezto


### リポジトリをクローンする

ユーザーのホームディレクトリにクローンしてきます。

```sh
git clone --recursive https://github.com/sorin-ionescu/prezto.git "${ZDOTDIR:-$HOME}/.zprezto"
```

### proztoの設定


以下のコマンドをターミナルで実行します。
```sh
setopt EXTENDED_GLOB
for rcfile in "${ZDOTDIR:-$HOME}"/.zprezto/runcoms/^README.md(.N); do
  ln -s "$rcfile" "${ZDOTDIR:-$HOME}/.${rcfile:t}"
done
```

> いくつか設定ファイルが作成されるのですが、`.zshrc`などのファイルが既に作成されていると上書きされてしまいますので、
> すでに設定ファイルが有る場合は、バックアップしておき後ほど内容をマージする必要があります。

```sh
$ mv ~/.zshrc ~/.zshrc.backup
```

また`.zshrc`に以下のスクリプトを追加し、ターミナル起動時に読み込むようにします。

```sh
# Source Prezto.
if [[ -s "${ZDOTDIR:-$HOME}/.zprezto/init.zsh" ]]; then
  source "${ZDOTDIR:-$HOME}/.zprezto/init.zsh"
fi
```

ターミナルを再起動すると、反映されます。

### promptコマンドのオプションを確認する

`prompt`コマンドが使えるようになってます。

コマンドの確認をしてみます。
```sh
$ prompt -h
Usage: prompt <options>
Options:
    -c              Show currently selected theme and parameters
    -l              List currently available prompt themes
    -p [<themes>]   Preview given themes (defaults to all)
    -h [<theme>]    Display help (for given theme)
    -s <theme>      Set and save theme
    <theme>         Switch to new theme immediately (changes not saved)

Use prompt -h <theme> for help on specific themes.
```

## テーマ設定

### テーマ一覧表示
```sh
$ prompt -l
```

### テーマプレビュー

すべてのテーマをプレビューできます。
```sh
$ prompt -p
```
-pのあとにテーマ名を設定すると指定したテーマがプレビューできます。

```sh
$ prompt -p agnoster
```


### テーマ変更

例
```sh
$ prompt -s skwp
```
とやると変更されますが、シェルを起動し直すと、デフォルトに戻ってしまいました。

まだ原因がはっきりとはわかっていないのですが、コマンドではうまく切り替えられませんでした。

`.zpreztorc`というファイルがあるのでコチラを編集していきます。

```sh
zstyle ':prezto:module:prompt' theme 'powerline'
```

themeを設定している行で、powerlineという名前に変更するとテーマが反映されました。



## おわりに

`.zpreztorc`の設定項目はたくさんあるので、色々カスタマイズのやりがいがありそうです。

より良い作業環境になるように色々カスタマイズしていきます。
