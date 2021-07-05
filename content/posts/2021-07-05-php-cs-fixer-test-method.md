---
templateKey: blog-post
title: php-cs-fixerでテストメソッドが文字化けする際の対処法
date: 2021-07-05
description: テストメソッドが日本語の場合、適用しているルールによっては文字化けする場合があります。
cover: /images/php.png
category: PHP
tags:
  - PHP
  - PHP-CS-Fixer
slug: php-cs-fixer-test-method
---
テストメソッドが日本語の場合、適用しているルールによっては文字化けする場合があります。

## 原因

`php_unit_method_casing`のルールの影響っぽい

## 対処法

設定で`php_unit_method_casing`をfalseにするとよい。

```php
<?php

$finder = PhpCsFixer\Finder::create()
    ->exclude('vendor')
    ->exclude('bootstrap/cache')
    ->notPath('server.php')
    ->in(__DIR__)
;

$config = new PhpCsFixer\Config();
return $config->setRules([
        '@PSR2' => true,
        '@Symfony' => true,
        '@PhpCsFixer' => true,
        'php_unit_method_casing' => false, ## 追加
    ])
    ->setFinder($finder)
;
```
