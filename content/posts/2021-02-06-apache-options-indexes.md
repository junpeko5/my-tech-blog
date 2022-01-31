---
templateKey: blog-post
title: Apacheでディレクトリの一覧を非表示にする方法（Option Indexes）
date: 2021-02-06
description: 
cover: /images/apache.png
category: Apache
tags:
  - Apache
  - CentOS7
slug: apache-options-indexes
---

Apacheをインストールした際のデフォルトの挙動として、
ブラウザでDirectoryIndexで指定したファイルがなかった場合には、
ディレクトリの一覧が表示されてしまいます。
セキュリティ的には好ましくないため、設定を変更します。

## 前提

- CentOS7
- Apache2.4

## 設定方法

`Options`ディレクティブで`Indexes`が指定されていると、ディレクトリの一覧が表示されます。

一覧を非表示にするには、`Indexes`を削除すればOKです。

```apacheconf
<Directory "/var/www/html">
    Options Indexes FollowSymLinks
    AllowOverride All
    Require all granted
</Directory>
```

を

```apacheconf
<Directory "/var/www/html">
    Options FollowSymLinks
    AllowOverride All
    Require all granted
</Directory>
```

に変更する。

## 設定を反映し確認

Apacheを再起動して、ブラウザで確認します。

```shell
systemctl restart httpd
```

設定後にディレクトリ一覧にアクセスしたときに、 403 ForbiddenとなればOKです。
