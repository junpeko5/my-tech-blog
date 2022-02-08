---
templateKey: blog-post
title: Gatsby CLI チートシート
date: 2020-01-02T12:34:15.945Z
description: Gatsbyのコマンドラインツール（Gatsby CLI）を利用すると、Gatsbyアプリケーションを新規作成、アプリケーションのビルド、開発サーバーの起動などの機能をコマンドラインで行うことができます。
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

```shell
gatsby -h
# または
gatsby --help
```
でコマンドの一覧を表示できます。

```
gatsby --help
Usage: gatsby <command> [options]

コマンド:
  gatsby develop                      Start development server. Watches files, rebuilds, and hot reloads if something
                                      changes
  gatsby build                        Build a Gatsby project.
  gatsby serve                        Serve previously built Gatsby site.
  gatsby info                         Get environment information for debugging and issue reporting
  gatsby clean                        Wipe the local gatsby environment including built assets and cache
  gatsby repl                         Get a node repl with context of Gatsby environment, see
                                      (https://www.gatsbyjs.com/docs/gatsby-repl/)
  gatsby plugin <cmd> [plugins...]    Useful commands relating to Gatsby plugins
  gatsby new [rootPath] [starter]     Create new Gatsby project.
  gatsby telemetry                    Enable or disable Gatsby anonymous analytics collection.
  gatsby options [cmd] [key] [value]  View or set your gatsby-cli configuration settings.

オプション:
  --verbose                Turn on verbose output                                            [真偽] [デフォルト: false]
  --no-color, --no-colors  Turn off the color in output                                      [真偽] [デフォルト: false]
  --json                   Turn on the JSON logger                                           [真偽] [デフォルト: false]
  -h, --help               ヘルプを表示                                                                          [真偽]
  -v, --version            Show the version of the Gatsby CLI and the Gatsby package in the current project      [真偽]
```

## Gatsbyサイトの新規作成(gatsby new)

`gatsby new` コマンドはGatsbyアプリケーションを新規作成します。

```shell
gatsby new [<site-name> [<starter-url>]]
```

第1引数にサイト名、第2引数にスターターのURLを設定することも出来ます。

引数なしで`gatsby new`で実行すると、対話的に実行します。

## 開発用サーバーの起動(gatsby develop)

Gatsbyアプリケーションのルートで実行し、

Gatsbyの開発用サーバーを起動します。

```shell
gatsby develop
```
また以下のオプションが指定できます。

| オプション       | 説明             | デフォルト値    |
|-------------|----------------|-----------|
| -H, --host  | ホスト名の設定	       | localhost |
| -p, --port  | ポート設定	         | 8000      |
| -o, --open  | デフォルトのブラウザを開く	 |           |
| -S, --https | HTTPSを利用する     |           |


## 本番用のソースコードをビルドする(gatsby build)

Gatsbyアプリケーションのルートで実行し、

プロダクション用のビルドを実行します。

```shell
gatsby build
```

また以下のオプションが指定できます。

| オプション                      | 説明                                                                                         | デフォルト値 |
|----------------------------|--------------------------------------------------------------------------------------------|--------|
| --prefix-paths             | gatsby-config.jsで設定したpathPrefixの値を設定する                                                     | 	false |
| --no-uglify                | 	JSバンドルのバグ修正用ビルド (デバッグ用)	                                                                  | false  |
| --open-tracing-config-file | トレーサー構成ファイル (OpenTracing 互換). 詳しくは以下URL https://www.gatsbyjs.org/docs/performance-tracing/ |        |
| --no-color, --no-colors	   | ターミナルへの出力の色を無効にする                                                                          | 	false |

## Gatsbyアプリを起動する(gatsby serve)

Gatsbyアプリケーションのルートで実行し、

`gatsby build` ビルドしたサイトを起動します。

```shell
gatsby serve
```

また以下のオプションが指定できます。

| オプション          | 説明                                      | デフォルト値    |
|----------------|-----------------------------------------|-----------|
| -H, --host     | ホスト名の設定	                                | localhost |
| -p, --port     | 	ポート設定	                                 | 8000      |
| -o, --open     | 	デフォルトのブラウザを開く	                         |           |
| --prefix-paths | 	gatsby-config.jsで設定したpathPrefixの値を設定する | false     |

## .cache、publicディレクトリのキャッシュを削除する（gatsby clean）

開発サーバーで何期か問題が発生したときにリフレッシュするのに役立ちます。

```shell
gatsby clean
```

内部でエラーが発生し、ホットリロードが止まってしまったときに実行するとうまくいくことが多かったです。

## プラグインの作り方、使い方のドキュメントを参照する（gatsby plugin doc）

ドキュメントを参照できます。

```shell
gatsby plugin docs
```

## Gatsbyサイトの環境情報を表示する(Gatsby info)

Gatsbyアプリケーションのルートで実行し、

`gatsby info` でバグレポートで必要とされるような、環境情報を表示することができます。

```shell
gatsby info
```

また以下のオプションが指定できます。

| オプション            | 説明                  | デフォルト値 |
|------------------|---------------------|--------|
| -C, --clipboard	 | 環境情報をクリップボードにコピーする	 | false  |