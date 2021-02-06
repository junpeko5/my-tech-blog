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

後ほど追記します。

```mysql

```
