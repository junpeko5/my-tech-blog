---
templateKey: blog-post
title: RubyMineでデバッグを行うための設定
date: 2021-11-06
description: 
cover: /images/ruby.png
category: Ruby
tags:
  - Ruby
  - RubyMine
slug: rubymine_debug
---
  
## 前提条件

MacOSです。

rbenvでruby 3.0.2が入っています。

```bash
ruby -v
ruby 3.0.2p107 (2021-07-07 revision 0db68f0233) [x86_64-darwin20]
```

またプロジェクトのGemfileではなくローカルの環境にデバッグするためのGemをインストールする方針とします。

## Gemをインストールする

```bash
gem install ruby-debug-ide
```

## Webサーバーを起動する

RubyMineのメニュー、Run > Debug より、開発環境のWebサーバー（Development）を起動します。

以上で、ブレイクポイントを設定し、デバッグが可能となります。

## 参考

- <https://github.com/ruby-debug/ruby-debug-ide>
- <https://pleiades.io/help/ruby/debugging-code.html>
