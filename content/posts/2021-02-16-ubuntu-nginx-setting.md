---
templateKey: blog-post
title: Ubuntu環境でNginx、PHP環境の設定
date: 2021-02-16
description:
cover: /images/nginx.png
category: nginx
tags:
  - PHP
  - Ubuntu
  - nginx
  - DNS
slug: ubuntu-nginx-setting
---

NginxでPHPが動作する環境を作成していきます。

## 前提

- PHPがインストール済み
- nginxがインストール済み
- test.example.com（ドメイン）がサーバーのグローバルIPに設定されている

## サーバー名を指定する

Nginxのメイン設定ファイルは`/etc/nginx/nginx.conf`です。

この`nginx.conf`内では、httpブロック内で`include/etc/nginx/sitesenabled/*;`
をインクルードしています。

この`sitesenabled`は、`sites-available/default`のシンボリックリンクとなっています。

```bash
ls -li /etc/nginx/sites-enabled/
total 0
773067 lrwxrwxrwx 1 root root 34 Feb 14 13:59 default -> /etc/nginx/sites-available/default
```

`/etc/nginx/sites-available/default`内に`server`ブロックの設定が記載されています。

```bash
sudo vim /etc/nginx/sites-available/default
```

```text
root /var/www/html;
index index.html index.htm index.nginx-debian.html;
server_name _;
```

`server_name`を以下の様に変更しました。

```text
root /var/www/html;
index index.html index.htm index.nginx-debian.html;
server_name test.example.com;
```

この設定により、`test.example.com`でアクセスできるようになります。

## SSL設定

追記します。

## PHPの設定

追記します。






