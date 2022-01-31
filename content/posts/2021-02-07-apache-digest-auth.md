---
templateKey: blog-post
title: ApacheでDigest認証を設定する
date: 2021-02-07
description: ダイジェスト認証は、Basic認証に比べてより安全な認証方式です。Digest認証の設定方法を説明します。
cover: /images/apache.png
category: Apache
tags:
  - Apache
  - CentOS7
slug: apache-digest-auth
---

ダイジェスト認証は、Basic認証に比べてより安全な認証方式です。
Digest認証の設定方法を説明します。

## 前提

- CentOS7
- Apache2.4

Digest認証を設定するには、`.digest`というファイルにユーザー名・realm（領域）・パスワードを設定します。

また、ファイルへの書き込みは`htdigest`というコマンドで行います。

必要な手順は、`httpd.conf`ファイルの編集と、`.digest`ファイルの作成です。

## Apacheの設定ファイル（httpd.conf）の編集

例えば、`/var/www/html`にドキュメントルートが設定されている場合、

`http://ホスト名/digest`のURLにアクセスした場合にDigest認証を設定するには、

`httpd.conf`に以下のような設定を追記します。

```shell
vim /etc/httpd/conf/httpd.conf
```

```apacheconf
<Directory /var/www/html/digest>
    AuthType Digest
    AuthName "digest test"
    AuthUserFile "/etc/httpd/.digest"
    Require valid-user
</Directory>
```

`AuthType`ディレクティブには`Digest`と設定します。

`AuthName`にrealm（領域）を設定します。

`Require`ディレクティブに`Require user junpeko`のようにユーザー名を指定することもできますが、

今回は、`Require valid-user`と設定して登録ユーザーすべてにアクセスを許可しています。

設定を反映させるため再起動しましょう。

```shell
apachectl restart
```

### パスワードファイル`.digest`の作成・追加

`AuthUserFile`に設定したパスに`.digest`ファイルを作成します。

```shell
htdigest -c /etc/httpd/.digest "digest test" junpeko
```
第2引数にrealmを指定しています。

`-c`は新規ファイル作成のオプションのため、 追加する場合は`-c`オプションは不要です。

```shell
htdigest /etc/httpd/.digest "digest test" takuya
```

## 確認

`http://ホスト名/digest`のURLにアクセスすると、

ユーザー名とパスワードを入力する認証ダイアログが表示されます。

ユーザー名・パスワードを正しく入力するとログインできます。

## ログアウトについて

ログアウトという機能はダイジェスト認証にはありません。

ブラウザのログイン情報を消去するか、ブラウザを終了させると、

再アクセスした際に認証ダイアログが再表示されます。
