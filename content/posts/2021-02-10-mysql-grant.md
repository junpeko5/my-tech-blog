---
templateKey: blog-post
title: MySQL・権限の設定
date: 2021-02-10
description: 
cover: /images/mysql.png
category: MySQL
tags:
  - MySQL
slug: mysql-grant
---

## 権限の付与、確認、削除

### SELECT権限を与える
```sql
CREATE USER 'hoge'@'localhost' IDENTIFIED BY '12345qwE$';
GRANT SELECT,UPDATE ON *.* TO 'hoge'@'localhost';
```

### アカウントの権限を確認する

```sql
SHOW GRANTS FOR hoge@localhost;
```

### 動作確認
ログアウトして`hoge`アカウントでログインし直す。

```shell
mysql -u hoge -p
```

`SELECT`可能となっている。

```sql
SELECT user, host, plugin FROM mysql.user;
+------------------+-----------+-----------------------+
| user             | host      | plugin                |
+------------------+-----------+-----------------------+
| hoge             | localhost | mysql_native_password |
| mysql.infoschema | localhost | caching_sha2_password |
| mysql.session    | localhost | caching_sha2_password |
| mysql.sys        | localhost | caching_sha2_password |
| root             | localhost | mysql_native_password |
+------------------+-----------+-----------------------+
```

`CREATE`はできないことを確認する。

```sql
CREATE USER 'junpeko'@'localhost' IDENTIFIED BY '12345qwE$';
ERROR 1227 (42000): Access denied; you need (at least one of) the CREATE USER privilege(s) for this operation
```

### 権限の削除

```sql
REVOKE SELECT ON *.* FROM hoge@localhost;
SHOW GRANTS FOR hoge@localhost;
+------------------------------------------+
| Grants for hoge@localhost                |
+------------------------------------------+
| GRANT USAGE ON *.* TO `hoge`@`localhost` |
+------------------------------------------+
```

`hoge`アカウントの`SELECT`権限が削除されました。

ちなみに、`USAGE`という権限は、そのユーザーに何も権限がないということを示します。

### （例）すべての権限を与える

```sql
CREATE USER junpeko@localhost IDENTIFIED BY 'asdfghjkL1$';
GRANT ALL ON *.* TO 'junpeko'@'localhost';
```
