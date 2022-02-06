---
templateKey: blog-post
title: Preztoでzshのプロンプトの見た目を変更する
date: 2020-01-23T12:34:15.945Z
description: Preztoは、zshの設定のためのフレームワークです。Preztoを利用することで簡単にターミナル環境の見た目をいい感じに変更出来ます。
cover: /images/prezto-install.png
category: macOS 
tags:
  - macOS
  - zsh
  - Prezto
slug: zsh-prezto-install
---

Preztoは、zshの設定のためのフレームワークです。Preztoを利用することで簡単にターミナル環境の見た目をいい感じに変更出来ます。

## 前提条件

デフォルトシェルはzshである必要があります。

（2020年現在macOSのデフォルトのシェルはzshのようです）

デフォルトシェルを「zsh」であるか確認する方法は以下。

```shell
echo $SHELL
/bin/zsh
```

`/bin/zsh`が帰ってくればOKです。

デフォルトシェルをzshに変更するコマンドは以下。

```shell
chsh -s /bin/zsh
```

## インストール方法

こちらが公式の情報です。

https://github.com/sorin-ionescu/prezto


### リポジトリをクローンする

ユーザーのホームディレクトリにクローンしてきます。

```shell
git clone --recursive https://github.com/sorin-ionescu/prezto.git "${ZDOTDIR:-$HOME}/.zprezto"
```

### proztoの設定


以下のコマンドをターミナルで実行します。
```shell
setopt EXTENDED_GLOB
for rcfile in "${ZDOTDIR:-$HOME}"/.zprezto/runcoms/^README.md(.N); do
  ln -s "$rcfile" "${ZDOTDIR:-$HOME}/.${rcfile:t}"
done
```

> いくつか設定ファイルが作成されるのですが、`.zshrc`などのファイルが既に作成されていると上書きされてしまいますので、
> すでに設定ファイルが有る場合は、バックアップしておき後ほど内容をマージする必要があります。

```shell
mv ~/.zshrc ~/.zshrc.backup
```

ただ、以下の設定を`.zshrc`に追加することでも対応可能とのことです。

```shell
# Preztoの読み込み
source "${ZDOTDIR:-$HOME}/.zprezto/init.zsh"

```

ターミナルを再起動すると、反映されます。

### promptコマンドのオプションを確認する

`prompt`コマンドが使えるようになってます。

コマンドの確認をしてみます。
```shell
prompt -h
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
```shell
prompt -l
```

### テーマプレビュー

すべてのテーマをプレビューできます。
```shell
prompt -p
```
-pのあとにテーマ名を設定すると指定したテーマがプレビューできます。

```shell
prompt -p agnoster
```


### テーマ変更

例
```shell
prompt -s skwp
Set and save not yet implemented.  Please ensure your ~/.zshrc
contains something similar to the following:

  autoload -Uz promptinit
  promptinit
  prompt skwp
```

以下の設定を`.zshrc`に追加する必要があるとのことなので、.zshrcの上部に追記しました。

```shell
# Preztoの読み込み
source "${ZDOTDIR:-$HOME}/.zprezto/init.zsh"

# Preztoのテーマ設定
autoload -Uz promptinit
  promptinit
  prompt cloud
```

Preztoの読み込みのあとにテーマ設定を行わなければ、上手くいかなかったので気を付けてください。



また、他の設定は、
`.zpreztorc`というファイルがあるのでコチラを編集していけば良いようです。
例えば、`'git' \`という行を追加するとプロンプトにgitの情報が表示されるようになります。


```shell
zstyle ':prezto:load' pmodule \
  'environment' \
  'terminal' \
  'editor' \
  'history' \
  'directory' \
  'spectrum' \
  'utility' \
  'git' \
  'completion' \
  'prompt'
```
<img src="/images/prompt.png" alt="prompt" class="css-9taffg" />



## おわりに

`.zpreztorc`の設定項目はたくさんあるので、色々カスタマイズのやりがいがありそうです。

現在僕は、cloudというテーマを設定して使っています。

より良い作業環境になるように色々カスタマイズしていきましょう！
