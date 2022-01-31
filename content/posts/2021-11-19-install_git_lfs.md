---
templateKey: blog-post
title: git-lfsのインストール
date: 2021-11-19
description: 
cover: /images/git.png
category: Git
tags:
  - Git
slug: install_git_lfs
---
  
音声、動画、画像等の大きなファイルを扱う際に入れておくと`git clone`、`git push`、`git pull`の時間を短縮してくれます。

## インストール

```shell
brew install git-lfs
```

```shell
git lfs install
```

```shell
git lfs version
git lfs help
```

## 設定

```shell
git lfs track [ファイルパス]
git lfs track "hoge/fuga/test.png"
git lfs track "hoge/fuga/*"
git lfs track "*.png"
```

## 確認

```shell
git lfs track
```

`.gitattributes`に設定が保持されます。

このファイルを共有することで、LFSの設定を共有できます。


## 参考

<https://support-ja.backlog.com/hc/ja/articles/360038329474-Git-LFS%E3%81%AE%E4%BD%BF%E7%94%A8%E6%96%B9%E6%B3%95>
