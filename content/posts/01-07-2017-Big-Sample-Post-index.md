---
title: "Gitの管理対象から特定のファイルまたはディレクトリを除外したい場合の対処法"
cover: "https://unsplash.it/400/300/?random?TheFallenTime"
date: 2019-11-24
slug: "git-rm-cached"
category: "another one"
tags:
    - test
    - something
    - tagging
publish: "yes"
---
# Gitの管理対象から特定のファイルまたはディレクトリを除外したい場合の対処法

git管理したくないファイルは.gitignoreに書きますが、対象ファイルをコミット後に管理対象から外したい場合は、.gitignoreに書くだけではリポジトリからファイルを消すことができません。キャッシュが残っており、.gitignoreの内容が反映されないのです。

そういった場合は、`git rm --cached`コマンドで管理対象から削除し、ローカルのファイル自体はプロジェクト内に残すことができます。

## ファイルを残して管理対象から外す

git rmコマンドの使用方法は対処したいファイル名を指定できます。

```bash
    $ git rm --cached [リポジトリから削除したいファイル名]
```

## ディレクトリは残し、ディレクトリの管理対象のみ外す方法

```bash
$ git rm -r --cached [リポジトリから削除したいディレクトリ名]
```

## プロジェクト内のすべてのキャッシュを削除する方法

```bash
$ git rm -r --cached .
```
.gitignoreの設定を反映させたい場合は上記コマンドで一発です。

## リポジトリに反映

コミット&プッシュでリポジトリからファイルが消えることを確認しましょう。

```bash
$ git add .
$ git commit -m ".gitignoreの設定を反映"
$ git push origin master
```
