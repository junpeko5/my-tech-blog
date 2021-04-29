---
templateKey: blog-post
title: phpenvでicu4cのバージョンがずれてしまったときの対処法
date: 2021-03-15
description:
cover: /images/php.png
category: PHP
tags:
  - phpenv
  - PHP
  - icu4c
slug: phpenv-icu4c-error
---

nodeを更新した場合に発生します。

```bash
php -v
dyld: Library not loaded: /usr/local/opt/icu4c/lib/libicuio.67.dylib
  Referenced from: /Users/jun/.anyenv/envs/phpenv/versions/7.4.8/bin/php
  Reason: image not found
```

まずは、brewのパッケージをアップデートして、その後PHPを再ビルドすると動きます。

## brewでパッケージをアップデート

```bash
brew update
brew upgrade
brew cleanup
```

## phpenvでPHPを再ビルドする

```bash
CONFIGURE_OPTS="--with-zlib-dir=$(brew --prefix zlib) \
--with-bz2=$(brew --prefix bzip2) \
--with-curl=$(brew --prefix curl) \
--with-iconv=$(brew --prefix libiconv) \
--with-libedit=$(brew --prefix libedit) \
--with-readline=$(brew --prefix readline) \
--with-tidy=$(brew --prefix tidy-html5)" \
phpenv install 7.4.8
```
