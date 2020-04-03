---
templateKey: blog-post
title: EC-CUBEでプラグインインストール時のエラーについて
date: 2020-04-03
description: .gitconfigを会社用、個人用の設定で使い分けたい場合の設定方法
cover: /images/apple-logo.png
category: Git
tags: 
  - Tips
slug: git-change-gitconfig
---

`.gitconfig`で、user.nameとuser.emailを会社と個人で使い分けたい場合の例を紹介します。

`~/.gitconfig`の末尾に以下を挿入すると、あるリポジトリのみは会社のアカウントの設定でgitを利用できます。

```sh
[includeIf "gitdir:~/dev/src/bitbucket.org/company/"]
    path = ~/dev/src/bitbucket.org/company/.gitconfig
```

そして、会社のリポジトリ（ここでいう`company/`以下）の配下に.gitconfigを作り、会社用のuser.nameとuser.emailを追記します。

```sh
[user]
	name = junpeko_company
	email = junpeko_company@gmail.com
```

`includeIf`で、ある条件の場合は、こちらを読み込んでねという設定ができます。
