---
templateKey: blog-post
title: phpenvでpgsql・pdo-pgsqlを有効にする方法
date: 2020-04-02
description: phpenvでPHPをインストールする際には、プラグインとして内部でphp-buildを利用しています
cover: /images/php.png
category: Mac
tags:
  - PHP
  - phpenv
  - anyenv
slug: phpenv-pgsql-install
---

phpenvでPHPをインストールする際には、プラグインとして内部でphp-buildを利用しています。
default_configure_optionsの設定に追記することで、postgresqlを利用できるようにしていきます。

## default_configure_optionsを編集する

```bash
vim ~/.anyenv/envs/phpenv/plugins/php-build/share/php-build/default_configure_options
```

以下を追記すると、postgresqlが使えるようになります。

```bash
--with-pgsql
--with-pdo-pgsql
```

インストール後に確認してみてください。

```bash
$ php -m
pdo_pgsql
pgsql
```
