---
templateKey: blog-post
title: Ubuntu環境でMySQL8.xをインストールする
date: 2021-02-19
description:
cover: /images/mysql.png
category: MySQL
tags:
  - MySQL
  - Ubuntu
  - apt
slug: ubuntu-mysql8-install
---

```shell
sudo apt update
```

## aptリポジトリよりdebファイルをダウンロードしてインストール

最新のダウンロードのリンクはここから確認してください。

> <https://dev.mysql.com/downloads/repo/apt/>

```shell
cd ~
sudo wget https://dev.mysql.com/get/mysql-apt-config_0.8.16-1_all.deb
sudo dpkg -i mysql-apt-config_0.8.16-1_all.deb
```

基本的にデフォルトでOKです。

## MySQLのインストール

```shell
sudo apt install mysql-server
```

```shell
sudo systemctl status mysql
sudo systemctl start mysql
sudo systemctl enable mysql
```

## 初期設定

```shell
sudo su
mysql_secure_installation
```

- パスワードの設定、
- 匿名ユーザーの削除、
- テストDBの削除、
- rootユーザーのリモートログインの許可
- 設定の反映

等を行います。

## 確認

設定したパスワードでログインしましょう。

```shell
# mysql -u root -p
```

```shell
mysql> show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| sys                |
+--------------------+
4 rows in set (0.01 sec)

mysql> select user,host,plugin from mysql.user;
+------------------+-----------+-----------------------+
| user             | host      | plugin                |
+------------------+-----------+-----------------------+
| debian-sys-maint | localhost | caching_sha2_password |
| mysql.infoschema | localhost | caching_sha2_password |
| mysql.session    | localhost | caching_sha2_password |
| mysql.sys        | localhost | caching_sha2_password |
| root             | localhost | auth_socket           |
+------------------+-----------+-----------------------+
5 rows in set (0.00 sec)
```