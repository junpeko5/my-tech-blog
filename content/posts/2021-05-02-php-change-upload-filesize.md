---
templateKey: blog-post
title: PHPのファイルアップロードサイズを変更する方法
date: 2021-05-02
description: php.iniのファイルアップロードサイズを変更する場合は、 以下の３つの設定値を設定するとよいです。
cover: /images/php.png
category: PHP
tags:
  - PHP
  - WordPress
slug: php-change-upload-filesize
---

php.iniのファイルアップロードサイズを変更する場合は、 以下の３つの設定値を設定するとよいです。

- post_max_size（POSTデータに許可される最大サイズ）
- upload_max_filesize（アップロードされるファイルの最大サイズ）
- memory_limit

大きなファイルをアップロード するには、`post_max_size`の値を 
`upload_max_filesize` より大きく設定する必要があります。

また、一般的に`memory_limit`は、`post_max_size`よりも
大きくする必要があります。

## php.iniの場所

Nginxを利用したWebサーバーを構築している場合は編集する`php.ini`の設定ファイルに注意しておく必要があります。

cliで実行される`php.ini`とfpmで実行される`php.ini`の2種類あるためです。

コマンドで`php.ini`の場所は、`php --ini`で確認できますが、こちらの場合
`/etc/php/7.4/cli/php.ini`というようにcliのパスが出力されます。

`/etc/php/7.4/cli/php.ini`の値を変えても、Webアプリから利用した場合にはこちらの設定値ではなく、
`/etc/php/7.4/fpm/php.ini`の設定値が利用されるため、注意しましょう。

`php.ini`の設定を変えたのになぜか設定が反映されないといったことで、私はハマりました。（汗）

> ちなみに`phpinfo()`関数でwebから`php.ini`の設定を確認した場合は、
> Configuration File (php.ini) Path　は`/etc/php/7.4/fpm/php.ini`の値を表示させます。

## PHPの設定値を反映

Nginxの場合は、以下のコマンドでサービスを再起動しましょう。

```bash
sudo systemctl restart php7.4-fpm.service # サービス名は任意
```

apacheの場合

```bash
sudo systemctl restart httpd
```


