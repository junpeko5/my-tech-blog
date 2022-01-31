---
templateKey: blog-post
title: Laravel Homestead環境をプロジェクトごとに構築
date: 2021-01-01
description:
cover: /images/laravel.png
category: Laravel
tags:
  - PHP
  - Laravel
  - Homestead
  - Vagrant
slug: laravel-homestead
---

## 前提条件

- VirtualBoxとVagrantがインストールされていること。
- macOS環境

## HomesteadのVagrant Boxを追加

```shell
vagrant box add laravel/homestead
```

## hostsの設定

```shell
sudo vim /etc/hosts
```

下記を追加

```vim
192.168.10.10  homestead.test
```

## homesteadをプロジェクトにインストール

```shell
cd path/to/project
composer require laravel/homestead --dev
```

```shell
php vendor/bin/homestead make
```

上記コマンドでHomestead.yamlが生成されるので、
必要に応じてHomestead.yamlを編集する。

（例）mysql8を有効にするとmysqlのversion8系がvagrant環境にインストールされる。

```yaml
features:
    - mysql8: true
```

## vagrant環境を作成する

```shell
vagrant up
```

## vagrant環境へログインする

```shell
vagrant ssh
```

## vagrant環境でxdebugを有効にする

コマンドでxdebugのエクステンションを有効、無効を切り替えることができます。

```shell
# 有効
sudo phpenmod xdebug
# 無効
sudo phpdismod xdebug
```
