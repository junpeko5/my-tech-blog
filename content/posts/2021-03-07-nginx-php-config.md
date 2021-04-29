---
templateKey: blog-post
title: NginxでPHPアプリケーションを実行するための設定
date: 2021-03-07
description:
cover: /images/nginx.png
category: Nginx
tags:
  - Nginx
  - PHP
  - php-fpm
slug: nginx-php-config
---

## 前提条件

PHP-FPMがインストールされている必要があります。

今回の環境では、php7.4-fpmがインストールされています。

```bash
sudo systemctl status php7.4-fpm
● php7.4-fpm.service - The PHP 7.4 FastCGI Process Manager
     Loaded: loaded (/lib/systemd/system/php7.4-fpm.service; enabled;>
     Active: active (running) since Sat 2021-02-20 00:07:32 UTC; 2 we>
...
...
```

## PHP-FPMの設定

```bash
server {
       server_name stg.kta1984.com;
       root /var/www/html/test.com/current/public;
       index index.php index.html;
       location / {
               try_files $uri $uri/ index.php?q=$uri;
       }

       location ~ \.php$ {
           fastcgi_split_path_info ^(.+\.php)(/.+)$;
           include fastcgi_params;
           fastcgi_index index.php;
           fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
           fastcgi_intercept_errors on;
           fastcgi_pass unix:/var/run/php/php7.4-fpm.sock;
       }
}
```

`fastcgi_pass`には、リッスンするソケットまたはソケットファイルを指定します。

`/etc/php/7.4/fpm/pool.d/www.conf`に`listen = /run/php/php7.4-fpm.sock`の記載
があります。

ファイルの位置は環境によって異なってきます。
