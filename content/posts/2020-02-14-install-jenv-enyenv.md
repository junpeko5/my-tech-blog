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

```sh
$ anyenv install jenv
$ exec $Shell -l
```

## jenvにJDKを追加する

jenvは`add`コマンドで追加することができます。

```sh
$ jenv help add
Usage: jenv add /path/to/java_home
```

java_homeのpathが必要なので、以下のコマンドで確認します。

```sh
$ /usr/libexec/java_home -V
```

今回は11をインストールしてみます。

```sh
$ jenv add /Library/Java/JavaVirtualMachines/adoptopenjdk-11.jdk/Contents/Home
```

```sh
$ jenv versions
```

`jenv versions`で追加されていればOKです。

```bash
$ jenv global 11.0.6
$ java -version
```

おしまい。
