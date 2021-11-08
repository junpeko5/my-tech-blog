---
templateKey: blog-post
title: Gitで自分のローカル環境でのみ追跡させなくする方法
date: 2021-11-08
description: 
cover: /images/git.png
category: Git
tags:
  - Git
slug: git_exclude
---
  
個人的にgit管理の対象外としたい場合の設定方法です。

`.git/info/exclude`ファイルに記載することで無視出来ます。

```bash
cd project_root
vim .git/info/exclude
```

追跡をローカルでのみ除外したい、ファイルまたは、ディレクトリを記述します。

（.gitignoreの設定と同様の記述方法。）

```dotenv
# 記述例
.idea/
.vscode/
hoge.txt
```
