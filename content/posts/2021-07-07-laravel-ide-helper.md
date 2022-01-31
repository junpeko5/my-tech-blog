---
templateKey: blog-post
title: Laravel IDE Helper Generatorの設定
date: 2021-07-07
description: 
cover: /images/laravel.png
category: Laravel
tags:
  - PHP
  - Laravel
slug: laravel-ide-helper
---

## Laravel IDE Helper Generatorとは

Laravel IDE HelperはPhpStormやVSCode等のIDEに正確な補完機能を提供するファイルを生成します。

具体的には、`_ide_helper.php`
`_ide_helper_models.php`
`.phpstorm.meta.php`（PhpStormのみ）
が生成されます。

ModelやFacadesの補完が効くようになるので、IDEで開発するならぜひとも設定しておきたいです。

開発環境にのみ設定するので、本番環境に影響がない点も良いところです。

## 設定方法

Laravel Sailの環境であれば、以下の3コマンドでファイルがそれぞれ生成されます。

```shell
php artisan ide-helper:generate
php artisan ide-helper:meta
sail artsan ide-helper:model --nowrite
```

`ide-helper:model`コマンドのみ、コンテナ内で実行する必要があります。

`--nowrite`オプションをつけないと対話形式となり、modelファイルに書き込む（yes）か`_ide_helper_models.php`
を生成する（no）かを選べますが、本番ソースに影響がない（no）がおすすめです。


## .gitignoreの設定

`.gitignore`に追加しておきましょう。

```ini
# ide-helper
_ide_helper.php
_ide_helper_models.php
.phpstorm.meta.php
```

## php-cs-fixerの自動整形対象から除外

特に影響は無いと思いますが、
気持ちわるいので、自動整形されるファイルにphp-cs-fixerの対象から除外しておきます。

`.php-cs-fixer.dist.php`を以下のようにします。

```
$finder = PhpCsFixer\Finder::create()
    ->exclude('vendor')
    ->exclude('bootstrap/cache')
    ->notPath('server.php')
    ->notPath('_ide_helper.php')
    ->notPath('_ide_helper_models.php')
    ->notPath('.phpstorm.meta.php')
    ->in(__DIR__)
;
```
