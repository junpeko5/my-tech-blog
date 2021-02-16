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

```bash
sudo apt install nginx
```

```bash
nginx -v
nginx version: nginx/1.18.0 (Ubuntu)
```

```bash
sudo systemctl enable nginx
```

```bash
sudo systemctl status nginx
```

※ nginxの起動ユーザーはデフォルトで`www-data`となります。

## 動作確認

```bash
curl -4 icanhazip.com
```

ブラウザで`http://your_server_ip_address`にアクセスします。

`Welcome to nginx!`の画面が表示されれば、OKです。

ちなみに、ファイヤーウォールは無効化されている状態です。
```bash
sudo ufw status verbose
Status: inactive
```