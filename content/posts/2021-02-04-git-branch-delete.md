---
templateKey: blog-post
title: Gitでリモートブランチを削除する
date: 2021-02-04
description: Github等に不要なブランチがあって、コマンドで削除したい場合に利用します。
cover: /images/git.png
category: Git
tags:
  - Git
slug: git-remote-branch-delete
---

## ブランチの削除

Github等に不要なブランチがあって、コマンドで削除したい場合に利用します。

### リモートブランチの削除

```shell
git push --delete origin branch-name
# or
git push -d origin branch-name
```

以上で本題は終了。

### ローカルブランチの削除

ちなみに、ローカルのブランチを削除する場合は、以下の2種類のコマンドがある。

```shell
git branch -D branch-name
git branch -d branch-name # マージされていないブランチは削除できない
```

### ブランチが残っていないか確認

```shell
git branch -a
```
