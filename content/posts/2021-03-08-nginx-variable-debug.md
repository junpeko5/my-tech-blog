---
templateKey: blog-post
title: Nginxの設定ファイル内で変数をデバッグする方法
date: 2021-03-07
description:
cover: /images/nginx.png
category: Nginx
tags:
  - Nginx
slug: nginx-variable-debug
---

## log_formatを指定する。

例えば、`$document_root`という変数の値を確認する方法です。

```shell
http {
  log_format debug_log_fmt "[DEBUG][$time_local] $document_root";
}
```

`log_format`を`http`内に設定します。

## access_logにlog_formatを指定する

```shell
server {
  access_log /var/log/nginx/access.log debug_log_fmt;
}
```

`server`内の`access_log`にフォーマットを指定します。

`log_format`の設定よりも後に設定しないと、`debug_log_fmt`が認識できずエラーとなります。

## 確認

`/var/log/nginx/access.log`に以下の内容が出力されます。

```shell
[DEBUG][07/Mar/2021:04:50:04 +0000] /var/www/html/path_to_document_root
```