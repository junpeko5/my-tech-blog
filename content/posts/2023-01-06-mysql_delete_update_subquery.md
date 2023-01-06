---
templateKey: blog-post
title: MySQLのDELETE、UPDATE文で更新対象のテーブルを含むサブクエリを実行する方法
date: 2023-01-06
description:
cover: /images/mysql.png
category: MySQL
tags:
  - MySQL
  - SQL
slug: mysql_delete_update_subquery
---

## MySQLのDELETE、UPDATE文で更新対象のテーブルを含むサブクエリを直接実行することができない

例えば以下のようなテーブルがあるとして、

```shell
mysql> select * from members;
+------+--------+
| id   | name   |
+------+--------+
|    1 | Taro   |
|    2 | Hanako |
|    3 | Takao  |
|    4 | Yasuko |
|    5 | Kenji  |
+------+--------+
5 rows in set (0.00 sec)

mysql> select * from member_detail;
+------+-----------+-------+------------+
| id   | member_id | sex   | birthday   |
+------+-----------+-------+------------+
|    1 |         1 | mem   | 1989-05-16 |
|    2 |         2 | women | 1980-04-30 |
|    3 |         3 | mem   | 2002-09-04 |
|    4 |         4 | women | 1979-03-21 |
|    5 |         5 | mem   | 1960-05-22 |
+------+-----------+-------+------------+
5 rows in set (0.00 sec)
```

以下のDelete文はエラーとなります。

```sql
delete from members where id in (
  select member_id
  from member_detail md
  inner join members m on m.id = md.member_id
  where birthday > '1980-01-01'
);
ERROR 1093 (HY000): You can't specify target table 'members' for update in FROM clause
```

> FROM 句で更新対象のテーブル 'members' を指定することはできません

この場合、サブクエリ内で1段階層を深くして削除対象のidを抽出するようにすると実行が可能になります。

```sql
delete from members where id in (
  select * from (
    select member_id
    from member_detail md
    inner join members m on m.id = md.member_id
    where birthday > '1980-01-01'
  ) sub
);
```

> Query OK, 3 rows affected (0.01 sec)

また、直接From句で参照しない場合は問題なく実行できます。

```sql
delete from members where id in (
  select member_id
  from member_detail
  where birthday > '1980-01-01'
);
```

> Query OK, 3 rows affected (0.01 sec)

以下は検証環境構築のメモです。

## 検証環境構築メモ

```shell
docker run --name test_mysql -e MYSQL_ROOT_PASSWORD=password -d mysql:8.0.31
docker exec -it test_mysql bash
```

MySQLに接続する。

```shell
mysql -u root -p
```

データベース作成、データ投入。

```sql
create database test_db;
use test_db
create table members (id int, name varchar(255));
insert into members values (1, 'Taro'),(2, 'Hanako'),(3, 'Takao'),(4, 'Yasuko'),(5, 'Kenji');
create table member_detail (id int, member_id int, sex varchar(255), birthday date);
insert into member_detail values (1, 1, 'men', '1989-05-16'),(2, 2, 'women', '1980-04-30'),(3, 3, 'men', '2002-09-04'),(4, 4, 'women', '1979-03-21'),(5, 5, 'men', '1960-05-22');
```

### Select句は直接参照しても問題無く実行できる

```sql
select * from members where id in (
  select member_id
  from member_detail md
  inner join members m on m.id = md.member_id
  where birthday > '1980-01-01'
);
```
