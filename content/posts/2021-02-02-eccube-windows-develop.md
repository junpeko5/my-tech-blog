---
templateKey: blog-post
title: Windows環境にeccube4のローカル開発を構築する
date: 2021-02-02
description: 
cover: /images/eccube.png
category: ec-cube
tags:
  - PHP
  - composer
  - ec-cube
  - Windows
  - Xdebug
slug: eccube-windows-develop
---

Windows環境にeccube4系の環境を作ってみました。

その際の構築メモとなります。

WindowsはSymfonyとの相性が悪く、動作が重くなってしまう印象を持っています。

できるだけ快適に開発が出来るように、VagrantとかDockerを使わずに構築しました。

メモリ8GBでしたが、なんとか開発は出来る感じにはなりました。
（おすすめはしません。macOSでローカル環境を作るほうが高速に動作します。 ）

また、symfony/cliを利用してssl証明書を発行しており、 httpsでローカル環境の動作確認ができる方法となっています。

## 前提条件

VirtualBoxを利用し、仮想マシンMSEdge on Win10を使用してWindows環境を作成しました。

参考: <https://do-wp.com/build-a-windows-operating-environment-on-mac-with-virtualbox/>

また、phpは7.3.26、MySQLは5.7.18です。

## eccubeの構築に必要なPackageのインストール

### Chocolateyのインストール

Chocolateyを利用してパッケージをWindows環境にインストールします。

まずは、`Chocolatey`をインストールしましょう。

PowerShellを管理者権限で起動します。

<https://chocolatey.org/install>のページのインストールコマンドをPowershellで実行します。

```PowerShell
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
```

以下の様になっていれば、インストール完了です。

```PowerShell
choco 
Chocolatey v0.10.15
```

### パッケージのインストール

`choco`を実行するとバージョンが確認できます。

また、`choco list -lo`でインストールしたパッケージを確認できます。

それでは必要なパッケージをインストールしていきます。

`--version`でバージョン指定ができます。

`-y`はすべてYesで答えることができるオプションです。

`vcredist2013`は、C++ アプリケーションを実行するために必要なランタイムコンポーネントで、MySQLを実行時に必要なためインストールしています。

```PowerShell
choco install php --version=7.3.26 -y
choco install git -y
choco install vscode -y
choco install vcredist2013 -y
choco install mysql --version=5.7.18
```

## Git bashでphp.iniの設定を変更する。

Git bashを管理者として実行します。

ここでは、eccubeで必要な拡張モジュールを有効化します。

（Windowsでは`.dll`という拡張子がモジュールのファイルです。）

また、初期設定値もいくつか変更します。

### bashの設定ファイルに追記

デフォルトの挙動ではコマンドで`|`（パイプ）が使えないため、.bash_profileに以下を追記します。

```bash
cd ~
echo 'exec winpty bash' >> ~/.bash_profile
```

参考: <https://qiita.com/amanoese/items/7b237e8703c3b4c7f001>

### xdebug拡張のダウンロード

<https://xdebug.org/wizard>
でphp -iの出力を貼り付けると、必要なxdebugのファイルがを教えてくれます。

今回の場合は、`php_xdebug-3.0.2-7.3-vc15-nts-x86_64.dll`をダウンロードします。
<https://xdebug.org/download>
よりダウンロードできます。

ファイル名が複数ありよく似ているので、ダウンロードリンクをしっかり確認しましょう。

### xdebug拡張を設置する

```bash
mv  ~/Downloads/php_xdebug-3.0.2-7.3-vc15-nts-x86_64.dll /c/tools/php73/ext/
```

### php.iniの編集

eccube4に必要な拡張を追加していきます。

```bash
vim /c/tools/php73/php.ini
```

```php.ini
extension=curl
extension=fileinfo
extension=gd2
extension=intl
extension=mbstring
extension=mysqli
extension=openssl
extension=pdo_mysql
zend_extension=php_opcache.dll
zend_extension=php_xdebug-3.0.2-7.3-vc15-nts-x86_64.dll
xdebug.mode=debug
xdebug.start_with_request=yes
html_errors = On
max_execution_time = 120
opcache.enable=On
opcache.enable_cli=On
```

### MySQLの設定

#### MySQLの初期化

```bash
 /c/tools/mysql/current/bin/mysqld.exe --initialize --console --explicit_defaults_for_timestamp
```
[Note] A temporary password is generated for root@localhost: *fWCWpKEj0ou

ここで上記のようにrootユーザーの仮パスワードが作成されるので、メモしておきましょう。

#### MySQLのサービスを登録

```bash
/c/tools/mysql/current/bin/mysqld.exe --install
```

Windowsのサービスが追加され、MySQLの起動、停止ができるようになります。
GUI（サービス）でも確認できます。

#### MySQLの起動・停止

```bash
net start mysql
net stop mysql
```

#### MySQLのパスワード設定、DB作成

仮パスワードでログインします。

```bash
mysql -u root -p
```

パスワード設定と、DB作成です。

```bash
mysql > ALTER USER 'root'@'localhost' IDENTIFIED BY 'fsd!fjgi9';
mysql > CREATE DATABASE eccube4 DEFAULT CHARACTER SET utf8mb4;
```

## 開発用メールサーバー

開発用サーバーはMailHogが便利です。
<https://github.com/mailhog/MailHog/releases/v1.0.0>
MailHog_windows_amd64.exe
をダウンロードし、適当な場所に保存しておきます。

デスクトップに保存した場合、以下で起動します。

```bash
~/Desktop/MailHog_windows_amd64.exe
```

またクライアントはブラウザで以下のURLにアクセスすると確認できます。

<http://localhost:8025/>

## symfony/cliをインストール

https://symfony.com/download
より`setup.exe`をダウンロードしてインストールします。
Git bashを再起動するとsymfonyコマンドが実行できるようになります。

### httpsで接続できるように設定

```bash
symfony server:ca:install
```

## eccube4をインストール

composerはデフォルトでは2系がインストールされますが、
現時点でeccube4が対応していないため、
バージョン指定を行っています。

```bash
cd ~
mkdir dev
cd dev
git clone  git clone https://github.com/EC-CUBE/ec-cube.git
cd ec-cube/
curl -sS https://getcomposer.org/installer | php -- --version=1.10.20
php composer.phar install
symfony server:start
```

Server起動後、`localhost:8000`にアクセスするとインストール画面が起動します。

主な設定は以下です。

- データベース名: eccube4
- DBポート: 3306
- DBユーザー名: root
- DBパスワード: fsd!fjgi9
- smtpのport: 1025
  
また、symfony/cliでローカルサーバーを使用した場合、index.phpに上記の修正が必要となります。
 
  参考: <https://qiita.com/nanasess/items/de9f5450717cc8ede51a>

```index.php
# index.phpに以下を追記
if (isset($_SERVER['SERVER_SOFTWARE']) && strpos($_SERVER['SERVER_SOFTWARE'], 'Symfony') !== false) {
    $_SERVER['SERVER_NAME'] = '127.0.0.1';
}
```
