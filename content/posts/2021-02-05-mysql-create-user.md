---
templateKey: blog-post
title: MySQLでのアカウントの作成、確認、編集、削除
date: 2021-02-05
description: 
cover: /images/mysql.png
category: MySQL
tags:
  - MySQL
slug: mysql-create-user
---

## アカウント作成

アカウントは`CREATE USER`コマンドで作成できます。

```shell
mysql> CREATE USER junpeko IDENTIFIED BY 'asdfghjk';
ERROR 1819 (HY000): Your password does not satisfy the current policy requirements
```

記号だけだとパスワードのポリシーに引っかかるようです。

### ポリシーの確認

```shell
mysql> show variables like 'validate_password%'
```

以下の項目が設定値としてあります。

- validate_password.check_user_name
- validate_password.dictionary_file 
- validate_password.length
- validate_password.mixed_case_count
- validate_password.number_count
- validate_password.policy
- validate_password.special_char_count

デフォルトだと、8文字以上、大文字、小文字1文字以上、数値1文字以上、記号1文字以上という設定のよう。

```shell
mysql> CREATE USER junpeko IDENTIFIED BY 'asdfghjkL1$';
Query OK, 0 rows affected (0.03 sec)
```

OK!

## アカウントの変更

`ALTER USER`でアカウントの変更が可能です。

以下は、パスワードの認証方式とパスワードを変更する場合のSQLです。

```shell
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'fs3$******';
```

## アカウントの確認

```shell
mysql> SELECT user, host FROM mysql.user;
+------------------+-----------+
| user             | host      |
+------------------+-----------+
| junpeko          | %         |
| mysql.infoschema | localhost |
| mysql.session    | localhost |
| mysql.sys        | localhost |
| root             | localhost |
+------------------+-----------+
5 rows in set (0.00 sec)
```

作成したばかりのアカウントは何も権限を持っておらず、ログインすることしかできません。

そのため権限を与える必要があります。

また（アカウント） = （ユーザー名） + （接続元【IPアドレス or ホスト名】）となります。

先程の`CREATE USER`コマンドは、接続元を指定できていなかったので`%`（ワイルドカード）となっています。

ワイルドカードの場合は、どの接続先からも接続可能です。

アカウント作成時接続を指定する場合は以下となります。

```shell
CREATE USER takuya@localhost IDENTIFIED BY 'asdfghjkL1$';
```

## アカウント削除

アカウント削除は`DROP USER`コマンドです。

削除したいアカウント名を指定します。

```shell
mysql> DROP USER junpeko;
mysql> DROP USER takuya@localhost;
```
