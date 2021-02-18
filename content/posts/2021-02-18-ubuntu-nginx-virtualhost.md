---
templateKey: blog-post
title: Ubuntu環境でNginxのバーチャルサーバーの設定
date: 2021-02-18
description:
cover: /images/nginx.png
category: nginx
tags:
  - PHP
  - Ubuntu
  - nginx
slug: ubuntu-nginx-virtual
---

nginxでは、apacheのVirtualhostと同じ様に、
1つのサーバー内で複数のサーバがあるように見せる設定 が可能です。

基本的には、httpディレクティブの中に複数のserverディレクティブを記述すればOKです。

複数のサイト管理する際には、サイトごとにファイルを分けたほうがよいです。


インストール時の設定でデフォルトで読み込まれる
`/etc/nginx/sites-available/default`
内で、Virtual Hostを設定する場合の説明が書いてあります。

```text
# Virtual Host configuration for example.com
#
# You can move that to a different file under sites-available/ and symlink that
# to sites-enabled/ to enable it.
```

`sites-available/`の下にサイトごとのファイルを設定ファイルを作成し、
`sites-enabled/`の下にシンボリックリンクを作成しましょう。

```bash
sudo vim /etc/nginx/sites-available/example.com
```

```text
server {
       listen 80;
       listen [::]:80;

       server_name example.com

       root /var/www/stg.kta1984;
       index index.html;

       location / {
               try_files $uri $uri/ =404;
       }
}
```

## シンボリックリンクの作成

```bash
sudo ln -s /etc/nginx/sites-available/example.com example.com
```

## 補足

ちなみに、`sites-enabled`は`/etc/nginx/nginx.conf`でincludeされています。

```text
include /etc/nginx/sites-enabled/*;
```


