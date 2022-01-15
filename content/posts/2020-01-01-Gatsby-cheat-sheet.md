---
templateKey: blog-post
title: Gatsby CLI チートシート
date: 2020-01-02T12:34:15.945Z
description: 新規記事をCMSから投稿テストです。
cover: /images/gatsbyBlack.png
category: Gatsby
tags:
  - Gatsby
  - JavaScript
  - React
slug: gatsby/cheat-sheet
---

Gatsbyのコマンドラインツール（Gatsby CLI）を利用すると、

Gatsbyアプリケーションを新規作成、アプリケーションのビルド、開発サーバーの起動などの機能をコマンドラインで行うことができます。

## ヘルプを表示

```bash
$ gatsby -h
or
$ gatsby --help
```
でコマンドの一覧を表示できます。

```
$ gatsby --help
Usage: gatsby <command> [options]

コマンド:
  gatsby develop                   Start development server. Watches files, rebuilds, and hot reloads if something
                                   changes
  gatsby build                     Build a Gatsby project.
  gatsby serve                     Serve previously built Gatsby site.
  gatsby info                      Get environment information for debugging and issue reporting
  gatsby clean                     Wipe the local gatsby environment including built assets and cache
  gatsby repl                      Get a node repl with context of Gatsby environment, see
                                   (https://www.gatsbyjs.org/docs/gatsby-repl/)
  gatsby new [rootPath] [starter]  Create new Gatsby project.
  gatsby plugin                    Useful commands relating to Gatsby plugins
  gatsby telemetry                 Enable or disable Gatsby anonymous analytics collection.

オプション:
  --verbose                Turn on verbose output                                           [真偽] [デフォルト: false]
  --no-color, --no-colors  Turn off the color in output                                     [真偽] [デフォルト: false]
  --json                   Turn on the JSON logger                                          [真偽] [デフォルト: false]
  -h, --help               ヘルプを表示                                                                         [真偽]
  -v, --version            Show the version of the Gatsby CLI and the Gatsby package in the current project     [真偽]
```

## Gatsbyサイトの新規作成(gatsby new)

`gatsby new` コマンドはGatsbyアプリケーションを新規作成します。

```bash
$ gatsby new [<site-name> [<starter-url>]]
```

第1引数にサイト名、第2引数にスターターのURLを設定することも出来ます。

引数なしで`gatsby new`で実行すると、対話的に実行します。

## 開発用サーバーの起動(gatsby develop)

Gatsbyアプリケーションのルートで実行し、

Gatsbyの開発用サーバーを起動します。

```bash
$ gatsby develop
```
また以下のオプションが指定できます。

 オプション | 説明 | デフォルト値
|------|------|------|
-H, --host | ホスト名の設定	| localhost
-p, --port | ポート設定	| 8000
-o, --open | デフォルトのブラウザを開く	|
-S, --https| HTTPSを利用する |        |


## 本番用のソースコードをビルドする(gatsby build)

Gatsbyアプリケーションのルートで実行し、

プロダクション用のビルドを実行します。

```bash
$ gatsby build
```

また以下のオプションが指定できます。

 オプション | 説明 | デフォルト値
|------|------|------|
--prefix-paths | gatsby-config.jsで設定したpathPrefixの値を設定する |	false
--no-uglify |	JSバンドルのバグ修正用ビルド (デバッグ用)	| false
--open-tracing-config-file | トレーサー構成ファイル (OpenTracing 互換). 詳しくは以下URL https://www.gatsbyjs.org/docs/performance-tracing/ |
--no-color, --no-colors	| ターミナルへの出力の色を無効にする |	false

## Gatsbyアプリを起動する(gatsby serve)

Gatsbyアプリケーションのルートで実行し、

`gatsby build` ビルドしたサイトを起動します。

```bash
$ gatsby serve
```

また以下のオプションが指定できます。

 オプション | 説明 | デフォルト値
|------|------|------|
-H, --host | ホスト名の設定	| localhost
-p, --port |	ポート設定	| 8000
-o, --open |	デフォルトのブラウザを開く	|
--prefix-paths |	gatsby-config.jsで設定したpathPrefixの値を設定する | false

## .cache、publicディレクトリのキャッシュを削除する（gatsby clean）

開発サーバーで何期か問題が発生したときにリフレッシュするのに役立ちます。

```bash
$ gatsby clean
```

内部でエラーが発生し、ホットリロードが止まってしまったときに実行するとうまくいくことが多かったです。

## プラグインの作り方、使い方のドキュメントを参照する（gatsby plugin doc）

ドキュメントを参照できます。

```bash
$ gatsby plugin docs

Using a plugin:
- What is a Plugin? (https://www.gatsbyjs.org/docs/what-is-a-plugin/)
- Using a Plugin in Your Site (https://www.gatsbyjs.org/docs/using-a-plugin-in-your-site/)
- What You Don't Need Plugins For (https://www.gatsbyjs.org/docs/what-you-dont-need-plugins-for/)
- Loading Plugins from Your Local Plugins Folder (https://www.gatsbyjs.org/docs/loading-plugins-from-your-local-plugins-folder/)
- Plugin Library (https://www.gatsbyjs.org/plugins/)

Creating a plugin:
- Naming a Plugin (https://www.gatsbyjs.org/docs/naming-a-plugin/)
- Files Gatsby Looks for in a Plugin (https://www.gatsbyjs.org/docs/files-gatsby-looks-for-in-a-plugin/)
- Creating a Local Plugin (https://www.gatsbyjs.org/docs/creating-a-local-plugin/)
- Creating a Source Plugin (https://www.gatsbyjs.org/docs/creating-a-source-plugin/)
- Creating a Transformer Plugin (https://www.gatsbyjs.org/docs/creating-a-transformer-plugin/)
- Submit to Plugin Library (https://www.gatsbyjs.org/contributing/submit-to-plugin-library/)
- Pixabay Source Plugin Tutorial (https://www.gatsbyjs.org/docs/pixabay-source-plugin-tutorial/)
- Maintaining a Plugin (https://www.gatsbyjs.org/docs/maintaining-a-plugin/)
- Join Discord #plugin-authoring channel to ask questions! (https://gatsby.dev/discord/)
```

## Gatsbyサイトの環境情報を表示する(Gatsby info)

Gatsbyアプリケーションのルートで実行し、

`gatsby info` でバグレポートで必要とされるような、環境情報を表示することができます。

```bash
$ gatsby info

  System:
    OS: macOS 10.15.2
    CPU: (12) x64 Intel(R) Core(TM) i9-8950HK CPU @ 2.90GHz
    Shell: 5.7.1 - /bin/zsh
  Binaries:
    Node: 13.5.0 - /usr/local/bin/node
    Yarn: 1.21.1 - /usr/local/bin/yarn
    npm: 6.13.4 - /usr/local/bin/npm
  Languages:
    Python: 2.7.10 - /Users/jun/.pyenv/shims/python
  Browsers:
    Chrome: 79.0.3945.88
    Firefox: 71.0
    Safari: 13.0.4
  npmPackages:
    gatsby: ^2.17.10 => 2.18.17 
    gatsby-image: ^2.2.23 => 2.2.37 
    gatsby-plugin-catch-links: ^2.1.12 => 2.1.21 
    gatsby-plugin-feed: ^2.3.15 => 2.3.25 
    gatsby-plugin-google-tagmanager: ^2.1.20 => 2.1.20 
    gatsby-plugin-lodash: ^3.1.10 => 3.1.18 
    gatsby-plugin-manifest: ^2.2.34 => 2.2.34 
    gatsby-plugin-mdx: ^1.0.52 => 1.0.64 
    gatsby-plugin-netlify-cms: ^4.1.33 => 4.1.33 
    gatsby-plugin-nprogress: ^2.1.9 => 2.1.17 
    gatsby-plugin-offline: ^3.0.11 => 3.0.30 
    gatsby-plugin-page-creator: ^2.1.27 => 2.1.37 
    gatsby-plugin-react-helmet: ^3.1.10 => 3.1.18 
    gatsby-plugin-sharp: ^2.3.10 => 2.3.10 
    gatsby-plugin-sitemap: ^2.2.16 => 2.2.24 
    gatsby-plugin-twitter: ^2.1.9 => 2.1.17 
    gatsby-remark-autolink-headers: ^2.1.13 => 2.1.21 
    gatsby-remark-copy-linked-files: ^2.1.23 => 2.1.33 
    gatsby-remark-images: ^3.1.25 => 3.1.39 
    gatsby-remark-prismjs: ^3.3.16 => 3.3.28 
    gatsby-remark-responsive-iframe: ^2.2.20 => 2.2.30 
    gatsby-source-filesystem: ^2.1.28 => 2.1.43 
    gatsby-transformer-remark: ^2.6.26 => 2.6.45 
    gatsby-transformer-sharp: ^2.3.9 => 2.3.9 
  npmGlobalPackages:
    gatsby-cli: 2.8.22
    gatsby-starter-advanced: 1.1.0
```

また以下のオプションが指定できます。

 オプション | 説明 | デフォルト値
|------|------|------|
-C, --clipboard	| 環境情報をクリップボードにコピーする	| false