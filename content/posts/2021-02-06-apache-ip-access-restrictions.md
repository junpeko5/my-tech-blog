---
templateKey: blog-post
title: ApacheでIPアドレスによるアクセス制限
date: 2021-02-06
description: 
cover: /images/apache.png
category: Apache
tags:
  - Apache
  - CentOS7
slug: apache-ip-access-restrictions
---

Apacheのアクセス制限についてまとめます。

## Requireディレクティブ

Apache2.4ではホストベースのアクセス制御に`Require`ディレクティブを利用します。

以前のバージョンでは、`Order`、`Allow`、`Deny`の3つのディレクティブで行っていましたが、

こちらは非推奨となっているので注意が必要です。

参考: <https://httpd.apache.org/docs/2.4/howto/access.html>

設定例は以下となります。

- すべてを許可: `Require all granted`
- 指定したIPを許可: `Require ip 127.0.0.1`

## ブラックリスト形式の設定例

上位ディレクトリで`Require all granted`が設定されていると、以下の設定はエラーとなります。

```apacheconf
<Directory "/var/www/html/test">
    Require not ip 60.143.6.62
</Directory>
```

「すべてを許可」もしくは「指定したIPを拒否」という設定になりおかしくなるためです。
`<RequireAll>`で囲むことで、このエラーは回避できます。

```apacheconf
<Directory "/var/www/html/test">
    <RequireAll>
        Require all granted
        Require not ip 60.143.6.33
    </RequireAll>
</Directory>
```

`<RequireAll>`で囲むことで、すべての条件を満たすという設定となります。

## ホワイトリスト形式の設定例

`<RequireAny>`で囲むといずれかの条件を満せばよいという設定になります。

ただ、囲まなくてもデフォルトで`<RequireAny>`となるため、使用する機会は少なそうです。

```apacheconf
<Directory "/var/www/html/test">
    <RequireAny>
        Require ip 60.123.2.2
        Require ip 60.123.2.1
    </RequireAny>
</Directory>
```

## .htaccessでアクセス制御をする

`httpd.conf`と同様に、`.htaccess`に設定を書くことができます。

```apacheconf
<RequireAll>
    Require all granted
    Require not ip 60.143.6.62
</RequireAll>
```
