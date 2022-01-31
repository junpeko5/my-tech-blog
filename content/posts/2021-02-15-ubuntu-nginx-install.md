---
templateKey: blog-post
title: UbuntuにNginxをインストールする
date: 2021-02-15
description:
cover: /images/nginx.png
category: nginx
tags:
  - PHP
  - Ubuntu
  - nginx
slug: ubuntu-nginx-install
---

```shell
sudo apt install nginx
```

```shell
nginx -v
nginx version: nginx/1.18.0 (Ubuntu)
```

```shell
sudo systemctl enable nginx
```

```shell
sudo systemctl status nginx
```

※ nginxの起動ユーザーはデフォルトで`www-data`となります。

## 動作確認

```shell
curl -4 icanhazip.com
```

ブラウザで`http://your_server_ip_address`にアクセスします。

`Welcome to nginx!`の画面が表示されれば、OKです。

ちなみに、ファイヤーウォールは無効化されている状態です。
```shell
sudo ufw status verbose
Status: inactive
```