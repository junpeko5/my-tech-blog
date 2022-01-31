---
templateKey: blog-post
title: macOSのCatalinaにMongodbをインストールする手順
date: 2020-04-29
description: macOSのCatalinaにMongodbをインストールする方法のメモです。
cover: /images/mongodb.png
category: MongoDB
tags:
  - Tips
slug: install-mongodb
---

macOSのCatalinaにMongodbをインストールする方法のメモです。


## 前提条件

Homebrewがインストールされていること。

## インストール方法

以下の手順でMongoDBの起動までできます。

```shell
brew update
brew upgrade
brew tap mongodb/brew
brew install mongodb-community
sudo mkdir -p /System/Volumes/Data/data/db
sudo chown -R `id -un` /System/Volumes/Data/data/db
```

### コマンドの説明

MongoDBの公式ドキュメントでは、`/data/db`にデータを置くためのディレクトリを作成するように書かれていますが、

macOS(Catalina)では、`Read-only file system`というメッセージが出てしまい、作成できませんでした。

Catalinaでは、セキュリティの観点から、`/data/db`を`System/Volumes/Data`に作成する良いそうです。

そのため、以下の2コマンドとなっています。

```shell
sudo mkdir -p /System/Volumes/Data/data/db
sudo chown -R `id -un` /System/Volumes/Data/data/db
```

権限を与えるために`chown`も実行しています。

## MongoDBの起動

```shell
brew services run mongodb-community
brew services list
brew services stop mongodb-community
```

`brew services run mongodb-community`で起動し、`brew services list`で状態を確認できます。

停止するには、`brew services stop mongodb-community`です。

## Mongo Shellの実行

```shellell script
mongo
> db
test
> use sample-db

> show dbs
```

## 参考

- <https://zellwk.com/blog/install-mongodb/>
- <https://docs.mongodb.com/guides/server/install/>
