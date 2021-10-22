---
templateKey: blog-post
title: MacOSにRuby3.xをインストールする(rbenv)
date: 2021-10-22
description: 2021年10月22日時点で、安定版のRuby 3.0.2 をanyenv、rbenvでMacOSにインストールします。
cover: /images/ruby.png
category: Ruby
tags:
  - Ruby
  - rbenv
  - anyenv
  - MacOS
slug: ruby_install_for_mac
---

2021年10月22日時点で、安定版のRuby 3.0.2 をanyenv、rbenvでMacOSにインストールします。

## anyenvのupdate

なにはともあれ、anyenvをアップデートします。

```bash
anyenv update
```

参考Link
<https://blog.junpeko.com/anyenv-update>

## rbenvがインストールされているか確認

```bash
$ anyenv envs
goenv
jenv
nodenv
phpenv
```

## rbenvのインストール

rbenvはインストールされていなかったので、インストールします。

```bash
anyenv install rbenv
exec $SHELL -l
```

## インストールできるバージョンの確認

```bash
rbenv install -l
2.6.8
2.7.4
3.0.2
jruby-9.3.1.0
mruby-3.0.0
rbx-5.0
truffleruby-21.3.0
truffleruby+graalvm-21.3.0
```

## インストール

```bash
rbenv install 3.0.2
....省略
....省略
Installed ruby-3.0.2 to /Users/jun/.anyenv/envs/rbenv/versions/3.0.2
```
↑
ビルド結構時間かかります！！

無事インストールされました。

## 反映

```bash
rbenv global 3.0.2
exec $SHELL -l
```

## 確認

```bash
rbenv versions
  system
* 3.0.2 (set by /Users/jun/.anyenv/envs/rbenv/version)
```

```bash
ruby -v
ruby 3.0.2p107 (2021-07-07 revision 0db68f0233) [x86_64-darwin20]
```

```bash
which ruby
/Users/jun/.anyenv/envs/rbenv/shims/ruby
```

phpenvと比べてかなりスムーズでした。完了！！

