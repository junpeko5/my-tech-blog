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

## リポジトリがインストールされているか確認
```bash
yum repolist
```

## EPELリポジトリを追加

```bash
yum install epel-release
```

## Remi Repositoryを追加する

<https://rpms.remirepo.net/>でOSごとのダウンロードリンクを確認します。

```bash
yum install https://rpms.remirepo.net/enterprise/remi-release-7.rpm
```

### 更新する場合

```bash
rpm -Uvh http://rpms.famillecollet.com/enterprise/remi-release-7.rpm
```

オプションメモ
- `-U`: パッケージをアップグレードします。
- `-v`: より詳細な出力を提供します。
- `h`: パッケージをインストール時の進捗を`#`で表現します。

## インストール
```bash
yum install --enablerepo=epel,remi,remi-php73 php php-cli php-common php-devel php-fpm php-gd php-mbstring php-mysqlnd php-pdo php-pear php-pecl-apcu php-soap php-xml php-xmlrpc php-intl php-pgsql php-zip
```

オプションメモ
- `--enablerepo`: リポジトリを有効化する（複数指定可能）