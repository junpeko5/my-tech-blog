---
templateKey: blog-post
title: CentOS7でnginxをインストール
date: 2021-02-17
description:
cover: /images/nginx.png
category: nginx
tags:
  - PHP
  - CentOS7
  - nginx
slug: centos7-nginx-install
---

```shell
sudo yum install yum-utils
sudo vim /etc/yum.repos.d/nginx.repo
```

以下を追記します。

```
[nginx-stable]
name=nginx stable repo
baseurl=http://nginx.org/packages/centos/$releasever/$basearch/
gpgcheck=1
enabled=1
gpgkey=https://nginx.org/keys/nginx_signing.key
module_hotfixes=true

[nginx-mainline]
name=nginx mainline repo
baseurl=http://nginx.org/packages/mainline/centos/$releasever/$basearch/
gpgcheck=1
enabled=0
gpgkey=https://nginx.org/keys/nginx_signing.key
module_hotfixes=true
```

デフォルトでは`stable`がインストールされます。

`mainline`でインストールしたい場合は以下を実行します。

```shell
sudo yum-config-manager --enable nginx-mainline
```


```shell
sudo yum install nginx
```

