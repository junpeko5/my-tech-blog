---
templateKey: blog-post
title: データ移行時、PostgreSQLでシーケンス(sequence)を合わせる方法
date: 2020-04-14
description: PostgreSQLでデータをCSVインポートを行う場合に、シーケンスについても考慮する必要があります。
cover: /images/postgres.png
category: PostgreSQL
tags:
  - Tips
slug: postgres-sequence
---

PostgreSQLでデータをCSVインポートを行う際、id列のデータ型にserial型の場合、シーケンスについても考慮する必要があります。

データを移行するだけたと、シーケンス番号が進まず、以下のようなエラーがでます。

```shell
Unique violation: 7 ERROR: duplicate key value violates unique constraint
```

## 対応方法

idカラムにserial型を設定している場合は、データのインポート後に以下のコマンドを実行しましょう。

例えば、categoryテーブルのserial型に`category_id`のシーケンスIDが`category_category_id_seq`の場合は以下でOKです。

```sql
SELECT setval('category_category_id_seq',(SELECT max(category_id) FROM category));
```

`SELECT max(category_id) FROM dtb_customer;`でレコード数を取得し、シーケンス番号を`setval()`で進めます。
