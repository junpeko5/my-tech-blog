---
templateKey: blog-post
title: gemコマンド、bundleコマンドのまとめ
date: 2021-11-06
description: 
cover: /images/ruby.png
category: Ruby
tags:
  - Ruby
slug: ruby_gem_bundler
---
  
## gemコマンドとは

Rubyをインストールすると一緒にインストールされるコマンドにgemコマンドがあります。

RubyGemsというRubyのパッケージマネージャーを扱うためのコマンドになります。

Gemコマンドで、配布用のライブラリのパッケージングやRubyGemsに登録されているgemパッケージのインストール等が行えます。

```bash
# help
gem -h
# gemコマンドでrailsをインストール
gem install rails
# アンインストール
gem uninstall rails
# RubyGemsのアップデート
gem update --system
# インストール済みの各gemをアップデート
gem update
```

## bundleコマンドとは

bundleコマンドもgemコマンドと同様、Rubyと一緒にインストールされるコマンドです。

開発中のプロジェクト内でどのgemパッケージを使っているのか、どのバージョンを利用しているのかを管理します。

```bash
# Gemfileの雛形を作成
bundle init # Gemfileを生成する
bundle update [パッケージ名] # インストール済みのgemパッケージのバージョンを更新する
bundle install # Gemfile(.lock)にかかれているgemパッケージをインストールする
bundle list # インストール済みのgemパッケージの一覧表示
bundle exec [コマンド名] # Bundlerでインストールされているgemパッケージを使用してコマンドを実行
```
