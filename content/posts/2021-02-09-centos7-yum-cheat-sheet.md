---
templateKey: blog-post
title: CentOS7、yumコマンドチートシート
date: 2021-02-09
description: ssh鍵をリモートサーバーに設置し、ローカルから作成した一般ユーザーでログインしたい。
cover: /images/centos.png
category: CentOS7
tags:
  - CentOS7
  - yum
slug: centos7-yum-cheat-sheet
---

## パッケージ一覧を表示する

```bash
yum list
```

### インストール済みパッケージを表示する

```bash
yum installl installd
```

### アップデート可能なパッケージ一覧を表示

```bash
yum check-update
```

## アップデート

```bash
yum update
```

### セキュリティアップデートがあるソフトウェアのみをアップデート
```bash
yum --security update
```

## 取り消し

```bash
yum downgrade <packagename>-<version>
yum downgrade <packagename>
```

### 履歴の確認

```bash
yum history list
yum history list all
```

### 履歴IDを指定して取り消し

```bash
yum history undo 19
```

## アンインストール

```bash
yum remove <packagename>-<version>
yum remove php-7.1.3
```