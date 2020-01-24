---
templateKey: blog-post
title: HomesteadでLaravelをインストールする
date: 2020-01-25T12:34:15.945Z
description: VagrantとVirtualBoxのインストールが必要です。また、composerも事前にインストールしておきましょう。
cover: /images/homestead.png
category: PHP
tags:
  - Homestead
  - Homebrew
slug: install-phpbrew
---

VagrantとVirtualBoxのインストールが必要です。

<https://www.vagrantup.com/downloads.html>

<https://www.virtualbox.org/wiki/Downloads>

また、composerも事前にインストールしておきましょう。

```sh
$ brew install composer
```

バージョン確認します。

```sh
$ vagrant -v
Vagrant 2.2.6

$ VBoxManage -v
6.1.2r135662
```

## Vagrant Boxのインストール

```sh
$ vagrant box add laravel/homestead
```

コマンドを実行しますと利用するプロバイダの種類を聞かれるので、`virtualbox`を選択しましょう。


## リポジトリをクローンする

任意のディレクトリにクローンしてきます。

```sh
$ ghq get https://github.com/laravel/homestead.git
$ cd ~/Homesteadのディレクトリ
$ git checkout release
```

リリースブランチに切り替えておきます。

## Homestead.yamlの生成

Homestead.yamlが以下のコマンドで作成されます。

```sh
$ bash init.sh
```

## LaravelインストーラーでLaravelをインストールする

インストーラーをComposerでインストールしておきます。

```sh
$ composer global require laravel/installer
```

Laravelをインストールしたいディレクトリで以下を実行します。

```sh
$ laravel new blog
```

以上でLaravel本体がblogディレクトリにインストールされます。

## Homestead.yamlの生成

homesteadをインストールしたディレクトリに戻り、設定を追記していきます。

```yml
---
ip: "192.168.10.10"
memory: 2048
cpus: 2
provider: virtualbox

folders:
    - map: ~/dev/src/github.com/junpeko5/blog
      to: /home/vagrant/blog

sites:
    - map: homestead.app
      to: /home/vagrant/blog/public

databases:
    - homestead

features:
    - mariadb: false
    - ohmyzsh: false
    - webdriver: false
```

## hostsに追記


```sh
$ sudo vim /etc/hosts
```

```sh
192.168.10.10  homestead.test
```

## homesteadを起動する

`vagrant up`コマンドで起動できます。

```sh
$ vagrant up
The provider 'virtualbox' that was requested to back the machine
'homestead' is reporting that it isn't usable on this system. The
reason is shown below:

Vagrant has detected that you have a version of VirtualBox installed
that is not supported by this version of Vagrant. Please install one of
the supported versions listed below to use Vagrant:

4.0, 4.1, 4.2, 4.3, 5.0, 5.1, 5.2, 6.0

A Vagrant update may also be available that adds support for the version
you specified. Please check www.vagrantup.com/downloads.html to download
the latest version.
```

エラーが出ました。

VirtualBoxのバージョンが新し過ぎたようです。

6.0にダウングレードします。

<https://www.virtualbox.org/wiki/Download_Old_Builds>

```sh
$ VBoxManage -v
6.0.15r135660
```

再度`vagrant up`を実行すると上手くいきました。

<http://homestead.test/>

にアクセスすると、Laravelの初期画面が表示されます。

## 仮想環境に入ってみる

```sh
$ vagrant ssh
```

でログインできます。


```sh
$ pwd
/home/vagrant
$ ll blog/
total 680
drwxr-xr-x  1 vagrant vagrant    864 Jan 24 12:54 ./
drwxr-xr-x 12 vagrant vagrant   4096 Jan 24 13:16 ../
drwxr-xr-x  1 vagrant vagrant    224 Jan 24 12:53 app/
-rw-r--r--  1 vagrant vagrant   1686 Jan 24 12:53 artisan
drwxr-xr-x  1 vagrant vagrant    128 Jan 24 12:53 bootstrap/
-rw-r--r--  1 vagrant vagrant   1501 Jan 24 12:53 composer.json
-rw-r--r--  1 vagrant vagrant 182588 Jan 24 12:53 composer.lock
drwxr-xr-x  1 vagrant vagrant    480 Jan 24 12:53 config/
drwxr-xr-x  1 vagrant vagrant    192 Jan 24 12:53 database/
-rw-r--r--  1 vagrant vagrant    220 Jan 24 12:53 .editorconfig
-rw-r--r--  1 vagrant vagrant    829 Jan 24 12:54 .env
-rw-r--r--  1 vagrant vagrant    778 Jan 24 12:53 .env.example
-rw-r--r--  1 vagrant vagrant    111 Jan 24 12:53 .gitattributes
-rw-r--r--  1 vagrant vagrant    163 Jan 24 12:53 .gitignore
-rw-r--r--  1 vagrant vagrant   1013 Jan 24 12:53 package.json
-rw-r--r--  1 vagrant vagrant 446694 Jan 24 12:53 package-lock.json
-rw-r--r--  1 vagrant vagrant   1405 Jan 24 12:53 phpunit.xml
drwxr-xr-x  1 vagrant vagrant    192 Jan 24 12:53 public/
-rw-r--r--  1 vagrant vagrant   4455 Jan 24 12:53 README.md
drwxr-xr-x  1 vagrant vagrant    192 Jan 24 12:53 resources/
drwxr-xr-x  1 vagrant vagrant    192 Jan 24 12:53 routes/
-rw-r--r--  1 vagrant vagrant    563 Jan 24 12:53 server.php
drwxr-xr-x  1 vagrant vagrant    160 Jan 24 12:53 storage/
-rw-r--r--  1 vagrant vagrant    174 Jan 24 12:53 .styleci.yml
drwxr-xr-x  1 vagrant vagrant    192 Jan 24 12:53 tests/
drwxr-xr-x  1 vagrant vagrant   1312 Jan 24 12:54 vendor/
-rw-r--r--  1 vagrant vagrant    538 Jan 24 12:53 webpack.mix.js
```

Laravelのプロジェクトが上手くマウントされています。

## マイグレーションを実行する

Laravelのプロジェクトルートにある`.env`を編集します。

```.env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=homestead
DB_USERNAME=homestead
DB_PASSWORD=secret
```

Laravelのマイグレーションを実行するとき(DBに対してコマンド実行するとき)は、仮想環境に入って実行します。

```sh
$ vagrant ssh
vagrant@homestead:~$ cd blog
vagrant@homestead:~/blog$ pwd
/home/vagrant/blog
$ php artisan migrate
Migration table created successfully.
Migrating: 2014_10_12_000000_create_users_table
Migrated:  2014_10_12_000000_create_users_table (0.07 seconds)
Migrating: 2014_10_12_100000_create_password_resets_table
Migrated:  2014_10_12_100000_create_password_resets_table (0.09 seconds)
Migrating: 2019_08_19_000000_create_failed_jobs_table
Migrated:  2019_08_19_000000_create_failed_jobs_table (0.05 seconds)
```

## MySQLに接続する

パスワードは`secret`です。

```sh
vagrant@homestead:~/blog$ mysql -u homestead -p

mysql> use homestead
mysql> show tables;
+---------------------+
| Tables_in_homestead |
+---------------------+
| failed_jobs         |
| migrations          |
| password_resets     |
| users               |
+---------------------+
```

マイグレーションで作成したテーブルが確認できます。

## 参考

<https://readouble.com/laravel/6.x/ja/homestead.html>
