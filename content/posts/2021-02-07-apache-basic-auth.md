---
templateKey: blog-post
title: ApacheでBasic認証を設定する
date: 2021-02-07
description: 
cover: /images/apache.png
category: Apache
tags:
  - Apache
  - CentOS7
slug: apache-basic-auth
---

## 前提

- CentOS7
- Apache2.4

ベーシック認証を設定するには、`.passwds`というファイルにログイン情報（ユーザー名・パスワード）を設定します。
また、ファイルへの書き込みは`htpasswd`というコマンドで行います。

必要な手順は、`httpd.conf`ファイルの編集と、`.htpasswd`ファイルの作成です。

## Apacheの設定ファイル（httpd.conf）の編集

例えば、`/var/www/html`にドキュメントルートが設定されている場合、

`http://ホスト名/basic`のURLにアクセスした場合にベーシック認証を設定するには、

`httpd.conf`に以下のような設定を追記します。

```shell
vim /etc/httpd/conf/httpd.conf
```

```apacheconf
<Directory /var/www/html/basic>
    AuthType Basic
    AuthName "Restricted Pages"
    AuthUserFile "/etc/httpd/.passwds"
    Require user junpeko takuya
</Directory>
```

`AuthType`ディレクティブには`Basic`と設定します。

`Require`ディレクティブにユーザー名を指定していますが、

また、`valid-user`と設定すると、登録ユーザーすべてにアクセスを許可できます。

設定を反映させるため再起動しましょう。

```shell
apachectl restart
```

### パスワードファイル`.passwds`の作成・追加

`AuthUserFile`に設定したパスに`.passwds`ファイルを作成します。

```shell
htpasswd -c /etc/httpd/.passwds junpeko
```

`-c`は新規ファイル作成のオプションのため、 追加する場合は`-c`オプションは不要です。

```shell
htpasswd /etc/httpd/.passwds takuya
```

## 確認

`http://ホスト名/basic`のURLにアクセスすると、

ユーザー名とパスワードを入力する認証ダイアログが表示されます。

ユーザー名・パスワードを正しく入力するとログインできます。

## ログアウトについて

ログアウトという機能はベーシック認証にはありません。

ブラウザのログイン情報を消去するか、ブラウザを終了させると、

再アクセスした際に認証ダイアログが再表示されます。

## グループファイルでの設定例

先程は`Require`ディレクティブに `user`を指定していましたが、

`group`を指定することも可能です。

```apacheconf
<Directory /var/www/html/basic>
    AuthType Basic
    AuthName "Restricted Pages"
    AuthUserFile "/etc/httpd/.passwds"
    AuthGroupFile "/etc/httpd/.groups"
    Require group admin
</Directory>
```

`Require user junpeko takuya`を削除し、

`Require group admin`と

`AuthGroupFile "/etc/httpd/.groups"`を追加しています。

また、`AuthGroupFile`で指定したパスにファイルを`.group`という名前でファイルを作成します。

```shell
vim /etc/httpd/.groups
```

```text
admin: junpeko takuya
```
