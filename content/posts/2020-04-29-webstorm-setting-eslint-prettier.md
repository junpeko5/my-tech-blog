---
templateKey: blog-post
title: WebStormで保存時にESLintとPrettierを実行する
date: 2020-04-29
description: WebStormを利用している時の、ESLintとPrettierの設定メモです。
cover: /images/webstorm.png
category: Prettier
tags:
  - WebStorm
  - Prettier
  - ESLint
  - JavaScript
slug: webstorm-setting-eslint-prettier
---

## Prettier の設定

Preferences > Languages & Frameworks > JavaScript > Prettier

1. Prettier package でパスを設定する
2. Run for files で On save を有効にする

## ESLint の設定

### 設定

Preferences > Languages & Frameworks > JavaScript > Code Quality Tools > ESLint を開き、Run eslint --fix on save を有効にします。

この設定で、ESLint のチェックが有効になります。
