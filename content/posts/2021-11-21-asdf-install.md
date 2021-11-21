---
templateKey: blog-post
title: asdfのインストールとチュートリアル
date: 2021-11-21
description: 
cover: /images/apple-logo.png
category: Git
tags:
  - Git
slug: asdf-install
---
  
## 前提条件

Apple SiliconのmacOS環境にインストールしました。

asdfをhomebrewで入れる + zshの場合のインストール方法です。

その他、環境によってインストール方法が異なりますが、ドキュメントに詳しく載っています。

<http://asdf-vm.com/>

## asdfのインストール

```bash
## インストール
brew install asdf
## パスを通す
echo -e "\n. $(brew --prefix asdf)/libexec/asdf.sh" >> ${ZDOTDIR:-~}/.zshrc
## 確認
asdf version
v0.8.1
```

以上でインストール完了です。

## チュートリアル

### NodeJSをインストールする例

#### 依存関係のあるファイルをインストール

事前に、依存関係にあるパッケージをインストールする必要がある。

これは、プラグインごとに異なるので、必ずプラグインの方のREADMEも確認しておく必要がある。

今回は<https://github.com/asdf-vm/asdf-nodejs>を確認する。

```bash
brew install gpg gawk
```

#### プラグイン`asdf-nodejs`を追加する。

```bash
asdf plugin add nodejs https://github.com/asdf-vm/asdf-nodejs.git
```

`~/.asdf/plugins/nodejs/`に追加されます。

#### インストール

```bash
asdf install nodejs latest
```

#### 有効化

```bash
asdf global nodejs latest
```

`.tool-versions`というファイルにバージョンが記載されます。
```bash
cat .tool-versions
nodejs 17.1.0
```

ターミナルを再起動すると。。
```bash
node -v
v17.1.0
```

使えるようになりました。


#### 別のバージョンをインストール

```bash
asdf list all nodejs
...省略
16.10.0
16.11.0
16.11.1
16.12.0
16.13.0
lts-gallium
lts
17.0.0
17.0.1
17.1.0
```

```bash
asdf install nodejs 16.11.0
```


```bash
asdf list nodejs
  16.11.0
  17.1.0
```

### Rubyのインストール

```bash
## プラグインをインストール
asdf plugin add ruby https://github.com/asdf-vm/asdf-ruby.git
## 依存パッケージをインストール
brew install openssl readline
```

```bash
# 最新のバージョンをインストール
asdf install ruby latest
asdf global ruby 3.0.2
ruby -v
ruby 3.0.2p107 (2021-07-07 revision 0db68f0233) [arm64-darwin21]
## 2.7.4のインストール
asdf install ruby 2.7.4
ruby -v
ruby 2.7.4p191 (2021-07-07 revision a21a3b7d23) [arm64-darwin21]
```

#### 参考
<https://github.com/asdf-vm/asdf-ruby>

### PHPのインストール

PHPはApple Siliconの場合問題が残っているみたい。

<https://github.com/asdf-community/asdf-php/issues/88>
以下色々試しましたが、解決できず。。

```bash
asdf plugin-add php https://github.com/asdf-community/asdf-php.git
brew install autoconf automake bison freetype gd gettext icu4c krb5 libedit libiconv libjpeg libpng libxml2 libzip pkg-config re2c zlib
brew install gmp libsodium imagemagick
brew install oniguruma
brew install postgresql
brew install libpq
export PKG_CONFIG_PATH="$(brew --prefix icu4c)/lib/pkgconfig:$(brew --prefix krb5)/lib/pkgconfig:$(brew --prefix libedit)/lib/pkgconfig:$(brew --prefix libxml2)/lib/pkgconfig:$(brew --prefix openssl)/lib/pkgconfig"
export PATH="$(brew --prefix bison)/bin:$PATH"
PHP_WITHOUT_PDO_PGSQL=yes PGSQL_INCLUDE="/opt/homebrew/opt/postgres" PHP_CONFIGURE_OPTIONS="--with-pdo-pgsql=/opt/homebrew/opt/postgres/ --with-pgsql=/opt/homebrew/opt/postgres/ --with-iconv=$(brew --prefix libiconv)" asdf install php 7.4.23
```

とりあえず、PHPは`brew install php`で一旦いきます。

#### 参考

<https://github.com/asdf-community/asdf-php>

### Goのインストール

```bash
brew install coreutils
asdf plugin-add golang https://github.com/kennyp/asdf-golang.git
asdf install golang 1.17.3
asdf global golang 1.17.3
```

## グローバルにバージョン指定する

```bash
asdf global nodejs 16.11.0
```

## プロジェクトごとにバージョン指定する

```bash
asdf local nodejs 16.11.0
```

`.node-version`ファイルが作成されます。

git管理の対象とします。

## 参考

<http://asdf-vm.com/>

ドキュメントがかなり見やすいので、適宜参照してみてください。
