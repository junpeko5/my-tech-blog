---
templateKey: blog-post
title: Ubuntu環境CertBotでLet's Encryptを利用しSSL化する
date: 2021-02-16
description:
cover: /images/nginx.png
category: nginx
tags:
  - Ubuntu
  - nginx
  - Certbot
  - SSL/TLS
slug: ubuntu-nginx-certbot
---

## 前提

- nginxがインストール済み
- ポート番号の443が開放されている
- test.example.com（ドメイン）のAレコードがサーバーのIPに設定されている

```bash
dig test.example.com
test.example.com.	3600	IN	A	xxx.xxx.xxx.xxx
```

- serverディレクトリでバーチャルホストの設定をしている（以下URL参考）

<https://blog.junpeko.com/ubuntu-nginx-virtualhost>

（こちらの記事で行っている設定により、<http://test.example.com>でアクセスできるようになります。）

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

## Certbotのインストール 

※ すでに、certbot-auto等のCertbot OSパッケージをインストールしている場合は削除してください。

> apt remove パッケージ名

以下のコマンドで`Certbot`がインストールされます。

```bash
sudo snap install --classic certbot
```

## certbotコマンドを利用しやすくするため、シンボリックリンクを作成

```bash
sudo ln -s /snap/bin/certbot /usr/bin/certbot
```

## Certbotの実行

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

## 確認

URLをブラウザで確認してSSL化されているか確認します。

httpで接続したときに、httpsにリダイレクトする処理も入れてくれているようです。

## 証明書更新の自動化



## 補足

```bash
sudo vim /etc/nginx/sites-available/test.example.com
```

Certbotにより、追加された行には、`# managed by Certbot`のコメントが追記されていました。
```test
server {
       server_name test.example.com;
       root /var/www/html/test.example.com;
       index index.html;
       location / {
               try_files $uri $uri/ =404;
       }

    listen [::]:443 ssl ipv6only=on; # managed by Certbot
    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/test.example.com/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/test.example.com/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

}
server {
    if ($host = test.example.com) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


       listen 80;
       listen [::]:80;
       server_name test.example.com;
    return 404; # managed by Certbot
}
```




