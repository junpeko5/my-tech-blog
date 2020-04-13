---
templateKey: blog-post
title: PostgreSQLでCSVファイルをインポートする手順
date: 2020-04-13
description: CSVファイルをPostgreSQLにインポートする方法です。2つのやり方を紹介します。
cover: /images/postgres.png
category: PostgreSQL
tags: 
  - Tips
slug: import-csv-postgres
---

CSVファイルをPostgreSQLにインポートする方法です。
2つのやり方を紹介します。

## テスト実行環境作成

ローカル環境にテスト用のCSVファイルが必要です。
あらかじめ作成しておきます。

Postgresの、DBサーバはDockerコンテナで作成します。

### CSVファイルを作成する

```bash
cat products.csv
id,name,price
1,cake,500
2,juice,300
3,cookie,100
```

### CSVファイルの文字コードを確認する

```bash
file --mime products.csv
products.csv: text/plain; charset=us-ascii
```

### PostgreSQLのコンテナを立ち上げる

```bash
docker run \
--name my-postgres \
-e POSTGRES_PASSWORD=secret \
-p 5432:5432 \
-d postgres

docker ps
CONTAINER ID        IMAGE               COMMAND                  CREATED              STATUS              PORTS               NAMES
72c628ab5d8f        postgres            "docker-entrypoint.s…"   About a minute ago   Up About a minute   5432/tcp            some-postgres
```

## `\copy`コマンドでCSVファイルのインポートを行う

`\copy`コマンドはCSVファイルがホストマシンにある場合にリモートのDBサーバーに対して実行できます。

```bash
psql -h localhost -p 5432 -U postgres -d postgres
postgres=# create table products (id int, name varchar(255), price int);
postgres=# \copy products from ~/Desktop/products.csv with csv header encoding 'UTF8'
COPY 3
postgres=# select * from products;
 id |  name  | price
----+--------+-------
  1 | cake   |   500
  2 | juice  |   300
  3 | cookie |   100
(3 rows)
```

```bash
postgres=# drop table products;
```

## COPYコマンドでCSVファイルのインポートを行う

COPYコマンドは、DBサーバーにファイルが存在する場合に利用できるコマンドです。
ホストマシンから、dockerコンテナに`cp`コマンドでcsvファイルをアップロードし、試してみました。

```bash
docker cp products.csv my-postgres:/tmp/products.csv
docker exec my-postgres cat /tmp/products.csv
id,name,price
1,cake,500
2,juice,300
3,cookie,100
```

```bash
psql -h localhost -p 5432 -U postgres -d postgres
```

```bash
postgres=# COPY products FROM '/tmp/products.csv' with csv header encoding 'UTF8';
COPY 3
postgres=# select * from products;
 id |  name  | price
----+--------+-------
  1 | cake   |   500
  2 | juice  |   300
  3 | cookie |   100
(3 rows)
```
