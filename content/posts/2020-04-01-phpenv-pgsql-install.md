---
templateKey: blog-post
title: phpenvでpgsql・pdo-pgsqlを有効にする方法
date: 2020-04-02
description: phpenvでPHPをインストールする際には、プラグインとして内部でphp-buildを利用しています
cover: /images/php.png
category: PostgreSQL
tags:
  - PostgreSQL
  - PHP
  - phpenv
  - anyenv
  - php-build
slug: phpenv-pgsql-install
---

phpenvでPHPをインストールする際には、プラグインとして内部で`php-build`を利用しています。
`default_configure_options`の設定に追記することで、`postgresql`を利用できるようにしていきます。

## default_configure_optionsを編集する

```shell
vim ~/.anyenv/envs/phpenv/plugins/php-build/share/php-build/default_configure_options
```

以下を追記すると、postgresqlが使えるようになります。

```shell
--with-pgsql
--with-pdo-pgsql
```

インストール後に確認してみてください。

```shell
$ php -m
pdo_pgsql
pgsql
```
