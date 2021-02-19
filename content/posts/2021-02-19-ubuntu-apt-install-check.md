---
templateKey: blog-post
title: Ubuntu環境でインストールするパッケージの確認方法
date: 2021-02-19
description:
cover: /images/ubuntu.png
category: Ubuntu
tags:
  - Ubuntu
  - apt
slug: ubuntu-apt-install-check
---

Ubuntuでインストールするパッケージの確認方法はいくつかあるようです。

mysql-serverのインストールされるバージョンを確認してみます。

## apt-cache

```bash
apt-cache show mysql-server | grep Version
Version: 8.0.23-0ubuntu0.20.04.1
Version: 8.0.19-0ubuntu5
```

## apt-show-versions

```bash
apt-show-versions

Command 'apt-show-versions' not found, but can be installed with:

sudo apt install apt-show-versions
```

```bash
sudo apt install apt-show-versions
```

使い方は確認してください。

```bash
apt-show-versions -h
```
