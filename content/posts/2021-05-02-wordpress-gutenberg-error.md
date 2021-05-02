---
templateKey: blog-post
title: WordPressのブロックエディタ(Gutenberg)で更新ができない場合の対処方法
date: 2021-05-02
description:
cover: /images/php.png
category: WordPress
tags:
  - WordPress
  - PHP
slug: wordpress-gutenberg-error
---

## 問題点

WordPressのブロックエディタ(Gutenberg)で更新ができない（更新に失敗しました。 現在オフラインのようです。）
となった場合の対処方法の一例です。

> GutenbergとはWordPressに標準で組み込まれているエディタです。

`WordPress アドレス (URL)`と、`サイトアドレス (URL)`の通信プロトコルが`https`ではなく、`http`の場合に、
更新エラーとなってしまう仕様のようで、ここの設定を変える必要があります。

つまり、`http://ドメイン.com`ではなく、`https://ドメイン.com`とすれば良いということです。

## 対処方法

設定 > 一般設定 の`WordPress アドレス (URL)`と、`サイトアドレス (URL)`を変更する必要があります。

ただ、ここを変更すると、ホスト環境（サーバーの環境）によっては、リダイレクトループが発生することがあります。

参考: <https://ja.wordpress.org/support/article/administration-over-ssl/#%e3%83%aa%e3%83%90%e3%83%bc%e3%82%b9%e3%83%97%e3%83%ad%e3%82%ad%e3%82%b7%e3%81%ae%e4%bd%bf%e7%94%a8>

その場合は、参考URLの以下の設定を`wp-config.php`に追記しましょう。

```injectablephp
define('FORCE_SSL_ADMIN', true);
if ( ! empty( $_SERVER['HTTP_X_FORWARDED_PROTO'] ) && $_SERVER['HTTP_X_FORWARDED_PROTO'] == 'https' ) {
       $_SERVER['HTTPS']='on';
}
```

`require_once ABSPATH . 'wp-settings.php';`
の記述よりも前の位置に差し込んでください。
