---
templateKey: blog-post
title: AWS CLIのインストールと初期設定
date: 2021-01-02
description:
cover: /images/aws-cli.png
category: AWS
tags:
  - AWS
  - aws-cli
slug: install-aws-cli-and-setting
---

## AWS CLIのインストール

以下のコマンドでインストール、更新が可能です。

```shell
curl "https://awscli.amazonaws.com/AWSCLIV2.pkg" -o "AWSCLIV2.pkg"
sudo installer -pkg AWSCLIV2.pkg -target /
```

## インストール確認

```shell
aws -v
```

## AWS CLI初期設定
aws configureのコマンドで初期設定を行うことができます。
IAMユーザー作成時に取得したアクセスキーIDとシークレットアクセスキーが必要となります。
また、リージョンとデフォルト出力フォーマットを入力します。
```shell
aws configure
```

## 設定値の確認

.awsのフォルダ内に設定ファイルが保存されます。
```shell
cd ~/.aws
ls
config      credentials
```

```shell
cat config
[default]o

region = ap-northeast-1
output = json
```

```shell
cat credentials
[default]
aws_access_key_id = **************
aws_secret_access_key = ***********************
```