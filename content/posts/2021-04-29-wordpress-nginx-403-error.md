---
templateKey: blog-post
title: wordpress、nginx環境で403エラーとなった場合の対処法まとめ
date: 2021-04-29
description: 403 Forbiddenエラーとは、ウェブサイトが閲覧禁止となっている状態を表すHTTPステータスコードです。403 Forbiddenエラーとは、ウェブサイトが閲覧禁止となっている状態を表すHTTPステータスコードです。
cover: /images/php.png
category: WordPress
tags:
  - PHP
  - WordPress
  - nginx
slug: wordpress-nginx-403-error
---

403 Forbiddenエラーとは、ウェブサイトが閲覧禁止となっている状態を表すHTTPステータスコードです。

WordPressを別サーバーに移行した際に、色々問題が発生したので対処方法をまとめておきます。

## 管理画面でのSSL通信を強制する

管理画面の無限リダイレクトループが発生する場合は、管理画面でのSSLの強制の設定を行う必要があります。

`wp-config.php`に追記しましょう。

また、ハマリポイントなのですが、`wp-settings.php`の読み込みよりも前に設定する必要があります。

```bash
define('FORCE_SSL_ADMIN', true);
if ( ! empty( $_SERVER['HTTP_X_FORWARDED_PROTO'] ) && $_SERVER['HTTP_X_FORWARDED_PROTO'] == 'https' ) {
       $_SERVER['HTTPS']='on';
}
require_once(ABSPATH . 'wp-settings.php');
```

参考: <https://wpdocs.osdn.jp/%E7%AE%A1%E7%90%86%E7%94%BB%E9%9D%A2%E3%81%A7%E3%81%AE_SSL_%E9%80%9A%E4%BF%A1>

## ファイルアクセス権の確認

もし、パーミッションに問題がある場合はエラーログに何か出力されていると思いますので、エラーログを確認しましょう。

エラーログファイルの場所はNginxの設定ファイルに記載されています。

## プラグインの影響を調査する

`wp-content/plugins/`の`plugins`ディレクトリの名前を変更すると、WordPressのプラグインが無効となるようです。

もし、ディレクトリ名を変更して、問題が解消されれば、影響のあるプラグインを１つ１つ調査しましょう。

## WordPressのテーブルの接頭辞を変更した場合

`wp-config.php`で設定できるテーブルの接頭辞を変更した場合は、対応が必要なようです。
（403エラーとなるかどうかは検証していません。）

```bash
$table_prefix  = 'wp_';
```


例えば、`wp_`から`wp2_`に接頭辞を変更した場合は、

移行するテーブル名だけではなく、テーブルのカラムの値も同じ接頭辞`wp2_`に置き換えてからリストアするようにしましょう。

## 所感

WordPressのサーバー移管については、結構知らなハマってしまうポイントが多いですね。。