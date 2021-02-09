---
templateKey: blog-post
title: CentOS7でPHP7.3をインストールする
date: 2021-02-09
description: 
cover: /images/php.png
category: PHP
tags:
  - PHP
  - CentOS7
  - yum
slug: centos7-php73-install
---

## すでに別のバージョンのPHPがインストールされている場合はアンインストールする

```bash
yum list installed | grep php
yum remove php-7.1.33
```

## インストール
```bash
yum -y install --enablerepo=epel,remi,remi-php73 php php-cli php-common php-devel php-fpm php-gd php-mbstring php-mysqlnd php-pdo php-pear php-pecl-apcu php-soap php-xml php-xmlrpc php-intl php-pgsql php-zip
```