---
templateKey: blog-post
title: 名前ベースのバーチャルホスト設定（Apache）
date: 2021-02-06
description: 名前ベースのバーチャルホスト設定（Apache）を行うことにより、1つのWebサーバーで複数のサイトが運営できます。
cover: /images/apache.png
category: Apache
tags:
  - Apache
  - CentOS7
slug: apache-virtualhost
---

名前ベースのバーチャルホスト設定（Apache）を行うことにより、
1つのWebサーバーで複数のサイトが運営できます。

## 前提

- CentOS7
- Apache2.4

バーチャルホストの設定は、IPベースと名前ベースの2種類ありますが、
今回は名前ベースの設定となります。

予めDNSサーバーに設定しておいた2つのホストが割り当てられている状態で、
複数のサイトを表示出来るように設定していきます。

## DNS設定

例えば、独自ドメイン`example.com`を所有しており、

`laravel.example.com`と`eccube4.example.com`という2つのサイトを運営したい場合の設定
は以下の様になります。

(Aレコードに、`123.○○○.○○○.○○○`という値が予め設定されている想定となります)

| エントリ名 | タイプ | データ |
|----|----|----|
|@|A|123.○○○.○○○.○○○|
|laravel|CNAME|example.com.|
|eccube4|CNAME|example.com.|

example.comのDNSのゾーン設定に`CNAME`レコードを2つ追加しましょう。

## 設定方法

バーチャルホストの設定は、`<VirtualHost>`セクションディレクティブの中に記述します。

1つのWebサーバー上で1つのサイトを運営する場合は、以下のような設定となります。

（`/var/www/html/laravel/`にLaravel、`/var/www/html/eccube4`にeccube4系がインストールされている想定です。）

```apacheconf
Listen 80

<VirtualHost *:80>
  ServerAdmin root@example.com
  DocumentRoot /var/www/html/laravel/public
  ServerName laravel.example.com
  ErrorLog logs/laravel-error_log
  CustomLog logs/laravel-access_log common
  RewriteEngine on
  RewriteCond %{SERVER_NAME} =laravel.example.com
  RewriteRule ^ https://%{SERVER_NAME}%{REQUEST_URI} [END,NE,R=permanent]
</VirtualHost>
<VirtualHost *:80>
  ServerAdmin root@example.com
  DocumentRoot /var/www/html/eccube4
  ServerName eccube4.example.com
  ErrorLog logs/eccube4-error_log
  CustomLog logs/eccube4-access_log common
  RewriteEngine on
  RewriteCond %{SERVER_NAME} =eccube4.example.com
  RewriteRule ^ https://%{SERVER_NAME}%{REQUEST_URI} [END,NE,R=permanent]
</VirtualHost>
```

`<VirtualHost>`セクションディレクティブは、`<VirtualHost *:80>`となっています。

これはどのIPアドレスでも許可する設定で、IPアドレスが変わる環境ではこのような設定になります。

IPを指定する場合は、`<VirtualHost 123.○○○.○○○.○○○:80>`と指定します。

バーチャルホストの設定として必須項目となるのが、`ServerAdmin`、`DocumentRoot`、`ServerName`です。

`ServerName`はサブドメインを設定しましょう。

また、`DocumentRoot`にはアプリケーションの公開ディレクトリを指定します。

## 設定を反映

Apacheを再起動すると設定が反映されます。

```bash
apachectl restart
```