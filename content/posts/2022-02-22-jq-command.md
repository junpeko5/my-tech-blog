---
templateKey: blog-post
title: jqコマンドをインストールする
date: 2022-02-22
description:
cover: /images/bash.png
category: ShellScript
tags:
  - ShellScript
slug: jq-command
---

## インストール

```shell
brew install jq
```

## バージョン確認

```shell
jq --version
```

僕の環境ではバージョンは`jq-1.6`と出力されました。

## ヘルプ

```shell
jq -h
```

## サンプル

```shell
echo '{"foo": 0}' | jq .
```

とすると

```json
{
  "foo": 0
}
```

上記のように整形されて出力されます。

## 参考

ここのチュートリアルをみると感じ掴めそうでした。

<https://stedolan.github.io/jq/>
