---
templateKey: blog-post
title: CentOS7、yumコマンドチートシート
date: 2021-02-09
description: yumコマンドのまとめです。
cover: /images/centos.png
category: CentOS7
tags:
  - CentOS7
  - yum
slug: centos7-yum-cheat-sheet
---

yumコマンドのまとめです。

## パッケージ一覧を表示する

```shell
yum list
```

### インストール済みパッケージを表示する

```shell
yum list installed
yum list installed | grep php
```

## インストール

```shell
yum install <packagename>
```

### リポジトリを有効化する（複数指定可能）

```shell
yum install --enablerepo=epel,remi,remi-php73
```

### アップデート可能なパッケージ一覧を表示

```shell
yum check-update
```

## アップデート

```shell
yum update
```

### セキュリティアップデートがあるソフトウェアのみをアップデート
```shell
yum --security update
```

## 取り消し

```shell
yum downgrade <packagename>-<version>
yum downgrade <packagename>
```

### 履歴の確認

```shell
yum history list
yum history list all
```

### 履歴IDを指定して取り消し

```shell
yum history undo 19
```

## アンインストール

```shell
yum remove <packagename>-<version>
yum remove php-7.1.3
```

## リポジトリの確認

```shell
yum repolist
```
