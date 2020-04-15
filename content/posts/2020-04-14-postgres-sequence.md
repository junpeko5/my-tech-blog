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

SELECT setval('category_category_id_seq',(SELECT max(category_id) FROM category))

SELECT max(id) FROM dtb_customer;

SELECT setval('dtb_customer_id_seq',(SELECT max(id) FROM dtb_customer));
SELECT currval('dtb_customer_id_seq');

Unique violation: 7 ERROR: duplicate key value violates unique constraint 