---
templateKey: blog-post
title: HomesteadにおけるDBクライアントの設定方法
date: 2020-01-25T12:34:15.945Z
description: 
cover: 
category: PHP
tags:
  - a
slug: homestead-db-client-setting
---

Homesteadでは、以下のPortがデフォルトでポートフォワードされています。

> SSH: 2222 → フォワード先 22
> ngrok UI: 4040 → フォワード先 4040
> HTTP: 8000 → フォワード先 80
> HTTPS: 44300 → フォワード先 443
> MySQL: 33060 → フォワード先 3306
> PostgreSQL: 54320 → フォワード先 5432
> MongoDB: 27017 → フォワード先 27017
> Mailhog: 8025 → フォワード先 8025
> Minio: 9600 → フォワード先 9600

引用:<https://readouble.com/laravel/6.x/ja/homestead.html>

MacのローカルPC環境からHomestead環境のMySQLに接続したい場合は、

DBクライアントのHomestead環境への接続port設定を33060にすることで、

Homestead環境がport:33060を受けとり、`.env`で設定されているport情報であるport:3306へ中継します。

これにより、ローカルからでもDBクライアントツールで接続することができるようになります。

具体的な設定例は以下です。

- Host: localhost
- Port: 33060
- User: homestead
- Password: secret
- Database: Homestead

## 参考

<https://readouble.com/laravel/6.x/ja/homestead.html>
