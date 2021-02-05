---
templateKey: blog-post
title: HomebrewでGitをインストールする方法
date: 2020-01-24T12:34:15.945Z
description: 
cover: /images/homebrew.png
category: Git
tags:
  - Homebrew
  - Git
slug: install-git-by-homebrew
---

Macにデフォルトでgitは入っていますが、最新のバージョンに追随していきたいため、

Homebrewで導入します。


```sh
$ brew install git
```

```sh
$ brew list
gettext	git	pcre2
```

ターミナルを再起動するとパスが設定されます。

```sh
$ which git
/usr/local/bin/git
```

.bash_profileなどにPATHを追加する必要はありません。
