---
templateKey: blog-post
title: Cloud RunでPHPサービスをデプロイする
date: 2022-02-21
description: GCPのCloud Runというサービスのチュートリアルをやってみたので、メモを残します。
cover: /images/php.png
category: PHP
tags:
  - PHP
  - Cloud Run
  - Docker
slug: hello-world-cloud-run-php
---

GCPのCloud Runというサービスのチュートリアルをやってみたので、メモを残します。

## Cloud SDKをインストール

MacOSのインストール方法は、パッケージをダウンロードして、ユーザーのホームディレクトリ（`/Users/{username}`）に展開する方法が推奨されているので、そのようにしました。

インストール時に

```shell
./google-cloud-sdk/install.sh
```

を実行し、`.zshrc`にgcloudコマンドのためのpathを追加しました。

その後、`gcloud init`コマンドで初期化を行いました。

## プロジェクトファイルの作成

それでは本題。

### PHPファイルの作成

Hello Worldと表示するPHPのファイル（index.php）を任意のプロジェクトルートに作成します。

```php
<?php
$name = getenv('NAME', true) ?: 'World';
echo sprintf('Hello %s!', $name);
```

Hello 環境変数NAMEの値がなければ、デフォルト値として`world`が`$name`に入るというプログラムになっています。

### Dockerfileの作成

```dockerfile
# Use the official PHP image.
# https://hub.docker.com/_/php
FROM php:8.0-apache

# Configure PHP for Cloud Run.
# Precompile PHP code with opcache.
RUN docker-php-ext-install -j "$(nproc)" opcache
RUN set -ex; \
  { \
    echo "; Cloud Run enforces memory & timeouts"; \
    echo "memory_limit = -1"; \
    echo "max_execution_time = 0"; \
    echo "; File upload at Cloud Run network limit"; \
    echo "upload_max_filesize = 32M"; \
    echo "post_max_size = 32M"; \
    echo "; Configure Opcache for Containers"; \
    echo "opcache.enable = On"; \
    echo "opcache.validate_timestamps = Off"; \
    echo "; Configure Opcache Memory (Application-specific)"; \
    echo "opcache.memory_consumption = 32"; \
  } > "$PHP_INI_DIR/conf.d/cloud-run.ini"

# Copy in custom code from the host machine.
WORKDIR /var/www/html
COPY . ./

# Use the PORT environment variable in Apache configuration files.
# https://cloud.google.com/run/docs/reference/container-contract#port
RUN sed -i 's/80/${PORT}/g' /etc/apache2/sites-available/000-default.conf /etc/apache2/ports.conf

# Configure PHP for development.
# Switch to the production php.ini for production operations.
# RUN mv "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini"
# https://github.com/docker-library/docs/blob/master/php/README.md#configuration
RUN mv "$PHP_INI_DIR/php.ini-development" "$PHP_INI_DIR/php.ini"
```

`php:8.0-apache`なので、PHP8系のイメージを使っています。

最後の行はPHPの本番環境の設定を適用するためにあります。

### dockerignoreの追加

`.dockerignore`ファイルを追加します

```
# The .dockerignore file excludes files from the container build process.
#
# https://docs.docker.com/engine/reference/builder/#dockerignore-file

# Exclude locally vendored dependencies.
vendor/

# Exclude "build-time" ignore files.
.dockerignore
.gcloudignore

# Exclude git history and configuration.
.gitignore
```

## Cloud Runにデプロイ

後は以下のコマンドでデプロイされます。

```shell
gcloud run deploy
```

権限の有効化等を聞かれますのですべて`yes`で答える必要がありました。

