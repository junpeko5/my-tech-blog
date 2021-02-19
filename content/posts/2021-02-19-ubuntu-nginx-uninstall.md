---
templateKey: blog-post
title: Ubuntu環境でNginxをアンインストールする
date: 2021-02-19
description:
cover: /images/nginx.png
category: nginx
tags:
  - PHP
  - Ubuntu
  - nginx
slug: ubuntu-nginx-uninstall
---

UbuntuでNginxの設定ファイルごと削除する方法です。

以下では、設定ファイルがそのまま残ってしまいます。

```bash
sudo apt remove nginx
```

すべての関連ファイルを削除するコマンドは以下です。

```bash
sudo apt purge nginx nginx-common nginx-full
```

