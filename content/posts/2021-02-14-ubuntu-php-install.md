---
templateKey: blog-post
title: UbuntuにPHPをインストールする
date: 2021-02-14
description:
cover: /images/php.png
category: PHP
tags:
  - PHP
  - Ubuntu
slug: ubuntu-php-install
---

## パッケージの更新

```bash
sudo apt update
apt list --upgradable
sudo apt upgrade
```

## 外部リポジトリを追加する

`ppa:ondrej/php`をaptに追加する。



```bash
sudo apt -y install software-properties-common
sudo add-apt-repository ppa:ondrej/php
sudo apt update
apt list --upgradable
sudo apt upgrade
```

`sudo apt install software-properties-common`で
`/etc/apt/sources.list`にリポジトリが追記される。

また、`sudo add-apt-repository ppa:ondrej/php`で、
`sources.list.d/`に`ondrej-ubuntu-php-focal.list`が追加される。

```bash
ll /etc/apt/sources.list.d/
-rw-r--r-- 1 root root  122 Feb 14 13:50 ondrej-ubuntu-php-focal.list
```



## インストール
```bash
sudo apt install -y php7.4-fpm php7.4-cli php7.4-dev \
       php7.4-sqlite3 php7.4-gd \
       php7.4-curl \
       php7.4-imap php7.4-mysql php7.4-mbstring \
       php7.4-xml php7.4-zip php7.4-bcmath php7.4-soap \
       php7.4-intl php7.4-readline php7.4-pcov \
       php7.4-msgpack php7.4-igbinary php7.4-ldap 
```

## 確認

```bash
php -v
PHP 7.4.15 (cli) (built: Feb 12 2021 10:46:57) ( NTS )
Copyright (c) The PHP Group
Zend Engine v3.4.0, Copyright (c) Zend Technologies
    with Zend OPcache v7.4.15, Copyright (c), by Zend Technologies
```

```bash
php -m
[PHP Modules]
bcmath
calendar
Core
ctype
curl
date
dom
exif
FFI
fileinfo
filter
ftp
gd
gettext
hash
iconv
igbinary
imap
intl
json
ldap
libxml
mbstring
msgpack
mysqli
mysqlnd
openssl
pcntl
pcov
pcre
PDO
pdo_mysql
pdo_sqlite
Phar
posix
readline
Reflection
session
shmop
SimpleXML
soap
sockets
sodium
SPL
sqlite3
standard
sysvmsg
sysvsem
sysvshm
tokenizer
xml
xmlreader
xmlwriter
xsl
Zend OPcache
zip
zlib

[Zend Modules]
Zend OPcache
```