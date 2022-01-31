---
templateKey: blog-post
title: anyenvでjenvをインストールする
date: 2020-02-15
description:
cover: /images/java.png
category: anyenv
tags:
  - anyenv
  - jenv
  - Java
slug: install-jenv-anyenv
---

## JDKのインストール

JDKをインストールする必要があります。

以下より、必要なバージョンを選んでインストールします。

<https://adoptopenjdk.net/>

## jenvのインストール

anyenvでjenvをインストールしましょう。

```shell
$ anyenv install jenv
$ exec $Shell -l
```

## jenvにJDKを追加する

jenvは`add`コマンドで追加することができます。

```shell
$ jenv help add
Usage: jenv add /path/to/java_home
```

java_homeのpathが必要なので、以下のコマンドで確認します。

```shell
$ /usr/libexec/java_home -V
```

今回は11をインストールしてみます。

```shell
$ jenv add /Library/Java/JavaVirtualMachines/adoptopenjdk-11.jdk/Contents/Home
```

```shell
$ jenv versions
```

`jenv versions`で追加されていればOKです。

```shell
$ jenv global 11.0.6
$ java -version
```

おしまい。
