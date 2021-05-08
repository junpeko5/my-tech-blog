---
templateKey: blog-post
title: Gitでトラッキングされていない不要なローカルリモートブランチを削除する方法
date: 2021-05-08
description: 
cover: /images/git.png
category: Git
tags:
  - Git
slug: git-fetch-prune
---

ローカルのブランチを削除するには、
`git branch -D <ブランチ名>`
リモートのブランチを削除するには、
`git push --delete origin <ブランチ名>`で削除できますが、
`remotes/origin/<ブランチ名>`等のローカルのリモートブランチは残ります。

以下のやり方でローカルのリモートブランチを削除できます。

## ローカルリモートブランチの削除方法

トラッキングされていないローカルの不要なブランチは`git fetch`の`prune`オプションで
削除できます。

```bash
git fetch --prune
# or
git fetch -p
```
