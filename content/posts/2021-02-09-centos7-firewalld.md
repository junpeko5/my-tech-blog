---
templateKey: blog-post
title: CentOS7、firewalldコマンドのまとめ
date: 2021-02-09
description: 
cover: /images/centos.png
category: CentOS7
tags:
  - CentOS7
  - firewalld
slug: centos7-firewalld
---

## ファイヤーウォールコマンドの確認

### 現在のステータスを確認

```shell
firewall-cmd --state
```

### ファイヤーウォールを起動

```shell
systemctl start firewalld
```

### 設定値を確認
```shell
firewall-cmd --list-all
```

### 再起動

```shell
systemctl restart firewalld
```

### 停止

```shell
systemctl stop firewalld
```

### 設定の追加

```shell
firewall-cmd --add-service=http --zone=public --permanent
firewall-cmd --add-service=https --zone=public --permanent
firewall-cmd --permanent --zone=public --add-service=pop3
```

※ –permanent は、変更を継続的に適用するためのオプションです。

※ OS再起動後も設定内容は持続します。

※ –zone=public は、ゾーンとしてpublicを使う設定です。

### 設定の削除

```shell
firewall-cmd --zone=public --remove-service=pop3
```

### 設定の反映

```shell
firewall-cmd --reload
```

### サービスの一覧

```shell
firewall-cmd --get-services
```

### サービスの詳細確認

```shell
firewall-cmd --info-service=pop3
```

### プロトコルとポート番号を指定して許可するサービスを追加する

```shell
firewall-cmd --add-port=10000/tcp --zone=public --permanent
firewall-cmd --remove-port=10000/tcp --zone=public --permanent
firewall-cmd --reload
```
