---
templateKey: blog-post
title: SchemaSpyでER図を自動生成してみる[チュートリアル]
date: 2020-04-06
description: SchemaSpyはJava製のER図自動生成ツールです。リッチなUIでER図をリバースエンジニアリングできるので非常に重宝しています。
cover: /images/java.png
category: schemaspy
tags:
  - schemaspy
  - Java
slug: schemaspy-tutorial
---

SchemaSpyはJava製のER図自動生成ツールです。リッチなUIでER図をリバースエンジニアリングできるので非常に重宝しています。

今回は、macOS環境でこちらのツールを使ってEC-CUBE4のER図を自動生成してみたいと思います。

また、DBはpostgresを利用していきます。

<http://schemaspy.org/>

## 必須要件

必須要件として、今回はmacOS環境で実施するため、Mac環境で行う様にしてください。

Javaのバージョンは8である必要があります。

また、SchemaSpyのバージョンは`6.1.0`を利用していきます。

## SchemaSpyのインストール

まずは、GithubよりSchemaSpyの実行ファイルをダウンロードしましょう。

<https://github.com/schemaspy/schemaspy>

今回は、現在の最新バージョンであるv6.0.1をダウンロードします。

適当なディレクトリを作成し、その中にダウンロードしてきた`.jar`ファイルを移動しておきます。

```shell
mkdir ~/schemaspy
mv ~/Downloads/schemaspy-6.1.0.jar .
```

## Java8のインストール

以下URLより、Open JDK 8(LTS)をインストールします。

<https://adoptopenjdk.net/>

その後、jenvでJava8環境を利用できる様にしていきます。

> ※ jenvでJava8をいれる手順は、<https://blog.junpeko.com/install-jenv-anyenv>を参照してください。

その後、JavaのバージョンがJava8のものに変更されたことを確認してください。

```shell
java -version
openjdk version "1.8.0_242"
```

## JDBCドライバの取得

MySQLやPostgreSQLといったデータベースに接続するためにJDBCドライバというものを利用します。

MySQLであれば、<https://www.mysql.com/jp/products/connector/>

PostgreSQLであれば、<https://jdbc.postgresql.org/download.html>

よりダウンロードしてきます。

## 設定ファイルの作成

`schemaspy.properties`という名前で、SchemaSpyを実行する際に指定する設定ファイルを作成していきます。

```shell
schemaspy.t=pgsql
schemaspy.dp=postgresql-42.2.12.jar
schemaspy.host=localhost
schemaspy.port=5432
schemaspy.db=eccube4
schemaspy.u=docker
schemaspy.p=docker
schemaspy.o=output
schemaspy.s=public
```

## SchemaSpyの実行

> Mac環境で動作させる場合、READMEにはGraphvizをインストールする必要がありましたが、
> バージョン6.1.0以降、Graphvizは不要とのことです。
> コマンドライン引数`-vizjs`を指定するとOKです。

```shell
java -jar schemaspy-6.1.0.jar -configFile schemaspy.properties -vizjs
```

実行には2分程度かかります。

`output/`にファイルが生成されます。

```shell
open output/index.html
```

以下は、ER図のページです。

<img src="/images/eccube4-er.png" alt="eccube4-er" class="css-9taffg" />

今回はmacOS環境でしたが、dockerを利用した方法もあるようなので、試してみたいですね。

おしまい。
