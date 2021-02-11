---
templateKey: blog-post
title: .ssh/configの設定例
date: 2021-02-11
description: 
cover: /images/centos.png
category: ssh
tags:
  - ssh
slug: ssh-config-setting
---
`ssh`コマンド実行時に指定する値としては、
ユーザー名、ホスト名、鍵の名前、ポート番号等がありますが、
いちいちサーバーの情報を指定するのは面倒です。

そういったときは、`.ssh/config`の設定ファイルに接続情報を記載しておくだけで、

`ssh ホストの別名`でリモートのサーバーにログイン出来るようになります。

## 設定例

```text
Host junpeko
  HostName junpeko.test
  User vpsuser
  Port 22
  IdentityFile ~/.ssh/sakura_vps_id_rsa
  TCPKeepAlive yes
```

`Host`にはホスト名の別名を設定できます。

上記の設定の場合は、`ssh junpeko`でログイン出来るようになります。

`User`はログインするユーザーを指定します。通常は一般ユーザーを指定することになると思います。

`Port`はそのままポート番号ですね。

公開鍵認証で接続する場合、
`IdentityFile`に秘密鍵のパスを設定することができます。

`TCPKeepAlive`でsshで接続後、放置した場合に接続状態を維持するか、または切断するかを管理できます。

接続状態を継続したい場合は`yes`を指定します。




