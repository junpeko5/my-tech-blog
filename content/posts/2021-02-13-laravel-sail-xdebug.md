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

Laravel/Sailで構築した環境では、デフォルトでXdebugが有効ではなかったので、
カスタマイズしてみました。

## Sailのカスタマイズ

ドキュメントにも書いている通りですが、
Sailをカスタマイズするには、`sail:publish`コマンドを実行します。

```bash
sail artisan sail:publish
```

これで、プロジェクトのルートに`docker`ディレクトリが作成され、
`./vendor/laravel/sail/runtimes/`以下のディレクトリがコピーされます。

## docker-compose.ymlの編集

```yaml
services:
    laravel.test:
        build:
            context: ./docker/7.4
            dockerfile: Dockerfile
            args:
                WWWGROUP: '${WWWGROUP}'
```

`context:`のパスを書き換えましょう。

利用しているPHPのバージョンのディレクトリを指定します。

## php.iniの編集

`docker/7.4/php.ini`にXdebugの設定を追記します。

```ini
[PHP]
post_max_size = 100M
upload_max_filesize = 100M
variables_order = EGPCS

[XDebug]
xdebug.mode = debug
xdebug.start_with_request = yes
xdebug.client_host = host.docker.internal
```

## Dockerfileの変更

`docker/7.4/Dockerfile`でxdebugをインストールするように変更します。

`php-xdebug`を追記しています。

```bash
RUN apt-get update \
    && apt-get install -y gnupg gosu curl ca-certificates zip unzip git supervisor sqlite3 libcap2-bin libpng-dev python2 \
    && mkdir -p ~/.gnupg \
    && chmod 600 ~/.gnupg \
    && echo "disable-ipv6" >> ~/.gnupg/dirmngr.conf \
    && apt-key adv --homedir ~/.gnupg --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys E5267A6C \
    && apt-key adv --homedir ~/.gnupg --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C300EE8C \
    && echo "deb http://ppa.launchpad.net/ondrej/php/ubuntu focal main" > /etc/apt/sources.list.d/ppa_ondrej_php.list \
    && apt-get update \
    && apt-get install -y php7.4-cli php7.4-dev \
       php7.4-pgsql php7.4-sqlite3 php7.4-gd \
       php7.4-curl php7.4-memcached \
       php7.4-imap php7.4-mysql php7.4-mbstring \
       php7.4-xml php7.4-zip php7.4-bcmath php7.4-soap \
       php7.4-intl php7.4-readline php7.4-pcov \
       php7.4-msgpack php7.4-igbinary php7.4-ldap \
       php7.4-redis \
       php-xdebug \
```

## コンテナを再構築

変更を反映させるため、コンテナを再構築します。

```bash
sail build --no-cache
```

## 確認

```bash
sail shell
sail@414d0d2b4215:/var/www/html$ php -m | grep xdebug
xdebug
```
