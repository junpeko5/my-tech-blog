---
templateKey: blog-post
title: Vimで複数行の行頭、行末に一括で文字を挿入する方法
date: 2023-01-07
description:
cover: /images/bash.png
category: Vim
tags:
  - Vim
slug: vim_start_end_insert
---

## 行頭

1. `ctrl + v` で矩形選択モードに入ります。
2. 複数選択したい行範囲を選択するよう上下にカーソル移動します。
3. `shift + ^` で行頭にカーソル移動します。
4. `shift + i` で行頭に複数行入力可能な挿入モードに移行できます。

## 行末

1. `ctrl + v` で矩形選択モードに入ります。
2. 複数選択したい行範囲を選択するよう上下にカーソル移動します。
3. `shift + $` で行末にカーソル移動します。
4. `shift + a` で行末に複数行入力可能な挿入モードに移行できます。

## よく使うケース

以下のようなCSVを編集したい場合に便利です。

```csv
1,taro,taro@example.com
2,hanako,hanako@example.com
3,kazuyuki,@kazuyuki@example.com
```
