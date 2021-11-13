---
templateKey: blog-post
title: Laravel SailでXdebugを有効にする
date: 2021-02-13
description:
cover: /images/laravel.png
category: Laravel
tags:
  - Laravel
  - PHP
  - Sail
  - Xdebug
slug: laravel-sail-xdebug
---


## Sailのカスタマイズ

ドキュメントにも書いている通りですが、
Sailをカスタマイズするには、`sail:publish`コマンドを実行します。

```bash
sail artisan sail:publish
```

これで、プロジェクトのルートに`docker`ディレクトリが作成され、
`./vendor/laravel/sail/runtimes/`以下のディレクトリがコピーされます。

※ バージョンが最新出ない場合は注意が必要です。

<https://github.com/laravel/sail/tree/1.x/runtimes> の内容に変更すれば、問題ないはずです。

## docker-compose.ymlの編集

```yaml
services:
  laravel.test:
    build:
      context: ./vendor/laravel/sail/runtimes/8.0
      dockerfile: Dockerfile
      args:
        WWWGROUP: '${WWWGROUP}'
    image: sail-8.0/app
```

`context:`のパスを書き換えることで、PHPのバージョンが変更可能です。

利用しているPHPのバージョンのディレクトリを指定します。

## php.iniの編集について

`docker/8.0/php.ini`にXdebugの設定を追記しても反映されません。

`xdebug.mode`と`xdebug.client_host`は環境変数で設定可能なため、`docker-compose.yml`のenvironmentに設定します。

```bash
# For more information: https://laravel.com/docs/sail
version: '3'
services:
    laravel.test:
        build:
            context: ./vendor/laravel/sail/runtimes/8.0
            dockerfile: Dockerfile
            args:
                WWWGROUP: '${WWWGROUP}'
        image: sail-8.0/app
        extra_hosts:
            - 'host.docker.internal:host-gateway'
        ports:
            - '${APP_PORT:-80}:80'
        environment:
            WWWUSER: '${WWWUSER}'
            LARAVEL_SAIL: 1
            XDEBUG_MODE: '${SAIL_XDEBUG_MODE:-off}'
            XDEBUG_CONFIG: '${SAIL_XDEBUG_CONFIG:-client_host=host.docker.internal}'
        volumes:
            - '.:/var/www/html'
        networks:
            - sail
        depends_on:
            - mysql
    mysql:
        image: mysql:5.7
        ports:
            - '${FORWARD_DB_PORT:-3306}:3306'
        environment:
            MYSQL_ROOT_PASSWORD: '${DB_PASSWORD}'
            MYSQL_DATABASE: '${DB_DATABASE}'
            MYSQL_USER: '${DB_USERNAME}'
            MYSQL_PASSWORD: '${DB_PASSWORD}'
            MYSQL_ALLOW_EMPTY_PASSWORD: 'yes'
        volumes:
            - 'sailmysql:/var/lib/mysql'
        networks:
            - sail
        healthcheck:
            test: ["CMD", "mysqladmin", "ping", "-p${DB_PASSWORD}"]
            retries: 3
            timeout: 5s
    mailhog:
        image: 'mailhog/mailhog:latest'
        ports:
            - '${FORWARD_MAILHOG_PORT:-1025}:1025'
            - '${FORWARD_MAILHOG_DASHBOARD_PORT:-8025}:8025'
        networks:
            - sail
networks:
    sail:
        driver: bridge
volumes:
    sailmysql:
        driver: local

```


## dockerディレクトリの確認

<https://github.com/laravel/sail/tree/1.x/runtimes/8.0> のデフォルトの内容に合わせておきます。

最新のsailではxdebugがデフォルトで有効になるようになってあります。

（php8.0-xdebugが含まれる）

参考: <https://xdebug.org/docs/install>

## コンテナを再構築

変更を反映させるため、コンテナを再構築します。

```bash
sail build --no-cache
sail up -d
```

## 確認

```bash
sail shell
sail@414d0d2b4215:/var/www/html$ php -m | grep xdebug
```
