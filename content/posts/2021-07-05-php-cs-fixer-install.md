---
templateKey: blog-post
title: php-cs-fixerのインストールとオススメの設定
date: 2021-07-05
description: 
cover: /images/php.png
category: PHP
tags:
  - PHP
  - PHP-CS-Fixer
slug: php-cs-fixer-install
---

## インストール方法

### グローバルのComposerにインストール

グローバルのComposerにインストールするという方法があります。

```bash
composer global require friendsofphp/php-cs-fixer
```

### HomeBrewでインストール

MacOSならHomebrewからでもインストール可能。

個人で開発するならこれでもOK。

```bash
brew upgrade php-cs-fixer
```

### プロジェクトごとにインストール

最もオススメなのが、プロジェクト専用のcomposer.jsonファイルでインストールする方法です。

プロジェクトごとでバージョンをあわせられるので、複数人のプロジェクトの場合はこちらがよいと思います。

```bash
cd path/to/project_root
composer require friendsofphp/php-cs-fixer

## 実行方法
./vendor/bin/php-cs-fixer fix
```

## 設定

`.php-cs-fixer.dist.php`を作成する。

`@〜`というルールセットがあるので、適当にルールセットを選ぶだけでもいい感じ
のルールにしてくれる。

また、配列の後のルールのほうが勝つようなので、上書きしたいルールがある場合は下に書く。

例えば、`position_after_control_structures`を上書きしたい場合は以下のような感じにする。

```bash
<?php

$finder = PhpCsFixer\Finder::create()
    ->exclude('vendor')
    ->exclude('bootstrap/cache')
    ->notPath('server.php')
    ->in(__DIR__)
;

$config = new PhpCsFixer\Config();
return $config->setRules([
        '@Symfony' => true,
        '@PhpCsFixer' => true,
        'braces' => [
            'position_after_control_structures' => 'next',
        ],
    ])
    ->setFinder($finder)
;
```

## 実行

```bash
# dry-run
./vendor/bin/php-cs-fixer fix --dry-run

# ディレクトリ指定
./vendor/bin/php-cs-fixer fix ./src

# すべてのファイルに対して実行
./vendor/bin/php-cs-fixer fix
```
