---
templateKey: blog-post
title: MySQL権限の適用レベル
date: 2021-02-10
description: 
cover: /images/mysql.png
category: MySQL
tags:
  - MySQL
slug: mysql-grant-level
---

## 権限の適用レベル

MySQLの権限の適用レベルは6種類です。

### グローバル

`GRANT <権限> ON *.* TO hoge@localhost`としたときに設定されるレベルです。

### データベース

`GRANT <権限> ON <DB名>.* TO hoge@localhost`としたときに設定されるレベルです。

### テーブル

`GRANT <権限> ON <DB名>.<テーブル名> TO hoge@localhost`としたときに設定されるレベルです。

### カラム

`GRANT <権限> (column1, column2) ON <DB名>.<テーブル名> TO hoge@localhost`としたときに設定されるレベルです。

### ストアドルーチン

`GRANT <権限> ON FUNCTION TO hoge@localhost`、`GRANT <権限> ON PROCEDURE TO hoge@localhost`としたときに設定されるレベルです。

### プロキシユーザー

`GRANT PROXY ON 'proxied_user' TO 'proxy_user'`としたときに設定されるレベルです。

`proxied_user`が`proxy_user`の持っている権限を実行することが可能となります。