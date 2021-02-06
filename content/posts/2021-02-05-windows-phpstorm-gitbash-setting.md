---
templateKey: blog-post
title: Windows環境PhpStormのターミナル機能でGitbashを使う
date: 2021-02-05
description: 
cover: /images/phpstorm.png
category: Git
tags:
  - Git
  - PhpStorm
  - Windows
slug: windows-phpstorm-gitbash-setting
---

Windows環境でGit Bashを使ってみましたが、コピペなどがやりにくいです。

PhpStormのターミナル機能を使えばいい感じにターミナルを操作できるので、（macOSと同じ感じ）その方針でいきます。

また、PhpStormのデフォルトは`cmd.exe`となっているので、Gitbashを利用するように設定変更する必要があります。

## 設定

Setting > Tools > Terminal にあるShell pathに`bash.exe`のpathを設定します。

（gitbash.exeではないので注意）

以上でした。Windows辛い。。