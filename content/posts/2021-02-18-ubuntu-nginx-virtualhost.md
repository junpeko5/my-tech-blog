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
slug: ubuntu-nginx-virtualhost
---

nginxでは、apacheのVirtualhostと同じ様に、
1つのサーバー内で複数のサーバがあるように見せる設定 が可能です。

基本的には、httpディレクティブの中に複数のserverディレクティブを記述すればOKです。

複数のサイト管理する際には、サイトごとにファイルを分けたほうがよいです。

## デフォルトのserverディレクティブ設定について

Nginxをインストールした際、デフォルトでserverディレクティブの設定が行われています。

Nginxのメイン設定ファイルは`/etc/nginx/nginx.conf`です。

この`nginx.conf`内では、httpブロック内で`include/etc/nginx/sitesenabled/*;`
をインクルードしています。

この`sitesenabled`は、`sites-available/default`のシンボリックリンクとなっています。

```shell
ls -li /etc/nginx/sites-enabled/
total 0
773067 lrwxrwxrwx 1 root root 34 Feb 14 13:59 default -> /etc/nginx/sites-available/default
```

`/etc/nginx/sites-available/default`内に`server`ブロックの設定が記載されています。

```shell
sudo vim /etc/nginx/sites-available/default
```

```text
root /var/www/html;
index index.html index.htm index.nginx-debian.html;
server_name _;
```

ここの`server_name`の箇所に追記することもできますが、

serverディレクティブに記載する場合、
`default`バーチャルホストを設定する別ファイルに追記するほうが管理が楽なため、

`default`は利用しません。

## 公開ディレクトリの作成

`/var/www/html/`の下に公開するディレクトリを作成していきます。

```shell
cd /var/www/html/
sudo mkdir test.example.com
sudo chown www-data:www-data test.example.com/
sudo chmod 775 test.example.com/
cd test.example.com/
sudo vim index.html
```

`index.html`には適当に文字を記述します。

```shell
sudo chown www-data:www-data index.html
```

## serverディレクティブの記述場所

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

```shell
sudo vim /etc/nginx/sites-available/test.example.com
```

```text
server {
       listen 80;
       listen [::]:80;

       server_name test.example.com;

       root /var/www/html/test.example.com;
       index index.html;

       location / {
               try_files $uri $uri/ =404;
       }
}
```

## シンボリックリンクの作成

```shell
cd /etc/nginx/sites-enabled/
sudo ln -s /etc/nginx/sites-available/test.eexample.com test.eexample.com
```

## 確認と設定反映

```shell
sudo nginx -t
sudo systemctl restart nginx
```

## 補足

ちなみに、`sites-enabled`は`/etc/nginx/nginx.conf`でincludeされています。

```text
include /etc/nginx/sites-enabled/*;
```


