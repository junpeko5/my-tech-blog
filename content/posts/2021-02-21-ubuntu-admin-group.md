---
templateKey: blog-post
title: Ubuntuのadminグループ
date: 2021-02-21
description:
cover: /images/ubuntu.png
category: Ubuntu
tags:
  - Ubuntu
slug: ubuntu-admin-group
---

CentOSでwheelというルート権限を与えるグループがデフォルトでありますが、

Ubuntuでは、adminというグループがそれにあたります。

例えば、

```bash
sudo usermod -a -G admin ubuntu
```

としてあげると、ubuntuユーザーがadminグループについかされ、

管理者の権限を得ることができます。
