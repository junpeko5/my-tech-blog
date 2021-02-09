---
templateKey: blog-post
title: CentOS7、Postgresのインストール
date: 2021-02-09
description: 
cover: /images/postgres.png
category: PostgreSQL
tags:
  - PostgreSQL
  - CentOS7
  - yum
slug: centos7-postgres-install
---


## 

<https://www.postgresql.org/download/>よりOSごとにインストール方法を教えてくれます。

以下は、CentOS7、PostgreSQL9.6の場合です。

```bash
# Install the repository RPM:
sudo yum install -y https://download.postgresql.org/pub/repos/yum/reporpms/EL-7-x86_64/pgdg-redhat-repo-latest.noarch.rpm

# Install PostgreSQL:
sudo yum install -y postgresql96-server

# Optionally initialize the database and enable automatic start:
sudo /usr/pgsql-9.6/bin/postgresql96-setup initdb
sudo systemctl enable postgresql-9.6
sudo systemctl start postgresql-9.6
```

```bash
su - postgres
psql -l
```

MySQLの特権ユーザーは`root`だが、PostgreSQLは`postgres`となっている。

## postgresql.confの設定確認

```bash
vim /var/lib/pgsql/9.6/data/postgresql.conf
```
```ini
#listen_addresses = 'localhost'         # what IP address(es) to listen on;
#port = 5432
```

デフォルトは`localhost`と`5432`となっている。

設定を変えたい場合は、コメントアウトして変更する。

## pg_hba.confの設定例

`md5`にすることで、パスワードを必須としている。

```pg_hba.conf
# TYPE  DATABASE        USER            ADDRESS                 METHOD

# "local" is for Unix domain socket connections only
local   all             all                                     peer
#local   all             all                                     md5
# IPv4 local connections:
#host    all             all             127.0.0.1/32            ident
host    all             all             127.0.0.1/32            md5
```

`local   all             all                                     peer`
としておくと、sshでログイン後`postgres`ユーザーでパスワードなしでログイン可能。
`md5`とすれば、パスワードが必要となり、セキュリティは強化される。

`host    all             all             127.0.0.1/32            md5`
はローカルでのホスト接続でパスワードを必要とする設定。同じサーバー内のアプリケーションからの接続を行う場合はこのような設定となる。




## ユーザーの作成

```bash
postgres=# create user eccube3 with password 'jw8sffgc' createdb;
```
