---
templateKey: blog-post
title: Ubuntu環境でMySQLをアンインストールする
date: 2021-02-20
description:
cover: /images/mysql.png
category: MySQL
tags:
  - MySQL
  - Ubuntu
  - apt
slug: ubuntu-mysql-uninstall
---

UbuntuでMySQLの設定ファイルごと削除する方法です。

```shell
sudo apt remove --purge mysql-server
sudo apt purge mysql-server
sudo apt autoremove
sudo apt autoclean
sudo apt remove dbconfig-mysql
```

