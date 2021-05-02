---
templateKey: blog-post
title: systemctlコマンドでserviceの一覧を取得する方法
date: 2021-05-02
description:
cover: /images/ubuntu.png
category: Ubuntu
tags:
  - Ubuntu
  - CentOS
slug: systemctl-index
---


以下のコマンドで一覧を取得できます。

```bash
systemctl list-unit-files --type=service
```