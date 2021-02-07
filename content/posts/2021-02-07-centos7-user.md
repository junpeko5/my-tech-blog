---
templateKey: blog-post
title: CentOS7で一般ユーザーを作成する
date: 2021-02-07
description: 
cover: /images/apache.png
category: CentOS7
tags:
  - CentOS7
slug: centos7-user
---

## 一般ユーザーの作成

`admin`というユーザーを作成します。

```bash
adduser admin
```

## 確認

```bash
cat /etc/passwd | grep admin
```

## 一般ユーザーのパスワードを設定する

```bash
passwd admin
```

## 一般ユーザーの変更

`usermod`コマンドで編集可能。

```bash
usermod -h
```

## 一般ユーザーの削除

```bash
userdel -r admin
```

`-r`オプションでホームディレクトリとメールスプールを削除します。