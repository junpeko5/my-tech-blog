---
templateKey: blog-post
title: certbotをsnapdでインストール
date: 2021-02-06
description: 
cover: /images/apache.png
category: SSL/TLS
tags:
- Apache
- CentOS7
- SSL/TLS
slug: centos7-apache-lets-encrypt-snapd
---

## 前提

- CentOS7
- Apache2.4がインストールされており80番ポートでWebサイトが確認できる。
- filewalldが有効の場合は443ポートを公開する。
- epelリポジトリが有効になっている。
- パケットフィルタ(さくら)、セキュリティグループ(AWS)などのセキュリティ設定で、443ポートを公開する。
- 独自ドメインを取得している

## snapdのインストール

EPELリポジトリがインストールされていれば、以下のコマンドでインストールできます。

```shell
sudo yum install snapd
```
インストールが完了したら、snapd.socketを有効化します。

```shell
sudo systemctl enable --now snapd.socket
```

シンボリックリンクを以下の様に設定します。

```shell
sudo ln -s /var/lib/snapd/snap /snap
```

## snapdの更新

```shell
sudo snap install core; sudo snap refresh core
```

## certbotの削除

すでにpackageとしてcertbotをインストールしている場合は、削除します。

```shell
sudo yum remove certbot
```
## certbotのインストール

snapコマンドでcertbotをインストールします。

```shell
sudo snap install --classic certbot
```

シンボリックリンクを設定します。

```shell
ln -s /snap/bin/certbot /usr/bin/certbot
```

## 証明書をインストールする

以下のコマンドで証明書がインストールされます。

```shell
sudo certbot --apache
```

## 参考

- <https://certbot.eff.org/lets-encrypt/centosrhel7-apache>
- <https://snapcraft.io/docs/installing-snap-on-centos>