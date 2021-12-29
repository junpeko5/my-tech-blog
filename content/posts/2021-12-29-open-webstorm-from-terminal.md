---
templateKey: blog-post
title: WebStorm（intellij製エディタ）をターミナルから開く方法
date: 2021-12-29
description:
cover: /images/webstorm.png
category: macOS
tags:
  - WebStorm
  - PhpStorm
slug: open-webstorm-from-terminal
---

## 前提

- JetBrains ToolboxでWebStormをインストールしている
- macOS

## 概要

ToolboxアプリでコマンドラインからWebStormを開くためのスクリプトが作成できるような記載がありましたが、

イマイチ挙動が不明だったため、.zshrcにエイリアスを書く方法で解決します。

<https://pleiades.io/help/webstorm/working-with-the-ide-features-from-command-line.htmle>

## エイリアスを.zshrcに設定する

以下を`.zshrc`に追加しましょう。

```bash
alias webstorm='open -na "WebStorm.app" --args "$@"'
```

> -a : アプリケーションを指定します。
> 
> --args : 開くファイルまたはディレクトリ以外のものを渡す場合は、追加の引数を指定します。
> 
> -n : アプリケーションのインスタンスがすでに実行されている場合でも、新しいインスタンスを開きます。

また、"$@" というシェル引数を渡すと、指定されたパラメータが設定されます。

## 使い方

現在のディレクトリでWebStormを開きたい場合は、

```bash
webstorm .
```

で開くことができるようになります。

PhpStorm等の他のエディタも同様に`alias`を追加しておくと良いでしょう。

## 参考

<https://pleiades.io/help/webstorm/working-with-the-ide-features-from-command-line.htmle>