---
templateKey: blog-post
title: WebStormにESLintとPrettierのFileWatchersを設定する
date: 2020-04-29
description: WebStormを利用している時の、ESLintとPrettierの設定メモです。
cover: /images/webstorm.png
category: WebStorm
tags:
  - Tips
  - JavaScript
slug: webstorm-setting-eslint-prettier
---

WebStormを利用している時の、ESLintとPrettierの設定メモです。

## パッケージのインストール

プロジェクトごとにインストールする場合は、以下のコマンドになります。

```bash
npm i eslint prettier eslint-config-prettier eslint-plugin-prettier eslint-config-airbnb eslint-plugin-node  eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-react-hooks --save-dev
```

## Prettierの設定

### Auto Format

Preferences > Tools > FileWatcher を開き + ボタンを押します。

Name: に適当な名前を入れます。

File Type: はお好みでOKです。僕は、`Any` or `JavaScript`を入れます。

Scope: についてもお好みです。`ProjectFiles` を選んでおきます。

Program: には、`$ProjectFileDir$/node_modules/.bin/prettier`

Arguments: に `--write $FilePathRelativeToProjectRoot$`を入れます。

Output paths to refresh: に、`$FilePathRelativeToProjectRoot$`を設定します。

Working directory: に、`$ProjectFileDir$`を入れます。

Advanced Options の Trigger the watcher on external changesのみにチェックを入れます。

この設定で、`⌘S`を入力時にコードフォーマットされるようになります。

### 設定ファイル

`.prettierrc`の設定例です。

```dotfile
{
  "singleQuote": true
}
```

## ESLintの設定

### 設定

Preferences > Languages & Frameworks > JavaScript > Code Quality Tools > ESLint を開き、Automatic ESLint Configurationを有効にします。

この設定で、ESLintのチェックが有効になります。

### Auto Format

Preferences > Tools > FileWatcher を開き + ボタンを押します。

Name: に適当な名前を入れます。

File Type: はお好みでOKです。僕は、`Any` or `JavaScript`を入れます。

Scope: についてもお好みです。｀ProjectFiles` を選んでおきます。

Program: には、`$ProjectFileDir$/node_modules/.bin/eslint`を入れます。

Arguments: に `--fix $FilePath$`を入れます。

Output paths to refresh: に、`$FilePath$`を設定します。

Working directory: に、`$ProjectFileDir$`を入れます。

Advanced Options の Trigger the watcher on external changesのみにチェックを入れます。

この設定で、`⌘S`を入力時にコードフォーマットされるようになります。

### 設定ファイル

`.eslintrc.json`の設定例です。

```json
{
  "extends": ["airbnb", "prettier", "plugin:node/recommended"],
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": "error",
    "spaced-comment": "off",
    "no-console": "warn",
    "consistent-return": "off",
    "func-names": "off",
    "object-shorthand": "off",
    "no-process-exit": "off",
    "no-param-reassign": "off",
    "no-return-await": "off",
    "no-underscore-dangle": "off",
    "class-methods-use-this": "off",
    "prefer-destructuring": ["error", { "object": true, "array": false }],
    "no-unused-vars": ["error", { "argsIgnorePattern": "req|res|next|val" }]
  }
}
```

## 参考

- <https://prettier.io/docs/en/webstorm.html>
- <https://pleiades.io/help/webstorm/eslint.html>
