---
templateKey: blog-post
title: Xdebug3系の設定例
date: 2021-02-04
description: 
cover: /images/xdebug.png
category: Xdebug
tags:
  - Xdebug
  - php
slug: xdebug3-setting
---

## Xdebug2の設定例

```bash
zend_extension="path/to/xdebug/xdebug.so"
html_errors=on
xdebug.remote_enable=1
xdebug.remote_host=localhost
xdebug.remote_port=9000
xdebug.remote_autostart=1
```

Xdebug2系でよく設定していた
- `xdebug.remote_port`
- `remote_autostart`
- `remote_enable`
- `remote_host`

などが廃止になっています。

Xdebug3系でこの設定を利用していると警告メッセージが出るようになります。

## Xdebug3の設定例

```xdebug.ini
zend_extension="path/to/xdebug/xdebug.so"
html_errors=on
xdebug.mode=debug
xdebug.client_host=localhost
xdebug.start_with_request=yes
xdebug.client_host=localhost
xdebug.client_port=9003
```

同じような設定を3系で利用する場合は上記の設定で良さそうです。

### xdebug.client_host

デバッグ接続を開始するときに接続を試みる際のIPアドレス、またはhost名を指定します。

デフォルト値は`localhost`です。

### integer xdebug.client_port

Xdebugがデバッグ接続を試みる際のport番号です。

デフォルト値は`9003`となっており、変更する必要はないと思われます。

### xdebug.mode

`xdebug.mode=debug`とすると、ステップ実行や変数の確認等が行えるようになります。

### xdebug.start_with_request

- yes（PHPリクエストが開始し、PHPのコードが実行される前にデバッグを実行します）
- no（リクエスト開始時にデバッグを有効にしません）
- trigger（リクエスト開始時に、何かしらのトリガーがある場合にデバッグを実行します）
- default（xdebug.modeで変わる）

デフォルト値は`default`です。
基本的に常に有効化しておきたいため、いつも`yes`で設定しています。

その他設定等たくさんありますが、以下で確認できます。

参考: <https://xdebug.org/docs/all_settings#start_with_request>



