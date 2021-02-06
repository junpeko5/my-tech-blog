---
templateKey: blog-post
title: CentOS7、ApacheでLet's Encryptをインストールする
date: 2021-02-06
description: 
cover: /images/apache.png
category: SSL/TLS
tags:
  - Apache
  - CentOS7
  - SSL/TLS
slug: centos7-apache-lets-encrypt
---

## 前提

- CentOS7
- Apache2.4がインストールされており80番ポートでWebサイトが確認できる。
- filewalldが有効の場合は443ポートを公開する。
- epelリポジトリが有効になっている。
- パケットフィルタ(さくら)、セキュリティグループ(AWS)などのセキュリティ設定で、443ポートを公開する。
- 独自ドメインを取得している

```bash
yum repolist all | grep -i epel
```
## ssl_moduleが有効になっているか確認

Apache2.4をインストールした際に、デフォルトで有効になっているとは思いますが、
Apacheの`ssl_module`が有効になっているか確認します。

```bash
httpd -M | grep ssl_module
```

## Let's Encryptのインストール

### python2-certbot-apacheのインストール

```bash
yum install certbot python2-certbot-apache
```

```bash
vim /etc/httpd/conf/httpd.conf
```

末尾に以下を追加します

```apacheconf
NameVirtualHost *:80

<VirtualHost *:80>
    ServerAdmin root@junpeko.test
    DocumentRoot /var/www/html
    ServerName junpeko.work
    RewriteEngine on
    RewriteCond %{SERVER_NAME} =junpeko.test
    RewriteRule ^ https://%{SERVER_NAME}%{REQUEST_URI} [END,NE,R=permanent]
</VirtualHost>
```
## certbotを実行

certbot --apache -d junpeko.test

## certbotのドキュメント

ドキュメント<https://certbot.eff.org/lets-encrypt/centosrhel7-apache>を確認すると、

`python2-certbot-apache`ではなく`snap`というパッケージを利用してSSLを適用するのが推奨のようです。

次回はこちらでやりたいと思います。