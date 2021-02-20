---
templateKey: blog-post
title: Ubuntu環境でNginx、SSLの設定
date: 2021-02-16
description:
cover: /images/nginx.png
category: nginx
tags:
  - PHP
  - Ubuntu
  - nginx
  - DNS
  - SSL/TLS
slug: ubuntu-nginx-setting
---

## 前提

- nginxがインストール済み
- test.example.com（ドメイン）のAレコードがサーバーのIPに設定されている

```bash
dig test.example.com
test.example.com.	3600	IN	A	xxx.xxx.xxx.xxx
```

- serverディレクトリでバーチャルホストの設定をしている
<https://blog.junpeko.com/ubuntu-nginx-virtualhost>



## バーチャルホストの設定



<https://blog.junpeko.com/ubuntu-nginx-virtualhost>

（この設定により、<http://test.example.com>でアクセスできるようになります。）

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




