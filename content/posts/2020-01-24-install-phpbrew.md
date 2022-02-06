---
templateKey: blog-post
title: phpbrewでPHP7.4をインストールする
date: 2020-01-24T12:34:15.945Z
description: 
cover: /images/php.png
category: PHP
tags: 
  - macOS
  - PHP
  - zsh
  - phpbrew
slug: install-phpbrew
---

phpbrewのインストールを行います。

## macOSの環境

動作条件が以下のページにまとめられています。

https://github.com/phpbrew/phpbrew/wiki/Requirement

Homebrewでインストールするようにしてください。

私の環境では以下のパッケージがインストールされていました。

```shell
brew list
anyenv		c-ares		glib		libevent	libtool		pcre		rtmpdump
apr		composer	gmp		libffi		libxml2		pcre2		sqlite
apr-util	curl		hub		libiconv	libzip		peco		tidy-html5
argon2		curl-openssl	icu4c		libidn		mhash		php		tree
aspell		freetds		jansson		libmetalink	mysql		pkg-config	unixodbc
autoconf	freetype	jemalloc	libpng		nghttp2		postgresql	webp
bison		gdbm		jpeg		libpq		node		protobuf	xz
bison@2.7	gettext		krb5		libsodium	oniguruma	python		yarn
brotli		ghq		libedit		libssh2		openldap	re2c		zlib
bzip2		git		libev		libtiff		openssl@1.1	readline
```

## インストール方法

ダウンロードから初期化処理までです。

```shell
curl -L -O https://github.com/phpbrew/phpbrew/releases/latest/download/phpbrew.phar
# 権限変更
chmod +x phpbrew.phar
# PATHにファイルを移動
sudo mv phpbrew.phar /usr/local/bin/phpbrew
# 初期化
phpbrew init
```

その後、.zshrcに以下を追記します。

```shell
source ~/.phpbrew/bashrc
```

ターミナルを再起動しバージョンを確認します。

```shell
phpbrew --version
phpbrew - 1.25.3
cliframework core: 2.5.4
```

以上でインストール完了です。

## インストール可能なバージョンを確認

`phpbrew known`でインストール可能なバージョンを確認できます。

```shell
phpbrew known
```

## PHP7.4をインストール

`+default`はバリアント(variant)と呼ばれ、必要最低限の拡張を設定してくれます。
他に`+dbs`を設定すると、mysql,sqlite,postgresの拡張を入れてくれるようです。
確認方法は以下です。

```shell
phpbrew variants
```

```shell
phpbrew install 7.4 +default+dbs
```

## バージョンの切り替え方法

```shell
phpbrew switch 7.4.2
```

phpbrew install 7.3 +default +dbs +debug +openssl=/usr/local/opt/openssl +bz2="$(brew --prefix bzip2)" +zlib="$(brew -

## 拡張モジュールインストール方法

```shell
phpbrew ext install xdebug stable
```

## 参考

公式のGithubはかなり詳しく解説があるので必読です。

<https://github.com/phpbrew/phpbrew/blob/master/README.ja.md>
<https://github.com/phpbrew/phpbrew/wiki>