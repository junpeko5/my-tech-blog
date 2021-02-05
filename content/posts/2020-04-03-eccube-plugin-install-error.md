---
templateKey: blog-post
title: EC-CUBEでプラグインインストール時のエラーについて
date: 2020-04-03
description: EC-CUBE4のプラグインをインストールする際に、Xdebugをoffにしないとシステムエラーとなるので注意したいです。
cover: /images/eccube.png
category: ec-cube
tags:
  - Xdebug
  - ec-cube
  - PHP
slug: eccube-plugin-install-error
---

EC-CUBE4のプラグインをインストールする際に、Xdebugをoffにしないとシステムエラーとなるので注意したいです。

## Xdebugをオフにする

```bash
php --ini
```

上記コマンドで、｀xdebug.ini`の場所を確認し、以下の様にコメントアウトしましょう。

```xdebug.ini
;zend_extension="/Users/username/.anyenv/envs/phpenv/versions/7.3.13/lib/php/extensions/no-debug-non-zts-20180731/xdebug.so"
```
