---
templateKey: blog-post
title: MySQLの認証について
date: 2021-02-05
description: 
cover: /images/mysql.png
category: MySQL
tags:
  - MySQL
slug: mysql-auth
---

MySQLの認証方式を紹介していきます。

## caching_sha2_password

8.0ではデフォルトの認証方式となります。

```mysql
CREATE USER junpeko@localhost IDENTIFIED WITH cacheing_sha2_password BY 'abcdeF1$';
```

デフォルト設定のままの場合、`WITH cacheing_sha2_password`は指定しなくても問題ありません。


## mysql_native_password

5.7まではデフォルトの認証方式でした。

```mysql
CREATE USER takuya@localhost IDENTIFIED WITH mysql_native_password BY 'abcdeF1$';
```

Laravelはこれにしないとマイグレーションで失敗しますね。

## auth_socket

`auth_socket`を使用すると、OSのユーザー名と同じ名前のMySQLアカウントでパスワードを
入力せずにログインできます。

例えば`vpsuser`というOSの一般ユーザーがある場合にMySQLで以下の様にユーザーを作成したとします。

```mysql
INSTALL PLUGIN auth_socket SONAME 'auth_socket.so';
CREATE USER vpsuser@localhost IDENTIFIED WITH auth_socket;
```

この場合に、`vpsuser`からは、
パスワードもホスト名も指定することなしに、mysqlにログイン出来る様になります。

※ UNIXソケットを使用した接続でのみ有効なので、
`mysqld`とクライアントが同じサーバー内でのみ接続できます。

## 設定の確認

```mysql
SELECT user, host, plugin from mysql.user;
```