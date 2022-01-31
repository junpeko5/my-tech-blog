---
templateKey: blog-post
title: PhpStorm、phpunitのテスト実行時、memory_limitが原因で失敗する場合の対処法
date: 2021-11-29
description:
cover: /images/php.png
category: PHP
tags:
  - PHP
  - PhpStorm
slug: phpstorm_test_memory_limit
---

```shell
PHP Fatal error: Allowed memory size of xxx  bytes exhausted
```

上記エラーが出ることがあります。

CLI Interpreters の設定 > Additional > Configuration options に

`-dmemory_limit=-1`

を追加すれば、OK です。
