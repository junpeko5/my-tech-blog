---
templateKey: blog-post
title: CentOS7にMysql8をインストール
date: 2021-02-03
description: 
cover: /images/mysql.png
category: MySQL
tags:
  - CentOS7
  - MySQL
slug: centos7-mysql8-install
---

## MariaDBをインストールしている場合は、削除しておく。

```shell
yum remove mariadb-libs
rm -rf /var/lib/mysql/
```

## MySQL8のインストール

```shell
sudo rpm -ivh https://dev.mysql.com/get/mysql80-community-release-el7-3.noarch.rpm
sudo yum repolist all | grep mysql
sudo yum install mysql-community-server
sudo systemctl start mysqld.service
sudo systemctl enable mysqld.service
grep 'temporary password' /var/log/mysqld.log
[Note] [MY-010454] [Server] A temporary password is generated for root@localhost: dfsdf****
```

```shell
mysql> show databases;
ERROR 1820 (HY000): You must reset your password using ALTER USER statement before executing this statement.
mysql> ALTER USER 'root'@'localhost' IDENTIFIED BY 'f********';
mysql> show databases;
```

## 認証方式の変更

Laravelを利用する場合は、MySQL8のデフォルトの認証方式（caching_sha2_password）に対応していないため、
認証方式を変更する必要があります。

vim /etc/my.cnf

```ini
default-authentication-plugin=mysql_native_password
```

```shell
sudo systemctl restart mysqld
```
