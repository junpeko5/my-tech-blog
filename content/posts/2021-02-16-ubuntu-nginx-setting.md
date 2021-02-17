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

### snapdのインストール

snapdをインストールし、クラシックスナップサポートを有効にする必要がある。
（snap install --classic certbot）を実行するために、`snapd`をインストールする

> snapとは、Ubuntuではディストリビューションをまたいで利用できるユニバーサルパッケージシステム

```bash
sudo apt update
sudo apt install snapd
```

### snapdのバージョンが最新であることを確認
```bash
sudo snap install core; sudo snap refresh core
```

### 

※ すでに、certbot-auto等のCertbot OSパッケージをインストールしている場合は削除してください。

```bash
apt remove パッケージ名
```

以下のコマンドで`Certbot`がインストールされます。

```bash
sudo snap install --classic certbot
```

### certbotコマンドを利用しやすくするため、シンボリックリンクを作成

```bash
sudo ln -s /snap/bin/certbot /usr/bin/certbot
```

### Certbotの実行

```bash
sudo certbot --nginx
```

```bash
   /etc/letsencrypt/live/junpeko.tech/fullchain.pem
   Your key file has been saved at:
   /etc/letsencrypt/live/junpeko.tech/privkey.pem
```

`/etc/letsencrypt/live/junpeko.tech/fullchain.pem`
と
`/etc/letsencrypt/live/junpeko.tech/privkey.pem`
が設置されます。

```bash
sudo vim /etc/nginx/sites-available/default
```
Certbotにより、以下が追記されていました。
```
    listen [::]:443 ssl ipv6only=on; # managed by Certbot
    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/junpeko.tech/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/junpeko.tech/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
```




