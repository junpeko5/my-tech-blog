---
templateKey: blog-post
title: PhpStormでXdebugが効かない場合のチェック項目
date: 2021-07-07
description: 
cover: /images/xdebug.png
category: Xdebug
tags:
  - PHP
  - Xdebug
slug: phpstorm-xdebug-setting
---

Xdebugを利用して、PhpStormでボタンをポチポチしてステップ実行したいけど、

なぜか止まらん！！！という際は、

冷静になって、以下の設定項目を確認しましょう。

## そもそもXdebugのモジュールが有効になっていない

```bash
php -m | grep xdebug
```

で`Xdebug`が有効になっているかの確認をしましょう。

コンテナ環境の場合はコンテナ内のphpで確認するように！

```bash
docker exec -it <コンテナ名> bash

php -m | grep xdebug # コンテナ内で
xdebug
```

## 設定がXdebug2系になっている

2020年11月頃から、Xdebug3系がインストールされるようになってきているので、

2系の設定では3系のXdebugでは動きません。

例えば、Docker環境の場合は、以下のように3系の設定にしましょう。

```bash
[XDebug]
xdebug.mode = debug
xdebug.start_with_request = yes
xdebug.client_host = host.docker.internal
```

## xdebug.client_portが合っていない

Preferences > PHP > Debug

で設定を確認できます。

Xdebugの設定と合わせるようにしましょう。

```bash
php -i | grep xdebug.client_port
xdebug.client_port => 9003 => 9003
```

## xdebug.mode がdebugになっていない

デフォルトはdevelopなので、php.ini等に設定を記載する必要があります。

```
xdebug.mode = debug
```

## CLI Interpreterが設定されていない

CLI Interpreterを設定しないと、PhpStormのXdebugは正しく動きません。

Preferences > PHP より、CLI Interpreterを正しく設定しましょう。

localのPHPとリモートのPHP（DockerやVagrant）では若干設定方法が異なってくるので注意です。

参考
> <https://pleiades.io/help/phpstorm/configuring-local-interpreter.html>
> <https://pleiades.io/help/phpstorm/configuring-remote-interpreters.html>

## Path Mappingの設定が行われていない

割とハマリポイントですが、

リモートのCLI Interpreter の場合、Path Mappingの設定が必要です。

Local PathとRemote Pathが共に設定されているか確認しましょう。

設定例（Laravelのプロジェクトが置かれている絶対パスを記載する）
```
Local Path
/Users/testuser/dev/src/junpeko5/laravel

Remote Path
/var/www/html
```

## Test Frameworksが設定されていない

Preferences > PHP > Test Frameworks

が設定されていないと、phpunit実行時に影響があります。

CLI InterpreterやPath mappingを正しく設定しておきましょう。

## phpunitのみXdebugが効かないとき

最後に、PHPがDocker環境の場合に、

PhpStormでphpunitを実行したときにXdebugが効かないといった場合の対処法です。

リッスンしている状態で、PhpStormのrunボタンを押し、phpunitを実行すると以下のエラーが出ます。

`To fix it set server name by environment variable PHP_IDE_CONFIG and restart debug session.`

この場合は、直接的な問題解決法ではありませんが、リッスンを解除し、runボタンではなくDebugボタン（虫マーク
）を押して実行するとうまくいきます。

このデバックボタンを押すと、リモート環境（Docker環境）に入った上でphpunitコマンドをいい感じに実行してくれるようです。

## まとめ

以上の対処法で9割は解決できると思います。

それでも解決しない場合は、実行ログを見てみると良いかもです。。
