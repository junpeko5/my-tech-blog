---
templateKey: blog-post
title: php-cs-fixerでコミット時に整形する必要があるかチェックする方法
date: 2021-07-05
description: 
cover: /images/php.png
category: PHP
tags:
  - PHP
  - PHP-CS-Fixer
slug: php-cs-fixer-pre-commit
---

```bash
vim .git/hooks/pre-commit
```

```bash
#!/bin/bash
ROOT_DIR=$(git rev-parse --show-toplevel)
LIST=$(git status | grep -e '\(modified:\|new file:\)'| grep '\.php' | cut -d':' -f2 )
error=false
for file in $LIST
do
    $ROOT_DIR/vendor/bin/php-cs-fixer fix --path-mode=intersection --dry-run $ROOT_DIR/$file > /dev/null 2>&1
    if [ $? != 0 ]; then
        echo -e "   please, cs fix to $ROOT_DIR/$file"
        error=true
    fi
done
if "${error}"; then
    echo
    echo -e "\033[31mCommit fail\033[m please run \"vendor/bin/php-cs-fixer fix\" command"
    exit 1
fi
```

## 実行権限を追加

```bash
chmod u+x .git/hooks/pre-commit
```

## composerのscriptsに追加

composerのscriptに以下のように登録しておくと、

別の作業者のリポジトリにも設定が反映することができる。

```bash
....省略
"scripts": {
    ....省略
    "post-install-cmd": [
      "cp ./pre-commit .git/hooks/pre-commit",
      "chmod u+x .git/hooks/pre-commit"
    ],
    "post-update-cmd": [
      "cp ./pre-commit .git/hooks/pre-commit",
      "chmod u+x .git/hooks/pre-commit"
    ],
    ....省略
},
....省略
```

`post-install-cmd`、でcomposer install時
`post-install-cmd`でcomposer update時にそれぞれ実行される。
