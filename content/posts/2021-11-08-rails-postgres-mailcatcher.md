---
templateKey: blog-post
title: Railsの開発環境でDBサーバー(postgres)とメールサーバー(mailcatcher)を利用する
date: 2021-11-08
description: 
cover: /images/ruby.png
category: Rails
tags:
  - Ruby
  - Rails
slug: rails_postgres_mailcatcher
---
  
## 前提条件

MacOSにインストールしたRubyを利用してアプリケーションを起動しているという前提です。

rbenvでruby 3.0.2が入っています。

```shell
ruby -v
ruby 3.0.2p107 (2021-07-07 revision 0db68f0233) [x86_64-darwin20]
```

## GemfileにPostgres用のGemを入れる

```ruby
gem 'pg'
```

```shell
bundle install
```

## docker-compose.ymlを追加する

テスト用と開発用のデータベースを用意します。

```yaml
version: '3'
services:
  db:
    image: postgres:13.4
    ports:
      - "5432:5432"
    volumes:
      - ./postgres/init:/docker-entrypoint-initdb.d
    restart: always
    environment:
      POSTGRES_PASSWORD: password
  db_test:
    image: postgres:13.4
    ports:
      - "54321:5432"
    restart: always
    environment:
      POSTGRES_PASSWORD: password
      POSTGRES_DB: postgres_test
  mailcatcher:
    image: schickling/mailcatcher
    ports:
      - "1080:1080"
      - "1025:1025"
```

## database.ymlの変更

```yaml
default: &default
  adapter: postgresql
  encoding: unicode
  host: localhost
  username: postgres
  password: password
  pool: <%= ENV.fetch("RAILS_MAX_THREADS") { 5 } %>
  timeout: 5000

development:
  <<: *default
  database: postgres

test:
  <<: *default
  port: 54321
  database: postgres_test
```


## ActionMailerの設定

mailcatcherの設定を行います。

`config/environments/development.rb`を編集します。

```ruby
  # Don't care if the mailer can't send.
  config.action_mailer.raise_delivery_errors = true

  host = 'localhost:3000'
  config.action_mailer.default_url_options = { host: host, protocol: 'http' }
  ActionMailer::Base.smtp_settings = {
    :port           => 1025,
    :address        => '',
    :user_name      => '',
    :password       => '',
    :domain         => host,
    :authentication => :plain,
  }
```

